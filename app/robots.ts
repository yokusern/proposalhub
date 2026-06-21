import type { MetadataRoute } from 'next'

const APP_URL = 'https://proposalhub-opal.vercel.app'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/auth'],
        disallow: ['/dashboard', '/propose', '/analytics', '/settings', '/templates', '/api/'],
      },
    ],
    sitemap: `${APP_URL}/sitemap.xml`,
  }
}
