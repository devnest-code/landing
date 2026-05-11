'use client'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Logo } from '@/components/ui/Logo'
import { LangSwitcher } from '@/components/ui/LangSwitcher'

const links = [
  { href: '#services', key: 'services' },
  { href: '#process', key: 'process' },
  { href: '#stack', key: 'stack' },
  { href: '#cases', key: 'cases' },
  { href: '#testi', key: 'clients' },
] as const

export default function Navbar() {
  const t = useTranslations('nav')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center px-[5%] h-[68px] border-b transition-colors duration-300"
        style={{
          background: scrolled ? 'rgba(7,7,7,0.98)' : 'rgba(7,7,7,0.82)',
          backdropFilter: 'blur(18px)',
          borderColor: 'var(--bd)',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="flex items-center gap-2.5 no-underline flex-shrink-0"
          aria-label="DevNest"
        >
          <Logo size={34} />
          <span
            className="font-display text-[23px] font-extrabold tracking-wide"
            style={{ color: 'var(--w)', letterSpacing: 1 }}
          >
            Dev<span style={{ color: 'var(--gold)' }}>Nest</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-7 mx-auto list-none">
          {links.map((l) => (
            <li key={l.key}>
              <a
                href={l.href}
                onClick={(e) => { e.preventDefault(); scrollTo(l.href) }}
                className="text-[13px] no-underline transition-colors duration-200"
                style={{ color: 'var(--wm)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--w)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--wm)')}
              >
                {t(l.key)}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3 ml-auto lg:ml-0">
          <LangSwitcher />
          <button
            onClick={() => scrollTo('#contact')}
            className="hidden lg:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-md text-[13px] font-medium cursor-pointer transition-all duration-200 border-none"
            style={{ background: 'var(--gold)', color: '#060200' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#ffc244'
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(245,166,35,0.28)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--gold)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {t('cta')}
          </button>

          {/* Hamburger */}
          <button
            className="lg:hidden flex flex-col gap-[5px] p-1 bg-transparent border-none cursor-pointer"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block w-[22px] h-[1.5px] transition-all duration-200"
                style={{ background: 'var(--w)' }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="fixed top-[68px] left-0 right-0 z-40 flex flex-col gap-0.5 px-[5%] py-5 border-b"
          style={{
            background: 'rgba(7,7,7,0.97)',
            backdropFilter: 'blur(20px)',
            borderColor: 'var(--bd)',
          }}
        >
          {links.map((l) => (
            <a
              key={l.key}
              href={l.href}
              onClick={(e) => { e.preventDefault(); scrollTo(l.href) }}
              className="block py-3 text-base no-underline border-b"
              style={{ color: 'var(--wm)', borderColor: 'var(--bd)' }}
            >
              {t(l.key)}
            </a>
          ))}
          <button
            onClick={() => scrollTo('#contact')}
            className="mt-2 py-3 rounded-md text-base font-medium border-none cursor-pointer"
            style={{ background: 'var(--gold)', color: '#060200' }}
          >
            {t('cta')}
          </button>
        </div>
      )}
    </>
  )
}
