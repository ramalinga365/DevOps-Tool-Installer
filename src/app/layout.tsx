import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DevOps Tools Installation Setup/Guides',
  description: 'Easy installation guides and setup instructions for essential DevOps tools',
  icons: {
    icon: '/images/logo.svg',
    apple: '/images/logo.svg',
  },
  openGraph: {
    type: 'website',
    title: 'DevOps Tools Installation Setup/Guides',
    description: 'Easy installation guides and setup instructions for essential DevOps tools',
    url: 'https://devopstools.ramalinga.xyz',
    siteName: 'DevOps Tools Installation',
    images: [
      {
        url: '/images/og.svg',
        width: 1200,
        height: 630,
        alt: 'DevOps Tools Installation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevOps Tools Installation Setup/Guides',
    description: 'Easy installation guides and setup instructions for essential DevOps tools',
    images: ['/images/og.svg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/logo.svg" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
