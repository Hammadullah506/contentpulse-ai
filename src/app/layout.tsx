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
    title: 'ContentPulse AI — Multi-Platform Content Repurposing Micro-SaaS',
    description: 'Turn any technical article into 6 viral formats in 5 seconds. Architected by Malik Hammad.',
    images: [{ url: '/brand-icon.jpg', width: 1024, height: 1024, alt: 'ContentPulse AI Logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ContentPulse AI — Multi-Platform Content Repurposing',
    description: 'Turn any technical article into 6 viral formats in 5 seconds. Architected by Malik Hammad.',
    images: ['/brand-icon.jpg'],
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
      </head>
      <body className="min-h-screen bg-[#07090E] text-slate-100 font-sans selection:bg-violet-500/30 selection:text-violet-200 flex flex-col">
        {children}
      </body>
    </html>
  );
}
