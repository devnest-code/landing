'use client'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'
import { useTransition } from 'react'

export function LangSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const switchTo = (newLocale: string) => {
    if (newLocale === locale) return
    startTransition(() => {
      router.replace(pathname, { locale: newLocale })
    })
  }

  const btn =
    'px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 border cursor-pointer'
  const active = 'bg-gold text-[#060200] border-gold'
  const inactive =
    'bg-transparent border-[var(--bd)] text-[var(--wm)] hover:border-[var(--bdg)] hover:text-gold'

  return (
    <div className="flex gap-1" aria-label="Language switcher">
      {(['es', 'en'] as const).map((l) => (
        <button
          key={l}
          onClick={() => switchTo(l)}
          disabled={isPending}
          className={`${btn} ${locale === l ? active : inactive}`}
          aria-pressed={locale === l}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
