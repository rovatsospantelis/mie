<script setup>
import { Sun, Moon } from 'lucide-vue-next'
import { useTheme } from '@/composables/useTheme'
import { site } from '@/config/site'

const { isDark, toggle } = useTheme()

function onToggle() {
  toggle()
  // Developer easter egg — η υπογραφή TenLux
  console.log(
    `%c🌓 ${site.credit.motto} %c· crafted by ${site.credit.name}`,
    'color:var(--color-accent);font-weight:bold;font-family:serif;font-size:13px',
    'color:#9a9183;font-style:italic'
  )
}
</script>

<template>
  <button
    @click="onToggle"
    :aria-label="isDark ? 'Φωτεινό θέμα' : 'Σκοτεινό θέμα'"
    :data-tip="isDark ? 'Lux' : 'Tenebras'"
    class="tl-toggle flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-ink hover:text-ink md:h-10 md:w-10"
  >
    <Moon v-if="!isDark" :size="18" :stroke-width="1.8" />
    <Sun v-else :size="18" :stroke-width="1.8" />
  </button>
</template>
