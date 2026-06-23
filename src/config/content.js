/**
 * ============================================================
 *  mie — Περιεχόμενο (content-driven)
 *  ΣΗΜΕΙΩΣΗ: τα works δεν έχουν τίτλους/διαστάσεις ακόμη.
 *  Πρόσθεσε προαιρετικά  title: '...'  ή/και  caption: '...'
 *  σε όποιο έργο θες — το UI τα δείχνει αυτόματα αν υπάρχουν.
 * ============================================================
 */

// --- Hero carousel (αρχική) ---
export const heroSlides = [
  {
    image: '/works/pure/pure-04.jpg',
    eyebrow: 'Pure art',
    title: 'Πίνακες',
    text: 'Αφηρημένες συνθέσεις σε χρώμα και υφή.',
    cta: { label: 'Δείτε τους πίνακες', to: { path: '/works', query: { c: 'Pure art' } } },
  },
  {
    image: '/works/pure/pure-02.jpg',
    eyebrow: 'Pure art',
    title: 'Χρώμα & φόρμα',
    text: 'Art pieces και print pieces με χαρακτήρα και προσωπική ταυτότητα.',
    cta: { label: 'Δείτε τα έργα', to: '/works' },
  },
  {
    image: '/works/pure/pure-01.jpg',
    eyebrow: 'Pure art',
    title: 'Πίνακες',
    text: 'Αφηρημένες συνθέσεις σε χρώμα και υφή.',
    cta: { label: 'Δείτε τους πίνακες', to: { path: '/works', query: { c: 'Pure art' } } },
  },
  {
    image: '/works/pure/pure-06.jpg',
    eyebrow: 'Pure art',
    title: 'Πίνακες',
    text: 'Αφηρημένες συνθέσεις σε χρώμα και υφή.',
    cta: { label: 'Δείτε τους πίνακες', to: { path: '/works', query: { c: 'Pure art' } } },
  },
  {
    image: '/about/place.png',
    eyebrow: 'Εργαστήριο',
    title: 'Στο στούντιο',
    text: 'Από το σχέδιο στο αντικείμενο — όλα γίνονται με το χέρι.',
    cta: { label: 'Γνωρίστε με', to: '/about' },
  },
]

// --- Feature banner ---
export const feature = {
  image: '/works/items/items-02.jpg',
  eyebrow: 'Creative items',
  title: 'Το «mie» γίνεται αντικείμενο',
  text: 'Το μονόγραμμα ζει και ως χειροποίητο αντικείμενο — φόρμα, χρήση και χαρακτήρας σε ένα.',
  cta: { label: 'Δείτε τα αντικείμενα', to: { path: '/works', query: { c: 'Creative items' } } },
}

// --- Συλλογές / υπο-κατηγορίες (τα 3 υπο-tabs των Έργων) ---
export const collections = [
  { title: 'Sketches', image: '/works/sketches/sketches-19.jpg', category: 'Sketches' },
  { title: 'Creative items', image: '/works/items/items-02.jpg', category: 'Creative items' },
  { title: 'Pure art', image: '/works/pure/pure-02.jpg', category: 'Pure art' },
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
  { category: 'Sketches', image: '/works/sketches/sketches-43.jpg' },
  { category: 'Sketches', image: '/works/sketches/sketches-44.jpg' },
  { category: 'Sketches', image: '/works/sketches/sketches-45.jpg' },
  { category: 'Sketches', image: '/works/sketches/sketches-46.jpg' },
  { category: 'Sketches', image: '/works/sketches/sketches-47.jpg' },
  // Creative items — design αντικείμενα & print pieces
  { category: 'Creative items', image: '/works/items/items-01.jpg' },
  { category: 'Creative items', image: '/works/items/items-02.jpg' },
  { category: 'Creative items', image: '/works/items/items-03.jpg' },
  { category: 'Creative items', image: '/works/items/items-04.jpg' },
  { category: 'Creative items', image: '/works/items/items-05.jpg' },
  { category: 'Creative items', image: '/works/items/items-07.jpg' },
  { category: 'Creative items', image: '/works/items/items-08.jpg' },
  { category: 'Creative items', image: '/works/items/items-09.jpg' },
  { category: 'Creative items', image: '/works/items/items-10.jpg' },
  { category: 'Creative items', image: '/works/items/items-11.jpg' },
  { category: 'Creative items', image: '/works/items/items-12.jpg' },
  { category: 'Creative items', image: '/works/items/items-13.jpg' },
  { category: 'Creative items', image: '/works/items/items-14.jpg' },
  { category: 'Creative items', image: '/works/items/items-15.jpg' },
  { category: 'Creative items', image: '/works/items/items-16.jpg' },
  { category: 'Creative items', image: '/works/items/items-17.jpg' },
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
  { category: 'Pure art', image: '/works/pure/pure-16.png' }
]

// --- Editorial 3-up ---
export const editorial = [
  { title: 'Sketches', label: 'Έργα σε χαρτί', image: '/works/sketches/sketches-23.jpg', to: { path: '/works', query: { c: 'Sketches' } } },
  { title: 'Creative items', label: 'Αντικείμενα & prints', image: '/works/items/items-04.jpg', to: { path: '/works', query: { c: 'Creative items' } } },
  { title: 'Pure art', label: 'Πίνακες', image: '/works/pure/pure-03.jpg', to: { path: '/works', query: { c: 'Pure art' } } },
]

// --- Σχετικά (σελίδα /about) ---
export const about = {
  portrait: '/about/me.png',
  secondary: '/about/place.png',
  lead: 'Η Marina είναι creative designer με υπόβαθρο στην εσωτερική αρχιτεκτονική και πάθος για τη σύνθεση, το χρώμα και το visual storytelling.',
  paragraphs: [
    'Μέσα από τα art pieces και τα print pieces της εξερευνά παιχνιδιάρικες φόρμες, προσεγμένες λεπτομέρειες και εκφραστική αισθητική, δημιουργώντας έργα που είναι ταυτόχρονα σύγχρονα και προσωπικά.',
    'Η δουλειά της ισορροπεί ανάμεσα στο σύγχρονο design και την καλλιτεχνική έκφραση — με στόχο να δίνει μορφή σε αντικείμενα και εικόνες με αισθητική, χαρακτήρα και ταυτότητα.',
  ],
  focus: ['Art pieces', 'Print pieces', 'Χρώμα & φόρμα', 'Interior architecture'],
}

export const wordmark = {
  text: 'mie',
  letters: [
    { char: 'm', image: '/works/pure/pure-02.jpg',        position: '50% 42%' },
    { char: 'i', image: '/works/sketches/sketches-34.jpg', position: '50% 40%' },
    { char: 'e', image: '/works/items/items-05.jpg',       position: '50% 50%' }
  ]
}

