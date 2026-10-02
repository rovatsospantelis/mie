<script setup>
import { useLang } from '@/composables/useLang'

const { lang, t, toggleLang } = useLang()
</script>

<template>
  <!-- Δείχνει τη γλώσσα στην οποία θα αλλάξει -->
  <button
    @click="toggleLang"
    :aria-label="t('lang.switch')"
    :title="t('lang.switch')"
    class="flex h-9 w-9 items-center justify-center rounded-full border border-line text-[11px] font-medium tracking-wider text-ink-soft transition-colors hover:border-ink hover:text-ink md:h-10 md:w-10"
  >
    {{ lang === 'el' ? 'EN' : 'ΕΛ' }}
  </button>
</template>
