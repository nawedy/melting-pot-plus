import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import { dir } from 'i18next'
import { languages } from '@/config/languages'
import PageTransition from '@/components/PageTransition'

const inter = Inter({ subsets: ['latin'] })

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default function RootLayout({
  children,
  params: { lng }
}: {
  children: React.ReactNode
  params: { lng: string }
}) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={`${inter.className} min-h-screen bg-gray-50`}>
        <Header />
        <PageTransition>
          <main className="pt-16">
            {children}
          </main>
        </PageTransition>
      </body>
    </html>
  );
} 