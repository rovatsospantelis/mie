/**
 * ============================================================
 *  ATELIER NÓTOS — Κεντρικό config
 *  Άλλαξε ΜΟΝΟ αυτό το αρχείο (+ src/config/content.js) ανά project.
 *  Τα components/SEO/analytics διαβάζουν από εδώ.
 * ============================================================
 */

export const site = {
  // --- Ταυτότητα ---
  name: 'mie',
  shortName: 'mie',
  tagline: 'Μαρίνα Δούκα — creative designer',
  description:
    'mie — εικαστικό εργαστήριο της Μαρίνας Δούκα στην Αθήνα. Ζωγραφική, κεραμική, χαρτί και υφαντά. Δείτε επιλεγμένα έργα και συλλογές.',
  lang: 'el',
  domain: 'https://mie.example', // χωρίς trailing slash

  // --- Επικοινωνία ---
  contact: {
    mobile: '+30 697 821 0093',
    mobileRaw: '+306978210093',
    email: 'doyka.marina@gmail.com',
    address: ''
  },

  // --- Social (άσε κενό '' για να μην εμφανίζεται) ---
  // social: {
  //   instagram: 'https://instagram.com/',
  //   tiktok: '',
  //   facebook: '',
  //   whatsapp: '',
  // },
  social: '',

  // --- Booking / κύριο CTA (κενό = ανενεργό) ---
  cta: {
    label: 'Κλείστε επίσκεψη',
    url: '',
  },

  // --- Ωράριο: όλα null για portfolio (χωρίς ωράριο καταστήματος) ---
  hours: { 0: null, 1: null, 2: null, 3: null, 4: null, 5: null, 6: null },

  // --- Analytics (κενό = δεν φορτώνει) ---
  gaId: '',

  // --- SEO / structured data ---
  seo: {
    schemaType: 'Organization', // εικαστικό στούντιο
    ogImage: '/og-image.png',
    priceRange: '', // κενό → δεν μπαίνει στο JSON-LD
  },

  // --- Feature flags ---
  features: {
    darkMode: true,
    openStatus: false,    // χωρίς ωράριο καταστήματος
    whatsappButton: false,
    contactForm: true,    // φόρμα επικοινωνίας
    gallery: true,        // grid έργων + lightbox
    booking: false,
  },

  // --- Υπογραφή TenLux (easter egg) ---
  credit: {
    name: 'TenLux',
    email: 'p.rovatso@gmail.com',
    motto: 'Post tenebras spero lucem',
  },
}

export default site
