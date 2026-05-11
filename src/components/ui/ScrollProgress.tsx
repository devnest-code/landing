'use client'
import { useEffect, useState } from 'react'

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const el = document.documentElement
      const scrolled = el.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setProgress(total > 0 ? (scrolled / total) * 100 : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '2px',
        width: `${progress}%`,
        background: 'linear-gradient(90deg, var(--gold2), var(--gold), #ffd166)',
        zIndex: 9999,
        transition: 'width 0.08s linear',
        boxShadow: '0 0 8px rgba(245,166,35,0.6)',
        pointerEvents: 'none',
      }}
    />
  )
}
