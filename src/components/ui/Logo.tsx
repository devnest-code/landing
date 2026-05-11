'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export function Logo({ size = 34 }: { size?: number }) {
  return (
    <motion.div
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      style={{ flexShrink: 0, display: 'inline-flex' }}
    >
      <Image
        src="/logo-wbg.png"
        alt="DevNest logo"
        width={size}
        height={size}
        priority
        style={{ objectFit: 'contain', width: size, height: size }}
      />
    </motion.div>
  )
}

export function LogoHero({ size = 172 }: { size?: number }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1, y: -8 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      style={{
        cursor: 'pointer',
        position: 'relative',
        zIndex: 2,
        filter: 'drop-shadow(0 0 38px rgba(245,166,35,0.55))',
      }}
    >
      <div className="hlogo-float">
        <Image
          src="/logo-wbg.png"
          alt="DevNest"
          width={size}
          height={size}
          priority
          style={{ objectFit: 'contain', width: size, height: size }}
        />
      </div>
    </motion.div>
  )
}
