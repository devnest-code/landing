'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { LegalModal } from '@/components/ui/LegalModal'

const socials = [
  { label: 'Facebook', short: 'fb', href: 'https://www.facebook.com/devnestcode/' },
  { label: 'GitHub', short: 'gh', href: 'https://github.com/devnest-code' },
  { label: 'Instagram', short: 'ig', href: 'https://www.instagram.com/devnestcode/' },
]

export default function Footer() {
  const t = useTranslations('footer')
  const [modal, setModal] = useState<'privacy' | 'terms' | null>(null)

  const services: string[] = t.raw('services') as string[]
  const company: string[] = t.raw('company') as string[]
  const contactLinks: string[] = t.raw('contact_links') as string[]

  const serviceHrefs = ['#services', '#services', '#services', '#services', '#services', '#services']
  const companyHrefs = ['#why', '#cases', '#testi', '#', '#']
  const contactHrefs = ['#contact', 'mailto:hello@devnest.io', '#', '#']

  return (
  <>
    <footer
      className="relative z-10 pt-[60px] pb-[30px] px-[5%] border-t"
      style={{ background: 'var(--bg2)', borderColor: 'var(--bd)' }}
    >
      <div className="max-w-[1240px] mx-auto">
        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-7 mb-11">
          {/* Brand */}
          <div>
            <h4
              className="font-display text-[23px] font-extrabold"
              style={{ color: 'var(--w)' }}
            >
              Dev<span style={{ color: 'var(--gold)' }}>Nest</span>
            </h4>
            <p className="text-[13px] mt-3 leading-relaxed" style={{ color: 'var(--wm)' }}>
              {t('desc')}
            </p>
            <div className="flex gap-2 mt-4">
              {socials.map((s) => (
                <div key={s.label} className="relative group/social">
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="w-[33px] h-[33px] rounded-full flex items-center justify-center text-xs font-medium no-underline transition-all duration-200 border"
                    style={{ borderColor: 'var(--bd)', color: 'var(--wm)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--bdg)'
                      e.currentTarget.style.color = 'var(--gold)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--bd)'
                      e.currentTarget.style.color = 'var(--wm)'
                    }}
                  >
                    {s.short}
                  </a>
                  {/* Tooltip */}
                  <span
                    className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded text-[11px] font-medium whitespace-nowrap opacity-0 group-hover/social:opacity-100 transition-opacity duration-150"
                    style={{
                      background: 'var(--bgc)',
                      color: 'var(--w)',
                      border: '1px solid var(--bd)',
                    }}
                  >
                    {s.label}
                    {/* Arrow */}
                    <span
                      className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent"
                      style={{ borderTopColor: 'var(--bd)' }}
                    />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h5
              className="text-[11px] font-medium uppercase tracking-widest mb-3.5"
              style={{ color: 'var(--w)' }}
            >
              {t('services_title')}
            </h5>
            <ul className="list-none flex flex-col gap-2.5">
              {services.map((s, i) => (
                <li key={i}>
                  <a
                    href={serviceHrefs[i]}
                    className="text-[13px] no-underline transition-colors duration-200"
                    style={{ color: 'var(--wm)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--wm)')}
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5
              className="text-[11px] font-medium uppercase tracking-widest mb-3.5"
              style={{ color: 'var(--w)' }}
            >
              {t('company_title')}
            </h5>
            <ul className="list-none flex flex-col gap-2.5">
              {company.map((c, i) => (
                <li key={i}>
                  <a
                    href={companyHrefs[i]}
                    className="text-[13px] no-underline transition-colors duration-200"
                    style={{ color: 'var(--wm)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--wm)')}
                  >
                    {c}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5
              className="text-[11px] font-medium uppercase tracking-widest mb-3.5"
              style={{ color: 'var(--w)' }}
            >
              {t('contact_title')}
            </h5>
            <ul className="list-none flex flex-col gap-2.5">
              {contactLinks.map((c, i) => (
                <li key={i}>
                  <a
                    href={contactHrefs[i]}
                    className="text-[13px] no-underline transition-colors duration-200"
                    style={{ color: 'var(--wm)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--wm)')}
                  >
                    {c}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex items-center justify-between flex-wrap gap-2.5 pt-5 border-t"
          style={{ borderColor: 'var(--bd)' }}
        >
          <p className="text-[12px]" style={{ color: 'rgba(244,239,230,0.22)' }}>
            {t('copy', { year: new Date().getFullYear() })}
          </p>
          <p className="text-[12px] flex items-center gap-1 flex-wrap" style={{ color: 'rgba(244,239,230,0.22)' }}>
            <button
              onClick={() => setModal('privacy')}
              className="underline-offset-2 hover:underline cursor-pointer bg-transparent border-none p-0 text-[12px] transition-colors duration-200"
              style={{ color: 'rgba(244,239,230,0.22)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--wm)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(244,239,230,0.22)')}
            >
              Privacidad
            </button>
            <span>·</span>
            <button
              onClick={() => setModal('terms')}
              className="underline-offset-2 hover:underline cursor-pointer bg-transparent border-none p-0 text-[12px] transition-colors duration-200"
              style={{ color: 'rgba(244,239,230,0.22)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--wm)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(244,239,230,0.22)')}
            >
              Términos
            </button>
            <span>·</span>
            {t('legal').replace('Privacidad · Términos · ', '').replace('Privacy · Terms · ', '').split('☕').map((part, i) =>
              i === 0 ? (
                <span key={i}>{part}</span>
              ) : (
                <span key={i} className="inline-flex items-center gap-1">
                  <span className="relative group/coffee inline-flex">
                    <span
                      className="px-1.5 py-0.5 rounded text-[13px] leading-none"
                      style={{
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.15)',
                      }}
                    >
                      ☕
                    </span>
                    <span
                      className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded text-[11px] font-medium whitespace-nowrap opacity-0 group-hover/coffee:opacity-100 transition-opacity duration-150"
                      style={{
                        background: 'var(--bgc)',
                        color: 'var(--w)',
                        border: '1px solid var(--bd)',
                      }}
                    >
                      Café
                      <span
                        className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent"
                        style={{ borderTopColor: 'var(--bd)' }}
                      />
                    </span>
                  </span>
                  {part}
                </span>
              )
            )}
          </p>
        </div>
      </div>
    </footer>

    {modal && <LegalModal type={modal} onClose={() => setModal(null)} />}
  </>
  )
}
