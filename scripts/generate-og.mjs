// Run once: node scripts/generate-og.mjs
// Generates public/og.png (1200x630) for Open Graph sharing

import sharp from '../node_modules/sharp/lib/index.js'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.join(__dirname, '..', 'public')

// Colors
const BG = '#070707'
const GOLD = '#F5A623'
const CREAM = '#F4EFE6'

// SVG template — no fonts needed, system sans-serif
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <radialGradient id="g1" cx="85%" cy="15%" r="55%">
      <stop offset="0%" stop-color="#F5A623" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#F5A623" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g2" cx="10%" cy="90%" r="45%">
      <stop offset="0%" stop-color="#F5A623" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#F5A623" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="dn" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFD166"/>
      <stop offset="100%" stop-color="#C47E10"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="${BG}"/>

  <!-- Glows -->
  <circle cx="1020" cy="-80" r="480" fill="url(#g1)"/>
  <circle cx="-60" cy="710" r="380" fill="url(#g2)"/>

  <!-- DN badge -->
  <rect x="96" y="80" width="68" height="68" rx="14" fill="url(#dn)"/>
  <text x="130" y="128" font-family="Arial Black, Arial, sans-serif" font-size="28" font-weight="900" fill="${BG}" text-anchor="middle">DN</text>

  <!-- DevNest wordmark -->
  <text x="184" y="130" font-family="Arial Black, Arial, sans-serif" font-size="52" font-weight="900" fill="${CREAM}">Dev</text>
  <text x="312" y="130" font-family="Arial Black, Arial, sans-serif" font-size="52" font-weight="900" fill="${GOLD}">Nest</text>

  <!-- Main tagline -->
  <text x="96" y="234" font-family="Arial Black, Arial, sans-serif" font-size="62" font-weight="900" fill="${CREAM}" letter-spacing="-2">Construimos el software</text>
  <text x="96" y="308" font-family="Arial Black, Arial, sans-serif" font-size="62" font-weight="900" fill="${GOLD}" letter-spacing="-2">que tu negocio necesita.</text>

  <!-- Pills -->
  <rect x="96" y="360" width="196" height="48" rx="24" fill="none" stroke="${GOLD}" stroke-opacity="0.4" stroke-width="1.5"/>
  <rect x="97" y="361" width="194" height="46" rx="23" fill="${GOLD}" fill-opacity="0.08"/>
  <text x="194" y="391" font-family="Arial, sans-serif" font-size="20" font-weight="500" fill="${GOLD}" text-anchor="middle">Outsourcing</text>

  <rect x="308" y="360" width="244" height="48" rx="24" fill="none" stroke="${GOLD}" stroke-opacity="0.4" stroke-width="1.5"/>
  <rect x="309" y="361" width="242" height="46" rx="23" fill="${GOLD}" fill-opacity="0.08"/>
  <text x="430" y="391" font-family="Arial, sans-serif" font-size="20" font-weight="500" fill="${GOLD}" text-anchor="middle">Software a Medida</text>

  <rect x="568" y="360" width="242" height="48" rx="24" fill="none" stroke="${GOLD}" stroke-opacity="0.4" stroke-width="1.5"/>
  <rect x="569" y="361" width="240" height="46" rx="23" fill="${GOLD}" fill-opacity="0.08"/>
  <text x="689" y="391" font-family="Arial, sans-serif" font-size="20" font-weight="500" fill="${GOLD}" text-anchor="middle">Productos Propios</text>

  <!-- URL -->
  <text x="1104" y="582" font-family="Arial, sans-serif" font-size="20" fill="${CREAM}" fill-opacity="0.28" text-anchor="end">devnest.io</text>
</svg>
`

const outPath = path.join(publicDir, 'og.png')
await sharp(Buffer.from(svg)).png().toFile(outPath)
console.log(`Generated: ${outPath}`)
