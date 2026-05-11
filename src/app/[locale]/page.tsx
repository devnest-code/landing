import Hero from '@/components/sections/Hero'
import TrustBar from '@/components/sections/TrustBar'
import Services from '@/components/sections/Services'
import Process from '@/components/sections/Process'
import Stack from '@/components/sections/Stack'
import WhyUs from '@/components/sections/WhyUs'
import Cases from '@/components/sections/Cases'
import Testimonials from '@/components/sections/Testimonials'
import Clients from '@/components/sections/Clients'
import Contact from '@/components/sections/Contact'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DevNest',
  url: 'https://devnest.io',
  description:
    'Custom software development company specializing in outsourcing, bespoke software, and proprietary digital products.',
  foundingLocation: { '@type': 'Place', name: 'Ecuador' },
  areaServed: 'Worldwide',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: 'hello@devnest.io',
    availableLanguage: ['English', 'Spanish'],
  },
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <TrustBar />
      <Services />
      <Process />
      <Stack />
      <WhyUs />
      <Cases />
      <Testimonials />
      <Clients />
      <Contact />
    </>
  )
}
