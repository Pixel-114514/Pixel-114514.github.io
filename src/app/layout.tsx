import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://shiena.dev'),
  title: {
    default: '椎名立希 — Developer & AI Researcher',
    template: '%s | 椎名立希',
  },
  description: 'Personal website of 椎名立希 — AI researcher, full-stack developer, and open-source contributor.',
  keywords: ['AI', 'Machine Learning', 'Developer', 'Researcher', 'Blog', '椎名立希'],
  authors: [{ name: '椎名立希' }],
  creator: '椎名立希',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://shiena.dev',
    siteName: '椎名立希',
    title: '椎名立希 — Developer & AI Researcher',
    description: 'Personal website of 椎名立希 — AI researcher, full-stack developer, and open-source contributor.',
    images: [{ url: '/images/avatar.jpg', width: 400, height: 400 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '椎名立希 — Developer & AI Researcher',
    description: 'Personal website of 椎名立希 — AI researcher, full-stack developer, and open-source contributor.',
    images: ['/images/avatar.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className="noise">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
