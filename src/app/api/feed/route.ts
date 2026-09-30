import { NextRequest, NextResponse } from 'next/server';
import { fetchWordPressFeed } from '@/lib/feed';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'Valid WordPress blog URL is required' },
        { status: 400 }
      );
    }

    const posts = await fetchWordPressFeed(url);

    return NextResponse.json({
      success: true,
      blogUrl: url,
      count: posts.length,
      posts,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch WordPress feed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
