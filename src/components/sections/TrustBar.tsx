'use client'
import { useTranslations } from 'next-intl'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'

const pillKeys = ['pill1', 'pill2', 'pill3', 'pill4', 'pill5'] as const
const statKeys = ['stat1', 'stat2', 'stat3', 'stat4'] as const

export default function TrustBar() {
  const t = useTranslations('trust')

  return (
    <section
      id="trust"
      className="relative z-10 py-[34px] px-[5%] border-t border-b"
      style={{ background: 'var(--bg2)', borderColor: 'var(--bd)' }}
    >
      <div className="max-w-[1240px] mx-auto flex items-center gap-7 flex-wrap">
        <span
          className="text-[11px] whitespace-nowrap flex-shrink-0 uppercase tracking-[0.5px]"
          style={{ color: 'var(--wm)' }}
        >
          {t('label')}
        </span>

        <div className="flex items-center gap-2 flex-wrap flex-1">
          {pillKeys.map((k) => (
            <span
              key={k}
              className="px-3 py-1 rounded-full text-[12px] border"
              style={{ borderColor: 'var(--bd)', color: 'var(--wm)' }}
            >
              {t(k)}
            </span>
          ))}
        </div>

        <div className="flex gap-8 flex-shrink-0 flex-wrap">
          {statKeys.map((k) => (
            <div key={k} className="text-center">
              <div
                className="font-display text-[30px] font-extrabold leading-none"
                style={{ color: 'var(--gold)' }}
              >
                <AnimatedCounter to={parseInt(t(`${k}_value`))} suffix={t(`${k}_suffix`)} />
              </div>
              <div className="text-[11px] mt-0.5" style={{ color: 'var(--wm)' }}>
                {t(`${k}_label`)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
