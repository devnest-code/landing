'use client'
import { useTranslations } from 'next-intl'
import { RevealWrapper } from '@/components/ui/RevealWrapper'
import type { TestimonialItem } from '@/types'

export default function Testimonials() {
  const t = useTranslations('testimonials')
  const items: TestimonialItem[] = t.raw('items') as TestimonialItem[]

  return (
    <section id="testi" className="relative z-10 py-[100px] px-[5%]" style={{ background: 'var(--bg2)' }}>
      <div className="max-w-[1240px] mx-auto">
        <RevealWrapper>
          <div className="eyebrow-label">{t('eyebrow')}</div>
          <h2
            className="font-display font-extrabold leading-none"
            style={{ fontSize: 'clamp(36px,5.5vw,60px)', letterSpacing: '-0.5px', color: 'var(--w)' }}
          >
            {t('title1')}
            <br />
            <span style={{ color: 'var(--wm)' }}>{t('title2')}</span>
          </h2>
        </RevealWrapper>

        <RevealWrapper delay={0.1} className="mt-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {items.map((item, i) => (
              <div
                key={i}
                className="rounded-[10px] p-[26px] border transition-all duration-200"
                style={{ background: 'var(--bgc)', borderColor: 'var(--bd)' }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--bdg)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--bd)')}
              >
                <div className="text-[12px] mb-3.5 tracking-[2px]" style={{ color: 'var(--gold)' }}>
                  ★★★★★
                </div>
                <p className="text-[14px] italic mb-4 leading-[1.75]" style={{ color: 'var(--wm)' }}>
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-display text-[14px] font-bold flex-shrink-0 border"
                    style={{
                      background: 'var(--goldg)',
                      borderColor: 'var(--bdg)',
                      color: 'var(--gold)',
                    }}
                  >
                    {item.initials}
                  </div>
                  <div>
                    <div className="text-[13px] font-medium" style={{ color: 'var(--w)' }}>
                      {item.name}
                    </div>
                    <div className="text-[11px] mt-0.5" style={{ color: 'var(--wm)' }}>
                      {item.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
