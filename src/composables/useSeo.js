import { useHead } from '@unhead/vue'
import { site } from '@/config/site'

/**
 * usePageSeo — per-page title + description.
 * Τα OG defaults ζουν στο index.html (για no-JS crawlers).
 *
 * Χρήση μέσα σε <script setup>:
 *   usePageSeo({ title: 'Υπηρεσίες — …', description: '…' })
 */
export function usePageSeo({ title, description }) {
  const fullTitle = title ? `${title}` : site.name
  useHead({
    title: fullTitle,
    meta: description ? [{ name: 'description', content: description }] : [],
  })
}

/**
 * useStructuredData — JSON-LD για την αρχική (μία φορά, π.χ. στο App.vue).
 * Διαβάζει από το config· άλλαξε schemaType ανά project.
 */
export function useStructuredData() {
  const c = site.contact
  const hoursSpec = []
  const weekdays = [1, 2, 3, 4, 5]
  const dayMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  function fmt(mins) {
    const h = String(Math.floor(mins / 60)).padStart(2, '0')
    const m = String(mins % 60).padStart(2, '0')
    return `${h}:${m}`
  }
  // Group weekdays αν έχουν ίδιο ωράριο (απλοποιημένο: ανά μέρα)
  for (let d = 0; d <= 6; d++) {
    const h = site.hours[d]
    if (h) {
      hoursSpec.push({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: dayMap[d],
        opens: fmt(h.open),
        closes: fmt(h.close),
      })
    }
  }

  const data = {
    '@context': 'https://schema.org',
    '@type': site.seo.schemaType,
    name: site.name,
    description: site.description,
    url: site.domain,
    image: site.domain + site.seo.ogImage,
    telephone: c.phoneRaw,
    address: {
      '@type': 'PostalAddress',
      streetAddress: c.address.street,
      addressLocality: c.address.area,
      postalCode: c.address.postalCode,
      addressCountry: c.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: c.address.lat,
      longitude: c.address.lng,
    },
  }
  if (hoursSpec.length) data.openingHoursSpecification = hoursSpec
  if (site.seo.priceRange) data.priceRange = site.seo.priceRange
  const same = [site.social.instagram, site.social.tiktok, site.social.facebook].filter(Boolean)
  if (same.length) data.sameAs = same

  useHead({
    script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(data) }],
  })
}
