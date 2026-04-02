import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '茶裡王V4 伯爵紅茶 — 回甘，就像現泡',
  description: '茶裡王V4 伯爵紅茶，以柔和柑橘清香融合醇厚紅茶，無糖、不苦澀，每一口都像現泡的回甘滋味。',
  keywords: '茶裡王, 伯爵紅茶, 無糖茶飲, 瓶裝茶, 回甘',
  openGraph: {
    title: '茶裡王V4 伯爵紅茶 — 回甘，就像現泡',
    description: '以柔和柑橘清香融合醇厚紅茶，無糖、不苦澀，每一口都像現泡的回甘滋味。',
    type: 'website',
    locale: 'zh_TW',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "name": "茶裡王V4",
                  "url": "https://tea-king-v4-earl-grey.onrender.com",
                  "description": "茶裡王V4 伯爵紅茶品牌"
                },
                {
                  "@type": "WebSite",
                  "name": "茶裡王V4",
                  "url": "https://tea-king-v4-earl-grey.onrender.com"
                },
                {
                  "@type": "WebPage",
                  "name": "茶裡王V4 伯爵紅茶",
                  "description": "回甘，就像現泡"
                }
              ]
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
