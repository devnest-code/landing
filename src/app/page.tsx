import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

/** Sends Spanish-speaking browsers to /es and everyone else (US, Europe…) to /en. */
export default async function RootPage() {
  const preferred = (await headers()).get('accept-language')?.split(',')[0]?.trim().toLowerCase() ?? ''
  redirect(preferred.startsWith('es') ? '/es' : '/en')
}
