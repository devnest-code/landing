/**
 * Google Consent Mode v2 helpers shared by the cookie banner and the footer.
 * The defaults are set inline (see CONSENT_DEFAULT_SCRIPT) before GA/GTM load.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export type ConsentChoice = 'granted' | 'denied'

const STORAGE_KEY = 'cookie-consent'
export const OPEN_CONSENT_EVENT = 'open-cookie-consent'
const CHANGE_EVENT = 'cookie-consent-change'

/** Fallback when localStorage is blocked, so the banner still closes for this visit. */
let sessionChoice: ConsentChoice | null = null

/** EEA + UK + Switzerland: consent required before any analytics/ads storage. */
const STRICT_REGIONS = [
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT',
  'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'IS', 'LI', 'NO',
  'GB', 'CH',
]

const signals = (value: ConsentChoice) =>
  `{ad_storage:'${value}',ad_user_data:'${value}',ad_personalization:'${value}',analytics_storage:'${value}'}`

/**
 * Must run before gtag.js / GTM. Denied by default in strict regions, granted
 * elsewhere, then overridden by the visitor's stored choice (if any).
 */
export const CONSENT_DEFAULT_SCRIPT = `
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',Object.assign(${signals('denied')},{region:${JSON.stringify(STRICT_REGIONS)},wait_for_update:500}));
gtag('consent','default',${signals('granted')});
try{var c=localStorage.getItem('${STORAGE_KEY}');
if(c==='granted')gtag('consent','update',${signals('granted')});
else if(c==='denied')gtag('consent','update',${signals('denied')});}catch(e){}
`

export function readConsent(): ConsentChoice | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'granted' || value === 'denied' ? value : sessionChoice
  } catch {
    return sessionChoice
  }
}

export function subscribeConsent(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange)
  window.addEventListener('storage', onChange)
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange)
    window.removeEventListener('storage', onChange)
  }
}

export function saveConsent(choice: ConsentChoice) {
  sessionChoice = choice
  try {
    localStorage.setItem(STORAGE_KEY, choice)
  } catch {
    // Storage blocked: the choice still applies for this page view.
  }
  window.gtag?.('consent', 'update', {
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
    analytics_storage: choice,
  })
  window.dataLayer?.push({ event: 'cookie_consent_update', cookie_consent: choice })
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))
}
