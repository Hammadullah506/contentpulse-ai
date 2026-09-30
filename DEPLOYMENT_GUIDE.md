# 🚀 ContentPulse AI — Vercel & Custom Domain Deployment Guide

**Product**: ContentPulse AI (SaaS Web App)  
**Founder**: Malik Hammad (Founder @ Malik Hammad Digital & NEXUS PULSE)  
**Target Domain**: `contentpulse.malikhammaddigital.com`

---

## 📦 Step 1: Push Code to GitHub

1. Initialize or verify your git repository in `f:\contentpulse-ai`:
   ```bash
   git add .
   git commit -m "feat: ContentPulse AI v1.2 with Carousel Slides, Video Script, RSS Sync & History"
   ```

2. Create a new repository on your GitHub account (e.g. `contentpulse-ai`).

3. Link and push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/contentpulse-ai.git
   git branch -M main
   git push -u origin main
   ```

---

## ⚡ Step 2: Deploy to Vercel (100% Free Tier)

1. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New..."** → **"Project"**.
3. Select your `contentpulse-ai` repository and click **Import**.
4. **Environment Variables** (Optional, if you want default server-side API keys):
   - `DEEPSEEK_API_KEY`: `your_deepseek_key_here`
   - `OPENAI_API_KEY`: `your_openai_key_here`
   *(Note: ContentPulse AI also allows users to input their own keys in the app, or use the built-in intelligent engine without any API key!)*
5. Click **Deploy**. Vercel will automatically build the Next.js app in ~45 seconds and give you a live production URL (e.g. `https://contentpulse-ai.vercel.app`).

---

## 🌐 Step 3: Connect Custom Subdomain (`contentpulse.malikhammaddigital.com`)

1. In your Vercel Project Dashboard:
   - Go to **Settings** → **Domains**.
   - Type: `contentpulse.malikhammaddigital.com` and click **Add**.

2. In your DNS Provider (Cloudflare / Namecheap / Hostinger / cPanel for `malikhammaddigital.com`):
   - Add a new **CNAME** record:
     - **Type**: `CNAME`
     - **Name / Host**: `contentpulse`
     - **Target / Value**: `cname.vercel-dns.com`
     - **TTL**: Auto or 3600
     - *(If using Cloudflare, turn Proxy status to DNS Only / Grey cloud during SSL verification, or leave Proxied with Full SSL)*.

3. Vercel will automatically generate a free SSL certificate within 2-5 minutes.

Your Micro-SaaS will be live worldwide at:
👉 **`https://contentpulse.malikhammaddigital.com`**
