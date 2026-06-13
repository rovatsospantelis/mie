/**
 * ============================================================
 *  THEME — Παλέτα & γραμματοσειρές
 *  Άλλαξε τα tokens εδώ· όλο το site ακολουθεί.
 *  Τα ίδια ονόματα υπάρχουν και στο main.css (@theme).
 *  Κράτα τα συγχρονισμένα — αυτό το αρχείο είναι η "πηγή αλήθειας"
 *  για documentation/reference· το πραγματικό styling γίνεται
 *  μέσω των CSS custom properties στο main.css.
 * ============================================================
 *
 *  ΟΔΗΓΟΣ ΑΛΛΑΓΗΣ ΠΑΛΕΤΑΣ:
 *  1) Άλλαξε τα LIGHT tokens στο src/assets/main.css (@theme)
 *  2) Άλλαξε τα DARK tokens στο main.css (html.dark)
 *  3) Άλλαξε τα <link> των fonts στο index.html
 *
 *  Naming convention (μην το αλλάξεις — τα components το χρησιμοποιούν):
 *    --color-bg          φόντο σελίδας
 *    --color-bg-soft     ελαφρώς διαφορετικό φόντο (sections)
 *    --color-surface     κάρτες/επιφάνειες
 *    --color-ink         κύριο κείμενο
 *    --color-ink-soft    δευτερεύον κείμενο
 *    --color-muted       borders/διακριτικά
 *    --color-line        γραμμές/διαχωριστικά
 *    --color-accent      κύριο accent
 *    --color-accent-deep accent για κουμπιά/hover
 *    --font-sans         body
 *    --font-display      τίτλοι
 */

export const themeReference = {
  light: {
    bg: '#F5F4F2',
    bgSoft: '#ECEAE4',
    surface: '#FCFBF9',
    ink: '#1A1815',
    inkSoft: '#6E6A62',
    muted: '#C7C2B8',
    line: '#E2DED5',
    accent: '#B5715F',
    accentDeep: '#9E5E4D',
  },
  dark: {
    bg: '#16140F',
    bgSoft: '#1E1B15',
    surface: '#211E17',
    ink: '#EFEAE0',
    inkSoft: '#A39C8E',
    muted: '#4A4438',
    line: '#2E2A20',
    accent: '#C98978',
    accentDeep: '#D69E8E',
  },
  fonts: {
    sans: 'Commissioner, system-ui, sans-serif',
    display: 'Cormorant, Georgia, serif',
  },
}

export default themeReference
