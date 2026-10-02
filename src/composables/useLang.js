import { ref, watch } from 'vue'
import { ui } from '@/i18n/ui'

/**
 * useLang — ελληνικά / αγγλικά.
 * Αρχική γλώσσα: η αποθηκευμένη επιλογή, αλλιώς του browser (ελληνικός → el, οτιδήποτε άλλο → en).
 *
 *   t('works.title')          → κείμενο UI από το src/i18n/ui.js
 *   tr({ el: '…', en: '…' })  → κείμενο περιεχομένου (content.js)· απλό string περνάει ως έχει
 */
const LANGS = ['el', 'en']

function initial() {
  try {
    const saved = localStorage.getItem('lang')
    if (LANGS.includes(saved)) return saved
  } catch (e) {
    /* ignore */
  }
  const nav = typeof navigator !== 'undefined' ? navigator.language || '' : ''
  return nav.toLowerCase().startsWith('el') ? 'el' : 'en'
}

const lang = ref(initial())

watch(
  lang,
  (l) => {
    if (typeof document !== 'undefined') document.documentElement.lang = l
    try {
      localStorage.setItem('lang', l)
    } catch (e) {
      /* ignore */
    }
  },
  { immediate: true }
)

function t(key) {
  return ui[lang.value]?.[key] ?? ui.el[key] ?? key
}

function tr(value) {
  if (value && typeof value === 'object' && 'el' in value) return value[lang.value] ?? value.el
  return value
}

function toggleLang() {
  lang.value = lang.value === 'el' ? 'en' : 'el'
}

export function useLang() {
  return { lang, t, tr, toggleLang }
}
