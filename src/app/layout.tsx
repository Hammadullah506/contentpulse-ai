import type { Metadata, Viewport } from 'next';
import { Outfit, Inter } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://contentpulse.malikhammaddigital.com'),
  title: 'ContentPulse AI — Multi-Platform Content Repurposing Micro-SaaS',
  description:
    'Turn any technical blog article or URL into viral Twitter threads, high-authority Quora answers, B2B LinkedIn posts, and WhatsApp/Telegram executive summaries in 5 seconds.',
  icons: {
    icon: [
      { url: '/icon.svg?v=2', type: 'image/svg+xml' },
      { url: '/brand-icon.jpg', sizes: '32x32', type: 'image/jpeg' },
    ],
    apple: [
      { url: '/brand-icon.jpg', sizes: '180x180', type: 'image/jpeg' },
    ],
    shortcut: ['/icon.svg?v=2'],
  },
  keywords: [
    'Content Repurposing',
    'Micro-SaaS',
    'AI Content Generator',
    'DeepSeek V3',
    'Twitter Thread Generator',
    'LinkedIn Thought Leadership',
    'Quora High Authority',
    'Malik Hammad Digital',
    'NEXUS PULSE',
  ],
  authors: [{ name: 'Malik Hammad', url: 'https://malikhammaddigital.com' }],
  creator: 'Malik Hammad',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://contentpulse.malikhammaddigital.com',
    siteName: 'ContentPulse AI',
    title: 'ContentPulse AI — Multi-Platform Content Repurposing Micro-SaaS',
    description: 'Turn any technical article into 6 viral formats in 5 seconds. Architected by Malik Hammad (NEXUS PULSE).',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'ContentPulse AI — Repurposing Micro-SaaS by Malik Hammad',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ContentPulse AI — Multi-Platform Content Repurposing Micro-SaaS',
    description: 'Turn any technical article into 6 viral formats in 5 seconds. Architected by Malik Hammad (NEXUS PULSE).',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} dark antialiased`}>
      <head>
        <link rel="icon" href="/icon.svg?v=2" type="image/svg+xml" />
        <link rel="alternate icon" href="/brand-icon.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/brand-icon.jpg" />

        {/* WhatsApp & Social Media OpenGraph Meta Tags */}
        <meta property="og:title" content="ContentPulse AI — Multi-Platform Content Repurposing Micro-SaaS" />
        <meta property="og:description" content="Turn any technical article into 6 viral formats in 5 seconds. Architected by Malik Hammad (NEXUS PULSE)." />
        <meta property="og:image" content="https://contentpulse.malikhammaddigital.com/og-image.jpg" />
        <meta property="og:image:secure_url" content="https://contentpulse.malikhammaddigital.com/og-image.jpg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://contentpulse.malikhammaddigital.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ContentPulse AI" />
      </head>
      <body className="min-h-screen bg-[#07090E] text-slate-100 font-sans selection:bg-violet-500/30 selection:text-violet-200 flex flex-col">
        {children}
      </body>
    </html>
  );
}
