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
  metadataBase: new URL('https://nexuspulse.malikhammaddigital.com'),
  title: 'ContentPulse — Technical Content Distribution Engine',
  description:
    'Turn long-form technical writing and documentation into platform-native threads, LinkedIn updates, and executive briefings.',
  icons: {
    icon: [
      { url: '/icon.svg?v=3', type: 'image/svg+xml' },
    ],
    shortcut: ['/icon.svg?v=3'],
  },
  authors: [{ name: 'Malik Hammad', url: 'https://malikhammaddigital.com' }],
  creator: 'Malik Hammad',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nexuspulse.malikhammaddigital.com',
    siteName: 'ContentPulse',
    title: 'ContentPulse — Technical Content Distribution Engine',
    description: 'Turn long-form technical writing into platform-native social distribution without robotic filler.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'ContentPulse',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ContentPulse — Technical Content Distribution Engine',
    description: 'Turn long-form technical writing into platform-native social distribution without robotic filler.',
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
      </head>
      <body className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-zinc-800 selection:text-white flex flex-col">
        {children}
      </body>
    </html>
  );
}
