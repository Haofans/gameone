import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://colombiagame.online'),
  title: {
    default: 'ColombiaGame - Free Online Games',
    template: '%s | ColombiaGame'
  },
  description: 'Play the best free online games at ColombiaGame. We offer a wide selection of high-quality browser games for all players. No downloads required.',
  keywords: 'online games, free games, browser games, web games, html5 games, gaming, play games online',
  openGraph: {
    title: 'ColombiaGame - Free Online Games',
    description: 'Play the best free online games at ColombiaGame. No downloads required.',
    url: 'https://colombiagame.online',
    siteName: 'ColombiaGame',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ColombiaGame - Free Online Games',
    description: 'Play the best free online games at ColombiaGame. No downloads required.',
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
  verification: {
    google: 'verification_token', // 需要替换为实际的Google验证令牌
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://colombiagame.online" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#111827" />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1XBDV26W2R"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-1XBDV26W2R');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
