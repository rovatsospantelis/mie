/**
 * Analytics — λεπτό wrapper γύρω από το GA4 (gtag).
 * Δεν κάνει τίποτα αν δεν έχει οριστεί gaId στο config,
 * ή αν τρέχει σε localhost (το guard είναι στο index.html).
 */
import { site } from '@/config/site'

export function track(event, params = {}) {
  if (!site.gaId) return
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', event, params)
}

// Βολικά shortcuts για συνηθισμένα events
export function trackCTA(location) {
  track('cta_click', { location })
}

export function trackContact(method, location) {
  track('contact_click', { method, location })
}

export function trackPageView(path, title) {
  if (!site.gaId) return
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', 'page_view', { page_path: path, page_title: title })
}
