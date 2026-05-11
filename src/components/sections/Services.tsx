'use client'
import { useTranslations } from 'next-intl'
import { RevealWrapper } from '@/components/ui/RevealWrapper'
import { TiltCard } from '@/components/ui/TiltCard'

const cards = [
  { num: '01', icon: '⚡', ns: 'outsourcing' },
  { num: '02', icon: '🔧', ns: 'custom' },
  { num: '03', icon: '🚀', ns: 'products' },
] as const

export default function Services() {
  const t = useTranslations('services')

  return (
    <section id="services" className="relative z-10 py-[100px] px-[5%]" style={{ background: 'var(--bg)' }}>
      <div className="max-w-[1240px] mx-auto">
        <RevealWrapper className="flex items-end justify-between mb-13 flex-wrap gap-5">
          <div>
            <div className="eyebrow-label">{t('eyebrow')}</div>
            <h2
              className="font-display font-extrabold leading-none"
              style={{ fontSize: 'clamp(36px,5.5vw,60px)', letterSpacing: '-0.5px', color: 'var(--w)' }}
            >
              {t('title1')}
              <br />
              {t('title2')}
            </h2>
          </div>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center px-7 py-3.5 rounded-md text-[15px] font-light border transition-all duration-200 cursor-pointer bg-transparent"
            style={{ color: 'var(--w)', borderColor: 'var(--bd)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--bdg)'
              e.currentTarget.style.color = 'var(--gold)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--bd)'
              e.currentTarget.style.color = 'var(--w)'
            }}
          >
            {t('cta')}
          </button>
        </RevealWrapper>

        <RevealWrapper delay={0.1}>
          <div
            className="grid lg:grid-cols-3 rounded-[10px] overflow-hidden"
            style={{ gap: '2px', background: 'var(--bd)' }}
          >
            {cards.map(({ num, icon, ns }) => {
              const items: string[] = t.raw(`${ns}.items`) as string[]
              return (
                <TiltCard
                  key={num}
                  className="sv-card tilt-card-inner px-[34px] py-[44px]"
                  style={{ background: 'var(--bgc)' }}
                >
                  <div
                    className="font-display text-[11px] font-bold mb-3 tracking-[2.5px]"
                    style={{ color: 'var(--gold2)' }}
                  >
                    {num}
                  </div>
                  <div
                    className="w-12 h-12 rounded-md flex items-center justify-center text-[21px] mb-5 border"
                    style={{ background: 'var(--goldg)', borderColor: 'var(--bdg)' }}
                  >
                    {icon}
                  </div>
                  <h3
                    className="font-display text-[27px] font-extrabold mb-3 leading-tight"
                    style={{ color: 'var(--w)' }}
                  >
                    {t(`${ns}.title`)}
                  </h3>
                  <p className="text-[14px] mb-5 leading-[1.75]" style={{ color: 'var(--wm)' }}>
                    {t(`${ns}.desc`)}
                  </p>
                  <ul className="list-none flex flex-col gap-2">
                    {items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-[13px]" style={{ color: 'var(--wm)' }}>
                        <span
                          className="w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: 'var(--gold)' }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              )
            })}
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
