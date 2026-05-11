'use client'
import { useEffect, useRef } from 'react'

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let W = (canvas.width = window.innerWidth)
    let H = (canvas.height = window.innerHeight)
    let animId: number

    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 90 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      s: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      o: Math.random() * 0.45 + 0.08,
      sq: Math.random() > 0.62,
    }))

    const loop = () => {
      ctx.clearRect(0, 0, W, H)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1
        ctx.globalAlpha = p.o
        ctx.fillStyle = '#F5A623'
        if (p.sq) {
          ctx.fillRect(p.x, p.y, p.s * 1.5, p.s * 1.5)
        } else {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      animId = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.35 }}
      aria-hidden="true"
    />
  )
}
