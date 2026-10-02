/**
 * ============================================================
 *  mie — Περιεχόμενο (content-driven)
 *  ΣΗΜΕΙΩΣΗ: τα works δεν έχουν τίτλους/διαστάσεις ακόμη.
 *  Πρόσθεσε προαιρετικά  title: '...'  ή/και  caption: '...'
 *  σε όποιο έργο θες — το UI τα δείχνει αυτόματα αν υπάρχουν.
 *
 *  ΓΛΩΣΣΕΣ: τα κείμενα είναι { el: '…', en: '…' }. Απλό string = ίδιο και στις δύο.
 * ============================================================
 */

// --- Hero carousel (αρχική) ---
export const heroSlides = [
  {
    image: '/works/pure/pure-04.jpg',
    eyebrow: 'Pure art',
    title: { el: 'Πίνακες', en: 'Paintings' },
    text: { el: 'Αφηρημένες συνθέσεις σε χρώμα και υφή.', en: 'Abstract compositions in colour and texture.' },
    cta: { label: { el: 'Δείτε τους πίνακες', en: 'View the paintings' }, to: { path: '/works', query: { c: 'Pure art' } } },
  },
  {
    image: '/works/pure/pure-02.jpg',
    eyebrow: 'Pure art',
    title: { el: 'Χρώμα & φόρμα', en: 'Colour & form' },
    text: { el: 'Art pieces και print pieces με χαρακτήρα και προσωπική ταυτότητα.', en: 'Art pieces and print pieces with character and a personal identity.' },
    cta: { label: { el: 'Δείτε τα έργα', en: 'View the works' }, to: '/works' },
  },
  {
    image: '/works/pure/pure-01.jpg',
    eyebrow: 'Pure art',
    title: { el: 'Πίνακες', en: 'Paintings' },
    text: { el: 'Αφηρημένες συνθέσεις σε χρώμα και υφή.', en: 'Abstract compositions in colour and texture.' },
    cta: { label: { el: 'Δείτε τους πίνακες', en: 'View the paintings' }, to: { path: '/works', query: { c: 'Pure art' } } },
  },
  {
    image: '/works/pure/pure-06.jpg',
    eyebrow: 'Pure art',
    title: { el: 'Πίνακες', en: 'Paintings' },
    text: { el: 'Αφηρημένες συνθέσεις σε χρώμα και υφή.', en: 'Abstract compositions in colour and texture.' },
    cta: { label: { el: 'Δείτε τους πίνακες', en: 'View the paintings' }, to: { path: '/works', query: { c: 'Pure art' } } },
  },
  {
    image: '/about/place.png',
    eyebrow: { el: 'Εργαστήριο', en: 'Studio' },
    title: { el: 'Στο στούντιο', en: 'In the studio' },
    text: { el: 'Από το σχέδιο στο αντικείμενο — όλα γίνονται με το χέρι.', en: 'From sketch to object — everything is made by hand.' },
    cta: { label: { el: 'Γνωρίστε με', en: 'Meet me' }, to: '/about' },
  },
]

// --- «Σύντομα διαθέσιμα» ---
// Κατηγορίες που δείχνονται ως preview (σήμα «Σύντομα» + σημείωμα στη σελίδα Έργα).
// Όταν τα Items βγουν προς πώληση: άδειασε το categories → [] και άλλαξε το feature πιο κάτω.
export const comingSoon = {
  categories: ['Items'],
  badge: { el: 'Σύντομα', en: 'Coming soon' },
  eyebrow: { el: 'Νέα συλλογή · Σύντομα διαθέσιμη', en: 'New collection · Coming soon' },
  title: { el: 'Τα αντικείμενα ετοιμάζονται', en: 'The objects are on their way' },
  text: {
    el: 'Τα κομμάτια που βλέπετε είναι μια πρώτη ματιά στη συλλογή, που ολοκληρώνεται αυτή την περίοδο στο εργαστήριο. Θέλετε να μάθετε πρώτοι πότε θα είναι διαθέσιμα ή να κρατήσετε κάποιο;',
    en: 'The pieces you see are a first look at a collection currently being completed in the studio. Would you like to be the first to know when they become available, or reserve one?',
  },
  cta: { label: { el: 'Ενημερωθείτε πρώτοι', en: 'Be the first to know' }, to: { path: '/contact', query: { topic: 'items' } } },
  // προσυμπληρωμένο μήνυμα στη φόρμα όταν έρχονται από το παραπάνω CTA
  message: {
    el: 'Γεια σας! Θα ήθελα να ενημερωθώ όταν η συλλογή αντικειμένων είναι διαθέσιμη.',
    en: 'Hello! I would like to be notified when the collection of objects becomes available.',
  },
}

