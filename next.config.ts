import createNextIntlPlugin from 'next-intl/plugin'
import type { NextConfig } from 'next'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  images: { formats: ['image/avif', 'image/webp'] },
  // Allow network IP access in dev (for testing from phone/other devices)
  allowedDevOrigins: ['192.168.18.97', 'jaden-quadrilingual-transphysically.ngrok-free.dev'],
}

export default withNextIntl(nextConfig)
