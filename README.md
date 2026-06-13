# mie — Μαρίνα Δούκα · εικαστικό portfolio

Static site (Vue 3 + Tailwind v4) για **display έργων** καλλιτέχνη/σχεδιαστή.
Δομή εμπνευσμένη από benakishop.gr: **3-tier navbar**, **hero carousel**, sections σε **κάρτες**.
Χτισμένο πάνω στο TenLux starter — με **PWA**, **dark mode**, **SEO/JSON-LD**, **GA4**, animations έτοιμα.

> *Post tenebras spero lucem* — TenLux

---

## Γρήγορο ξεκίνημα
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/   (PWA service worker + manifest)
npm run preview
```

## Πού αλλάζεις τι
| Θέλεις να αλλάξεις | Αρχείο |
|---|---|
| Όνομα, επικοινωνία, social, GA, feature flags | `src/config/site.js` |
| **Έργα, hero slides, συλλογές, κείμενα** | `src/config/content.js` |
| Παλέτα (light + dark) & fonts | `src/assets/main.css` (`@theme` / `html.dark`) + `index.html` |
| Πλοήγηση (4 links → mobile tab bar) | `src/App.vue` → `navLinks` |
| PWA manifest | `vite.config.js` |

## Γραμματοσειρές
- **Display:** Cormorant (high-contrast serif, italic eyebrows) — με Greek subset
- **Body/UI:** Commissioner (humanist sans, Έλληνας σχεδιαστής, πλήρες Greek)
- Κοντινό free equivalent στο editorial ύφος του Benaki· αλλάζονται από `index.html` + `main.css`.

## Έργα & εικόνες
Τα έργα ζουν στο `public/works/<κατηγορία>/` και ορίζονται στο `src/config/content.js`:
- `sketches/` → υπο-tab **Sketches** (έργα σε χαρτί / prints)
- `items/` → υπο-tab **Creative items** (design αντικείμενα & print pieces)
- `pure/` → υπο-tab **Pure art** (πίνακες)

Τα 3 υπο-tabs παράγονται αυτόματα από το `collections` array (πεδίο `category`).
Για να **προσθέσεις έργο**: ρίξε την εικόνα στον φάκελο και βάλε μια γραμμή στο `works`:
`{ category: 'Pure art', image: '/works/pure/pure-07.jpg' }`
Προαιρετικά `title:` ή/και `caption:` — εμφανίζονται αυτόματα σε grid & lightbox.

Εικόνες About: `public/about/` (`studio.jpg`, `exhibition.jpg`).
Logos: `public/logo.png` (μαύρο), `logo-dark.png` (κρεμ), `logo-mark.png` (μόνο Μ),
και χρωματιστά `logos/m-blue.png` · `logos/m-orange.png` (διακριτικά accents).

## Δομή
```
src/
  config/      site.js · content.js · theme.js
  composables/ useTheme · useSeo
  components/  TheNavbar (3-tier) · HeroCarousel · TheFooter · ThemeToggle
               ContactForm · Gallery · OpenStatus · WhatsAppButton · BaseSection
  views/       Home · Work(=Έργα) · About · Contact
  directives/  reveal.js
  router/      index.js
scripts/       make_art.py · make_assets.py
public/        art/ · icons · og-image · robots.txt · sitemap.xml · _redirects
```

## Deploy (Netlify)
Build `npm run build` · Publish `dist` · `public/_redirects` κάνει το SPA routing.

### Production checklist
- [ ] `site.js`: domain, GA ID, στοιχεία επικοινωνίας
- [ ] Πραγματικά έργα/εικόνες + `content.js`
- [ ] Logo → `python3 scripts/make_assets.py logo.png "#FCFBF8" "tagline"` (icons + OG)
- [ ] Ξεσχόλιασε GA στο `index.html`
- [ ] `robots.txt` + `sitemap.xml`: πραγματικό domain
- [ ] Google Search Console: sitemap

---
Crafted by **TenLux** · *Post tenebras spero lucem*
