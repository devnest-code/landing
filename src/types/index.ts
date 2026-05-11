export type Locale = 'es' | 'en'

export interface CaseMetric {
  value: string
  label: string
}

export interface CaseItem {
  tag: string
  title: string
  desc: string
  metrics: CaseMetric[]
  quote?: string
  url?: string
  type?: 'web' | 'desktop'
}

export interface TestimonialItem {
  quote: string
  name: string
  role: string
  initials: string
}
