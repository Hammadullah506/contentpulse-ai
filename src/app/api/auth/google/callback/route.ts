import { NextResponse } from 'next/server';
import { getDbPool, initDbTables } from '@/lib/db';
import type { RowDataPacket } from 'mysql2';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  const host = request.headers.get('host') || 'nexuspulse.malikhammaddigital.com';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;
  const redirectUri = `${baseUrl}/api/auth/google/callback`;

  if (error || !code) {
    return NextResponse.redirect(`${baseUrl}/?auth_error=${encodeURIComponent(error || 'No authorization code provided')}`);
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(`${baseUrl}/?auth_error=Server%20Google%20OAuth%20credentials%20missing`);
  }

  try {
    // 1. Exchange code for access token
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization4code'.replace('4', '_'),
      }),
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      console.error('Token exchange failed:', errText);
      return NextResponse.redirect(`${baseUrl}/?auth_error=Failed%20to%20exchange%20token`);
    }

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    // 2. Fetch user profile from Google
    const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!userRes.ok) {
      return NextResponse.redirect(`${baseUrl}/?auth_error=Failed%20to%20fetch%20Google%20profile`);
    }

    const profile = await userRes.json();
    const userId = `usr_google_${profile.id}`;
    const email = profile.email;
    const name = profile.name || email.split('@')[0];
    const avatar = profile.picture || '';

    // 3. Connect to Hostinger MySQL & upsert user
    const db = getDbPool();
    if (db) {
      try {
        await initDbTables();
        await db.query(
          `INSERT INTO users (id, email, name, avatar, plan, credits_used, max_credits)
           VALUES (?, ?, ?, ?, 'free', 0, 3)
           ON DUPLICATE KEY UPDATE name = VALUES(name), avatar = VALUES(avatar)`,
          [userId, email, name, avatar]
        );
      } catch (dbErr) {
        console.error('MySQL user upsert error:', dbErr);
      }
    }

    // 4. Create user session payload
    const userPayload = {
      id: userId,
      email,
      name,
      avatar,
      plan: 'free',
      creditsUsed: 0,
      maxCredits: 3,
      joinedDate: new Date().toLocaleDateString(undefined, { month: 'short', year: 'numeric' }),
    };

    // If existing user in DB, read actual credits
    if (db) {
      try {
        const [rows] = await db.query<RowDataPacket[]>(
          'SELECT plan, credits_used, max_credits, created_at FROM users WHERE email = ? LIMIT 1',
          [email]
        );
        if (rows && rows.length > 0) {
          const row = rows[0];
          userPayload.plan = row.plan;
          userPayload.creditsUsed = row.credits_used;
          userPayload.maxCredits = row.max_credits;
        }
      } catch (e) {
        console.warn('Read user from DB warning:', e);
      }
    }

    // 5. Set session cookie and redirect home
    const response = NextResponse.redirect(`${baseUrl}/?auth_success=1`);
    response.cookies.set('contentpulse_user', JSON.stringify(userPayload), {
      httpOnly: false, // Accessible to client context
      secure: !host.includes('localhost'),
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  } catch (err: unknown) {
    console.error('OAuth callback error:', err);
    return NextResponse.redirect(`${baseUrl}/?auth_error=Internal%20authentication%20error`);
  }
}
