'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { RevealWrapper } from '@/components/ui/RevealWrapper'

export default function Process() {
  const t = useTranslations('process')
  const [activeStep, setActiveStep] = useState(0)

  const steps: { title: string; desc: string }[] = t.raw('steps') as { title: string; desc: string }[]

  return (
    <section id="process" className="relative z-10 py-[100px] px-[5%]" style={{ background: 'var(--bg2)' }}>
      <div className="max-w-[1240px] mx-auto">
        <RevealWrapper className="mb-[60px]">
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 relative">
            {/* Connector line */}
            <div
              className="absolute top-[27px] left-[13%] right-[13%] h-px hidden lg:block"
              style={{
                background:
                  'linear-gradient(90deg, transparent, var(--bdg) 20%, var(--bdg) 80%, transparent)',
              }}
            />

            {steps.map((step, i) => {
              const isActive = activeStep === i
              return (
                <div
                  key={i}
                  className="px-[18px] py-0 text-center cursor-pointer"
                  onMouseEnter={() => setActiveStep(i)}
                  onMouseLeave={() => setActiveStep(0)}
                >
                  <div className="flex items-center justify-center mb-5">
                    <div
                      className="w-[54px] h-[54px] rounded-full flex items-center justify-center font-display text-[20px] font-extrabold relative z-10 border transition-all duration-250"
                      style={
                        isActive
                          ? {
                              background: 'var(--gold)',
                              color: '#060200',
                              borderColor: 'var(--gold)',
                              boxShadow: '0 0 28px rgba(245,166,35,0.4)',
                            }
                          : {
                              background: 'var(--bg)',
                              color: 'var(--gold)',
                              borderColor: 'var(--bdg)',
                            }
                      }
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>
                  </div>
                  <h3
                    className="font-display text-[21px] font-bold mb-2.5"
                    style={{ color: 'var(--w)' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[13px] leading-[1.65]" style={{ color: 'var(--wm)' }}>
                    {step.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
