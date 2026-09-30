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
  title: 'ContentPulse AI — Multi-Platform Content Repurposing Micro-SaaS',
  description:
    'Turn any technical blog article or URL into viral Twitter threads, high-authority Quora answers, B2B LinkedIn posts, and WhatsApp/Telegram executive summaries in 5 seconds.',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} dark antialiased`}>
      <body className="min-h-screen bg-[#07090E] text-slate-100 font-sans selection:bg-violet-500/30 selection:text-violet-200 flex flex-col">
        {children}
      </body>
    </html>
  );
}
