'use client'
import { useEffect, useState, useSyncExternalStore } from 'react'
import { useTranslations } from 'next-intl'
import { LegalModal } from '@/components/ui/LegalModal'
import {
  OPEN_CONSENT_EVENT,
  readConsent,
  saveConsent,
  subscribeConsent,
  type ConsentChoice,
} from '@/lib/consent'

export function CookieBanner() {
  const t = useTranslations('consent')
  const [reopened, setReopened] = useState(false)
  // 'server' during SSR/hydration so the banner only appears on the client.
  const stored = useSyncExternalStore(subscribeConsent, () => readConsent() ?? 'unset', () => 'server')
  const visible = reopened || stored === 'unset'
  const [showPrivacy, setShowPrivacy] = useState(false)

  useEffect(() => {
    const open = () => setReopened(true)
    window.addEventListener(OPEN_CONSENT_EVENT, open)
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, open)
  }, [])

  const choose = (choice: ConsentChoice) => {
    saveConsent(choice)
    setReopened(false)
  }

  return (
    <>
      {visible && (
        <div
          role="dialog"
          aria-live="polite"
          aria-labelledby="cookie-banner-title"
          className="fixed z-[9000] bottom-4 left-4 right-4 sm:right-auto sm:max-w-[440px] rounded-xl p-5 border"
          style={{
            background: 'var(--bg2)',
            borderColor: 'var(--bdg)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
          }}
        >
          <p
            id="cookie-banner-title"
            className="font-display text-[19px] font-extrabold leading-none"
            style={{ color: 'var(--w)' }}
          >
            {t('title')}
          </p>
          <p className="text-[13px] leading-relaxed mt-2.5" style={{ color: 'var(--wm)' }}>
            {t('text')}{' '}
            <button
              onClick={() => setShowPrivacy(true)}
              className="underline underline-offset-2 bg-transparent border-none p-0 cursor-pointer text-[13px]"
              style={{ color: 'var(--gold)' }}
            >
              {t('privacy')}
            </button>
          </p>
          <div className="flex gap-2.5 mt-4">
            <button
              onClick={() => choose('denied')}
              className="flex-1 py-2.5 rounded-md text-[14px] font-medium cursor-pointer border transition-colors duration-200"
              style={{ background: 'transparent', borderColor: 'var(--bd)', color: 'var(--w)' }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--bdg)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--bd)')}
            >
              {t('reject')}
            </button>
            <button
              onClick={() => choose('granted')}
              className="flex-1 py-2.5 rounded-md text-[14px] font-medium cursor-pointer border-none transition-all duration-200"
              style={{ background: 'var(--gold)', color: '#060200' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#ffc244')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--gold)')}
            >
              {t('accept')}
            </button>
          </div>
        </div>
      )}

      {showPrivacy && <LegalModal type="privacy" onClose={() => setShowPrivacy(false)} />}
    </>
  )
}
