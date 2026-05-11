'use client'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { LogoHero } from '@/components/ui/Logo'

const ease = [0.25, 0.46, 0.45, 0.94] as const

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease },
})

export default function Hero() {
  const t = useTranslations('hero')

  return (
    <section
      id="hero"
      className="relative z-10 min-h-screen flex items-center"
      style={{ padding: '90px 5% 80px' }}
    >
      <div
        className="grid gap-[60px] items-center w-full max-w-[1240px] mx-auto"
        style={{ gridTemplateColumns: '1.15fr 0.85fr' }}
      >
        {/* Left — copy */}
        <div>
          <motion.div
            {...fade(0)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-medium mb-5 border"
            style={{
              color: 'var(--gold)',
              borderColor: 'var(--bdg)',
              background: 'rgba(245,166,35,0.05)',
              letterSpacing: '0.6px',
            }}
          >
            <span className="badge-dot" />
            {t('badge')}
          </motion.div>

          <motion.h1
            {...fade(0.1)}
            className="font-display font-black leading-none mb-6"
            style={{
              fontSize: 'clamp(52px, 7.5vw, 92px)',
              letterSpacing: '-1px',
              color: 'var(--w)',
            }}
          >
            <span>{t('line1')}</span>
            <br />
            <span className="text-gradient-animate">{t('line2')}</span>
            <br />
            <span>{t('line3')}</span>
            <br />
            <span style={{ color: 'rgba(244,239,230,0.26)', display: 'block' }}>
              {t('line4')}
            </span>
          </motion.h1>

          <motion.p
            {...fade(0.2)}
            className="text-[17px] font-light max-w-[500px] mb-9"
            style={{ color: 'var(--wm)', lineHeight: 1.75 }}
          >
            {t('desc')}
          </motion.p>

          <motion.div {...fade(0.3)} className="flex items-center gap-3.5 flex-wrap">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center gap-1.5 px-7 py-3.5 rounded-md text-[15px] font-medium no-underline transition-all duration-200 border-none"
              style={{ background: 'var(--gold)', color: '#060200' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#ffc244'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 10px 28px rgba(245,166,35,0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--gold)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {t('cta_primary')}
            </a>
            <a
              href="#cases"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('cases')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center gap-1.5 px-7 py-3.5 rounded-md text-[15px] font-light no-underline transition-all duration-200 border"
              style={{ background: 'transparent', color: 'var(--w)', borderColor: 'var(--bd)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--bdg)'
                e.currentTarget.style.color = 'var(--gold)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--bd)'
                e.currentTarget.style.color = 'var(--w)'
              }}
            >
              {t('cta_secondary')}
            </a>
          </motion.div>
        </div>

        {/* Right — logo visual */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="hidden lg:flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="relative w-[300px] h-[300px] flex items-center justify-center">
            <div className="hring" />
            <div className="hring" />
            <div className="hring" />
            <LogoHero size={172} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