// --- Feature banner ---
export const feature = {
  image: '/works/items/items-02.png',
  eyebrow: { el: 'Items · Σύντομα', en: 'Items · Coming soon' },
  title: { el: 'Η Τέχνη γίνεται αντικείμενο', en: 'Art becomes object' },
  text: {
    el: 'Έργα τέχνης γίνονται χρηστικά αντικείμενα. Η συλλογή ολοκληρώνεται στο εργαστήριο — δείτε μια πρώτη ματιά.',
    en: 'Works of art become everyday objects. The collection is being completed in the studio — take a first look.',
  },
  cta: { label: { el: 'Μια πρώτη ματιά', en: 'Take a first look' }, to: { path: '/works', query: { c: 'Items' } } },
}

// --- Συλλογές / υπο-κατηγορίες (τα 3 υπο-tabs των Έργων) ---
export const collections = [
  { title: 'Pure art', image: '/works/pure/pure-02.jpg', category: 'Pure art' },
  { title: 'Sketches', image: '/works/sketches/sketches-19.jpg', category: 'Sketches' },
  { title: 'Items', image: '/works/items/items-02.png', category: 'Items' },
]

// --- Έργα (grid + lightbox) ---
export const works = [
  // Sketches — έργα σε χαρτί / prints
  { category: 'Sketches', image: '/works/sketches/sketches-16.jpg' },
  { category: 'Sketches', image: '/works/sketches/sketches-17.jpg' },
  { category: 'Sketches', image: '/works/sketches/sketches-18.jpg' },
  { category: 'Sketches', image: '/works/sketches/sketches-19.jpg' },
  { category: 'Sketches', image: '/works/sketches/sketches-20.jpg' },
  { category: 'Sketches', image: '/works/sketches/sketches-21.jpg' },
  { category: 'Sketches', image: '/works/sketches/sketches-22.jpg' },
  { category: 'Sketches', image: '/works/sketches/sketches-23.jpg' },
  { category: 'Sketches', image: '/works/sketches/sketches-24.jpg' },
  { category: 'Sketches', image: '/works/sketches/sketches-25.jpg' },
  { category: 'Sketches', image: '/works/sketches/sketches-26.jpg' },
  { category: 'Sketches', image: '/works/sketches/sketches-27.jpg' },
  { category: 'Sketches', image: '/works/sketches/sketches-28.jpg' },
  { category: 'Sketches', image: '/works/sketches/sketches-29.jpg' },
  { category: 'Sketches', image: '/works/sketches/sketches-30.jpg' },
  { category: 'Sketches', image: '/works/sketches/sketches-31.jpg' },
  { category: 'Sketches', image: '/works/sketches/sketches-32.jpg' },
  { category: 'Sketches', image: '/works/sketches/sketches-33.jpg' },
  { category: 'Sketches', image: '/works/sketches/sketches-34.jpg' },
  { category: 'Sketches', image: '/works/sketches/sketches-35.jpg' },
  { category: 'Sketches', image: '/works/sketches/sketches-36.jpg' },
  { category: 'Sketches', image: '/works/sketches/sketches-37.jpg' },
  { category: 'Sketches', image: '/works/sketches/sketches-38.jpg' },
  { category: 'Sketches', image: '/works/sketches/sketches-39.jpg' },
  { category: 'Sketches', image: '/works/sketches/sketches-40.jpg' },
  { category: 'Sketches', image: '/works/sketches/sketches-41.jpg' },
  { category: 'Sketches', image: '/works/sketches/sketches-42.jpg' },

  { category: 'Sketches', image: '/works/sketches/sketches-44.jpg' },
  { category: 'Sketches', image: '/works/sketches/sketches-45.jpg' },
  { category: 'Sketches', image: '/works/sketches/sketches-46.jpg' },
  { category: 'Sketches', image: '/works/sketches/sketches-47.jpg' },
  // Items — design αντικείμενα & print pieces
  { category: 'Items', image: '/works/items/items-01.png' },
  { category: 'Items', image: '/works/items/items-02.png' },
  { category: 'Items', image: '/works/items/items-03.png' },
  { category: 'Items', image: '/works/items/items-04.png' },
  { category: 'Items', image: '/works/items/items-05.png' },

  { category: 'Items', image: '/works/items/items-07.png' },
  { category: 'Items', image: '/works/items/items-08.png' },
  { category: 'Items', image: '/works/items/items-09.png' },
  { category: 'Items', image: '/works/items/items-10.png' },
  { category: 'Items', image: '/works/items/items-11.png' },
  { category: 'Items', image: '/works/items/items-12.png' },
  { category: 'Items', image: '/works/items/items-13.png' },
  { category: 'Items', image: '/works/items/items-14.png' },
  { category: 'Items', image: '/works/items/items-15.png' },
  { category: 'Items', image: '/works/items/items-16.png' },
  { category: 'Items', image: '/works/items/items-17.png' },
  { category: 'Items', image: '/works/items/items-18.png' },
  { category: 'Items', image: '/works/items/items-19.png' },
  { category: 'Items', image: '/works/items/items-20.png' },
  // Pure art — πίνακες
  { category: 'Pure art', image: '/works/pure/pure-01.jpg' },
  { category: 'Pure art', image: '/works/pure/pure-02.jpg' },
  { category: 'Pure art', image: '/works/pure/pure-03.jpg' },
  { category: 'Pure art', image: '/works/pure/pure-04.jpg' },
  { category: 'Pure art', image: '/works/pure/pure-05.jpg' },
  { category: 'Pure art', image: '/works/pure/pure-06.jpg' },
  { category: 'Pure art', image: '/works/pure/pure-07.png' },
  { category: 'Pure art', image: '/works/pure/pure-08.png' },
  { category: 'Pure art', image: '/works/pure/pure-09.png' },
  { category: 'Pure art', image: '/works/pure/pure-10.png' },
  { category: 'Pure art', image: '/works/pure/pure-11.png' },
  { category: 'Pure art', image: '/works/pure/pure-12.png' },
  { category: 'Pure art', image: '/works/pure/pure-13.png' },
  { category: 'Pure art', image: '/works/pure/pure-14.png' },
  { category: 'Pure art', image: '/works/pure/pure-15.png' },
  { category: 'Pure art', image: '/works/pure/pure-16.png' },
  { category: 'Pure art', image: '/works/pure/pure-17.png' },
  { category: 'Pure art', image: '/works/pure/pure-18.png' },
  { category: 'Pure art', image: '/works/pure/pure-19.png' },
  { category: 'Pure art', image: '/works/pure/pure-20.png' },
  { category: 'Pure art', image: '/works/pure/pure-21.png' },
  { category: 'Pure art', image: '/works/pure/pure-22.png' },
  { category: 'Pure art', image: '/works/pure/pure-23.png' },
  { category: 'Pure art', image: '/works/pure/pure-24.png' },
  { category: 'Pure art', image: '/works/pure/pure-25.png' }
]

