import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import Hero from '@/components/sections/Hero'
import TrustBar from '@/components/sections/TrustBar'
import WhyUs from '@/components/sections/WhyUs'
import Services from '@/components/sections/Services'
import Process from '@/components/sections/Process'
import Stack from '@/components/sections/Stack'
import Cases from '@/components/sections/Cases'
import Testimonials from '@/components/sections/Testimonials'
import Clients from '@/components/sections/Clients'
import Contact from '@/components/sections/Contact'

/** Regional landing pages (for ads and SEO): /{locale}/usa and /{locale}/europe. */
const REGIONS = ['usa', 'europe'] as const
type Region = (typeof REGIONS)[number]

// The parent [locale] layout renders dynamically, so generateStaticParams alone
// doesn't reject unknown slugs — validate explicitly.
const isRegion = (value: string): value is Region => (REGIONS as readonly string[]).includes(value)

export function generateStaticParams() {
  return REGIONS.map((region) => ({ region }))
}

interface Props {
  params: Promise<{ locale: string; region: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, region } = await params
  if (!isRegion(region)) notFound()
  const t = await getTranslations({ locale, namespace: `${region}.meta` })
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devnestcode.vercel.app'

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${baseUrl}/${locale}/${region}`,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/${region}`,
      languages: {
        es: `${baseUrl}/es/${region}`,
        en: `${baseUrl}/en/${region}`,
        'x-default': `${baseUrl}/en/${region}`,
      },
    },
  }
}

export default async function RegionPage({ params }: Props) {
  const { region } = await params
  if (!isRegion(region)) notFound()

  // Same sections as the home page (the navbar scrolls to them), with a regional
  // hero and "why us" pitch up front.
  return (
    <>
      <Hero ns={`${region}.hero`} />
      <TrustBar />
      <WhyUs ns={`${region}.why`} />
      <Services />
      <Process />
      <Stack />
      <Cases />
      <Testimonials />
      <Clients />
      <Contact />
    </>
  )
}
