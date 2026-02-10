export const siteConfig = {
  name: 'Nuevos Espacios - Landing Page',
  description:
    'Nuevos Espacios es una empresa dedicada a la venta de jardines artificales verticales, pasto sintetico y plantas artificiales.',
  // IMPORTANT: set NEXT_PUBLIC_SITE_URL in production (your real domain)
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ogImage: '/og.png', // put a 1200x630 image in /public/og.png later
} as const