'use client'
import { useTranslations } from 'next-intl'
import { RevealWrapper } from '@/components/ui/RevealWrapper'
import { TiltCard } from '@/components/ui/TiltCard'
import type { CaseItem } from '@/types'

export default function Cases() {
  const t = useTranslations('cases')
  const items: CaseItem[] = t.raw('items') as CaseItem[]

  return (
    <section id="cases" className="relative z-10 py-[100px] px-[5%]" style={{ background: 'var(--bg)' }}>
      <div className="max-w-[1240px] mx-auto">
        <RevealWrapper className="mb-12">
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

        <RevealWrapper delay={0.1}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {items.map((item, i) => (
              <TiltCard
                key={i}
                className="tilt-card-inner rounded-[10px] p-[28px] border transition-all duration-200 flex flex-col"
                style={{ background: 'var(--bgc)', borderColor: 'var(--bd)' }}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span
                    className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium border leading-tight"
                    style={{
                      background: 'var(--goldg)',
                      borderColor: 'var(--bdg)',
                      color: 'var(--gold)',
                      letterSpacing: '0.3px',
                    }}
                  >
                    {item.tag}
                  </span>
                  {/* Web / Desktop badge */}
                  <span
                    className="flex-shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full border"
                    style={{
                      color: item.type === 'web' ? 'var(--gold)' : 'var(--wm)',
                      borderColor: item.type === 'web' ? 'var(--bdg)' : 'var(--bd)',
                      background: item.type === 'web' ? 'var(--goldg)' : 'transparent',
                    }}
                  >
                    {item.type === 'web' ? '🌐 Web' : '🖥 Desktop'}
                  </span>
                </div>

                <h3
                  className="font-display text-[20px] font-bold mb-2.5 leading-tight flex-shrink-0"
                  style={{ color: 'var(--w)' }}
                >
                  {item.title}
                </h3>

                <p className="text-[13px] leading-[1.75] mb-4 flex-grow" style={{ color: 'var(--wm)' }}>
                  {item.desc}
                </p>

                {/* Metrics */}
                <div className="flex gap-4 pt-4 border-t mb-4" style={{ borderColor: 'var(--bd)' }}>
                  {item.metrics.map((m, j) => (
                    <div key={j}>
                      <div
                        className="font-display text-[22px] font-extrabold leading-none"
                        style={{ color: 'var(--gold)' }}
                      >
                        {m.value}
                      </div>
                      <div className="text-[10px] mt-0.5" style={{ color: 'var(--wm)' }}>
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* URL link */}
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[13px] font-medium no-underline transition-all duration-200 mt-auto"
                    style={{ color: 'var(--gold)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.75')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                  >
                    {t('web_label')}
                  </a>
                )}
                {!item.url && (
                  <span className="text-[11px] mt-auto" style={{ color: 'rgba(244,239,230,0.2)' }}>
                    {t('desktop_label')}
                  </span>
                )}
              </TiltCard>
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
