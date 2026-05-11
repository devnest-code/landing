import type { ReactNode } from 'react'
import { Barlow_Condensed, DM_Sans } from 'next/font/google'
import './globals.css'

const barlow = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--font-barlow',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm',
  display: 'swap',
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning data-scroll-behavior="smooth" className={`${barlow.variable} ${dmSans.variable}`}>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