// --- Editorial 3-up ---
export const editorial = [
  { title: 'Sketches', label: { el: 'Έργα σε χαρτί', en: 'Works on paper' }, image: '/works/sketches/sketches-23.jpg', to: { path: '/works', query: { c: 'Sketches' } } },
  { title: 'Items', label: { el: 'Αντικείμενα · Σύντομα', en: 'Objects · Coming soon' }, image: '/works/items/items-11.png', to: { path: '/works', query: { c: 'Items' } } },
  { title: 'Pure art', label: { el: 'Πίνακες', en: 'Paintings' }, image: '/works/pure/pure-03.jpg', to: { path: '/works', query: { c: 'Pure art' } } },
]

// --- Σχετικά (σελίδα /about) ---
export const about = {
  portrait: '/about/me.png',
  secondary: '/about/place.png',
  lead: {
    el: 'Η Marina είναι creative designer με υπόβαθρο στην εσωτερική αρχιτεκτονική και πάθος για τη σύνθεση, το χρώμα και το visual storytelling.',
    en: 'Marina is a creative designer with a background in interior architecture and a passion for composition, colour and visual storytelling.',
  },
  paragraphs: [
    {
      el: 'Μέσα από τα art pieces και τα print pieces της εξερευνά παιχνιδιάρικες φόρμες, προσεγμένες λεπτομέρειες και εκφραστική αισθητική, δημιουργώντας έργα που είναι ταυτόχρονα σύγχρονα και προσωπικά.',
      en: 'Through her art pieces and print pieces she explores playful forms, careful detail and an expressive aesthetic, creating works that are both contemporary and personal.',
    },
    {
      el: 'Η δουλειά της ισορροπεί ανάμεσα στο σύγχρονο design και την καλλιτεχνική έκφραση — με στόχο να δίνει μορφή σε αντικείμενα και εικόνες με αισθητική, χαρακτήρα και ταυτότητα.',
      en: 'Her work balances contemporary design and artistic expression — giving shape to objects and images with aesthetic, character and identity.',
    },
  ],
  focus: ['Art pieces', 'Print pieces', { el: 'Χρώμα & φόρμα', en: 'Colour & form' }, 'Interior architecture'],
}

export const wordmark = {
  text: 'mie',
  letters: [
    { char: 'm', image: '/works/pure/pure-02.jpg',        position: '50% 42%' },
    { char: 'i', image: '/works/sketches/sketches-34.jpg', position: '50% 40%' },
    { char: 'e', image: '/works/items/items-05.jpg',       position: '50% 50%' }
  ]
}
