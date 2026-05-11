'use client'
import { useTranslations } from 'next-intl'
import { RevealWrapper } from '@/components/ui/RevealWrapper'
import Image from 'next/image'
import { useState } from 'react'

interface ClientItem {
  name: string
  initials: string
  sector: string
}

function ClientCard({ item }: { item: ClientItem }) {
  const [imgError, setImgError] = useState(false)
  const slug = item.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')

  return (
    <div
      className="flex flex-col items-center justify-center gap-3 rounded-xl border flex-shrink-0 px-7 py-5 mx-2"
      style={{
        background: 'var(--bgc)',
        borderColor: 'var(--bd)',
        width: 190,
        transition: 'border-color 0.2s, background 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--bdg)'
        e.currentTarget.style.background = 'var(--goldg)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--bd)'
        e.currentTarget.style.background = 'var(--bgc)'
      }}
    >
      {!imgError ? (
        <Image
          src={`/clients/${slug}.png`}
          alt={item.name}
          width={110}
          height={44}
          style={{ objectFit: 'contain', maxHeight: 44, width: 'auto', opacity: 0.85 }}
          onError={() => setImgError(true)}
        />
      ) : (
        <div
          className="flex items-center justify-center rounded-lg font-display font-extrabold"
          style={{
            width: 74,
            height: 38,
            background: 'rgba(245,166,35,0.08)',
            border: '1px solid rgba(245,166,35,0.25)',
            color: 'var(--gold)',
            fontSize: 14,
            letterSpacing: '0.1em',
          }}
        >
          {item.initials}
        </div>
      )}
      <div className="text-center">
        <div className="text-[13px] font-medium leading-tight" style={{ color: 'var(--w)' }}>
          {item.name}
        </div>
        <div className="text-[11px] mt-0.5" style={{ color: 'var(--wm)' }}>
          {item.sector}
        </div>
      </div>
    </div>
  )
}

export default function Clients() {
  const t = useTranslations('clients')
  const items = t.raw('items') as ClientItem[]

  return (
    <section className="relative z-10 py-[80px]" style={{ background: 'var(--bg2)' }}>
      <div className="max-w-[1240px] mx-auto px-[5%]">
        <RevealWrapper className="text-center mb-10">
          <div className="eyebrow-label justify-center">{t('eyebrow')}</div>
          <h2
            className="font-display font-extrabold leading-none"
            style={{ fontSize: 'clamp(28px,4vw,48px)', letterSpacing: '-0.5px', color: 'var(--w)' }}
          >
            {t('title')}
          </h2>
        </RevealWrapper>
      </div>

      {/* Infinite marquee — full width, no padding */}
      <div className="marquee-outer">
        <div className="marquee-track">
          {/* Render twice for seamless loop */}
          {[...items, ...items].map((item, i) => (
            <ClientCard key={`${item.name}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
