import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import { dir } from 'i18next'
import { languages } from '@/config/languages'
import PageTransition from '@/components/PageTransition'
import { AuthProvider } from '@/contexts/AuthContext'
import { CartProvider } from '@/contexts/CartContext'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://meltingpotplus.netlify.app'),
  title: {
    default: 'Melting Pot Plus',
    template: '%s | Melting Pot Plus'
  },
  description: 'A global marketplace celebrating cultural diversity through authentic products and experiences.',
  keywords: ['marketplace', 'cultural', 'diversity', 'authentic', 'global', 'products'],
  authors: [{ name: 'Melting Pot Plus Team' }],
  creator: 'Melting Pot Plus',
  publisher: 'Melting Pot Plus',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Melting Pot Plus',
    title: 'Melting Pot Plus',
    description: 'A global marketplace celebrating cultural diversity through authentic products and experiences.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Melting Pot Plus',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Melting Pot Plus',
    description: 'A global marketplace celebrating cultural diversity through authentic products and experiences.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export async function generateStaticParams() {
  return Object.keys(languages).map((lng) => ({
    lng,
  }))
}

export default function RootLayout({
  children,
  params: { lng }
}: {
  children: React.ReactNode
  params: { lng: string }
}) {
  const validLang = languages[lng as keyof typeof languages] ? lng : 'en'
  
  return (
    <html lang={validLang} dir={dir(validLang)}>
      <body className={`${inter.className} min-h-screen bg-gray-50`}>
        <AuthProvider>
          <CartProvider>
            <Header />
            <PageTransition>
              <main className="pt-16">
                {children}
              </main>
            </PageTransition>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
} 