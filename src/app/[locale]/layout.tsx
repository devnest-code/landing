import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ParticleCanvas } from '@/components/ui/ParticleCanvas'
import { ScrollProgress } from '@/components/ui/ScrollProgress'

interface Props {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devnest.io'

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'custom software development', 'software outsourcing', 'nearshore Latin America',
      'dedicated development team', 'SaaS development', 'mobile app development',
      'software a medida', 'outsourcing de software', 'desarrollo web Ecuador',
      'empresa de software Ecuador', 'software company LatAm',
    ],
    authors: [{ name: 'DevNest', url: baseUrl }],
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${baseUrl}/${locale}`,
      siteName: 'DevNest',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/og.png`,
          width: 1200,
          height: 630,
          alt: 'DevNest — Custom Software · Outsourcing · Productos Propios',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [`${baseUrl}/og.png`],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        es: `${baseUrl}/es`,
        en: `${baseUrl}/en`,
        'x-default': `${baseUrl}/es`,
      },
    },
    robots: { index: true, follow: true },
    verification: { google: 'hyLciLL6OpBKGtgGcSXS-211NtuvyfT2E27Vg5p-qH0' },
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const messages = await getMessages({ locale })

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ScrollProgress />
      <ParticleCanvas />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </NextIntlClientProvider>
  )
}
