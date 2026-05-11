'use client'
import { useEffect } from 'react'
import { useTranslations } from 'next-intl'

interface Section { heading: string; body: string }

interface Props {
  type: 'privacy' | 'terms'
  onClose: () => void
}

export function LegalModal({ type, onClose }: Props) {
  const t = useTranslations('legal')
  const sections = t.raw(type) as Section[]
  const title = t(type === 'privacy' ? 'privacy_title' : 'terms_title')

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-6"
      style={{ background: 'rgba(7,7,7,0.82)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative w-full sm:max-w-[680px] max-h-[92vh] sm:max-h-[80vh] flex flex-col rounded-t-2xl sm:rounded-2xl overflow-hidden"
        style={{ background: 'var(--bg2)', border: '1px solid var(--bd)' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-7 py-5 flex-shrink-0 border-b"
          style={{ borderColor: 'var(--bd)' }}
        >
          <div>
            <p className="text-[11px] font-medium uppercase tracking-widest mb-0.5" style={{ color: 'var(--gold)' }}>
              DevNest
            </p>
            <h2 className="font-display text-[22px] font-extrabold leading-none" style={{ color: 'var(--w)' }}>
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 border flex-shrink-0"
            style={{ borderColor: 'var(--bd)', color: 'var(--wm)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--bdg)'
              e.currentTarget.style.color = 'var(--gold)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--bd)'
              e.currentTarget.style.color = 'var(--wm)'
            }}
            aria-label={t('close')}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-7 py-6 flex flex-col gap-6">
          <p className="text-[12px]" style={{ color: 'var(--wm)' }}>
            {t('last_updated')}
          </p>
          {sections.map((s, i) => (
            <div key={i}>
              <h3 className="font-display text-[16px] font-bold mb-2" style={{ color: 'var(--w)' }}>
                {s.heading}
              </h3>
              <p
                className="text-[14px] leading-relaxed whitespace-pre-line"
                style={{ color: 'var(--wm)' }}
              >
                {s.body}
              </p>
            </div>
          ))}
          <div className="h-2" />
        </div>
      </div>
    </div>
  )
}
