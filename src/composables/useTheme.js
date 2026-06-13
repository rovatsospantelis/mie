import { ref } from 'vue'

/**
 * useTheme — διαχείριση dark/light.
 * Το αρχικό theme ορίζεται από το no-flash script στο index.html
 * (διαβάζει localStorage ή prefers-color-scheme).
 */
const isDark = ref(
  typeof document !== 'undefined' &&
    document.documentElement.classList.contains('dark')
)

export function useTheme() {
  function toggle() {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark', isDark.value)
    try {
      localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    } catch (e) {
      /* ignore */
    }
  }

  return { isDark, toggle }
}
