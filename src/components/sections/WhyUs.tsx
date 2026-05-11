'use client'
import { useTranslations } from 'next-intl'
import { RevealWrapper } from '@/components/ui/RevealWrapper'

export default function WhyUs() {
  const t = useTranslations('why')
  const cards: { title: string; desc: string }[] = t.raw('cards') as { title: string; desc: string }[]

  return (
    <section id="why" className="relative z-10 py-[100px] px-[5%]" style={{ background: 'var(--bg2)' }}>
      <div className="max-w-[1240px] mx-auto">
        <RevealWrapper>
          <div className="eyebrow-label">{t('eyebrow')}</div>
          <h2
            className="font-display font-extrabold leading-none mb-4"
            style={{ fontSize: 'clamp(36px,5.5vw,60px)', letterSpacing: '-0.5px', color: 'var(--w)' }}
          >
            {t('title1')}
            <br />
            <span className="text-gradient-animate">{t('title2')}</span>
          </h2>
          <p className="text-[16px] max-w-[560px]" style={{ color: 'var(--wm)', lineHeight: 1.7 }}>
            {t('subtitle')}
          </p>
        </RevealWrapper>

        <RevealWrapper delay={0.1} className="mt-13">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {cards.map((card, i) => (
              <div
                key={i}
                className="rounded-[10px] px-[26px] py-[34px] border transition-all duration-200"
                style={{ background: 'var(--bgc)', borderColor: 'var(--bd)' }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--bdg)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--bd)')}
              >
                <div
                  className="font-display font-black leading-none mb-1"
                  style={{ fontSize: 50, color: 'var(--gold)', opacity: 0.16 }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3
                  className="font-display text-[22px] font-bold mb-2.5 leading-tight"
                  style={{ color: 'var(--w)' }}
                >
                  {card.title}
                </h3>
                <p className="text-[14px] leading-[1.7]" style={{ color: 'var(--wm)' }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
