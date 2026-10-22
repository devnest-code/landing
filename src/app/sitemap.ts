import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://devnestcode.vercel.app'
  return [
    { url: `${base}/es`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/en`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    ...['usa', 'europe'].flatMap((region) =>
      ['en', 'es'].map((locale) => ({
        url: `${base}/${locale}/${region}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      })),
    ),
  ]
}
