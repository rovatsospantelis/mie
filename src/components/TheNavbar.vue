<script setup>
import { Home, LayoutGrid, User, Mail } from 'lucide-vue-next'
import ThemeToggle from '@/components/ThemeToggle.vue'
import { site } from '@/config/site'

const props = defineProps({
  links: {
    type: Array,
    default: () => [
      { to: '/', label: 'Αρχική', icon: Home },
      { to: '/works', label: 'Έργα', icon: LayoutGrid },
      { to: '/about', label: 'Σχετικά', icon: User },
      { to: '/contact', label: 'Επαφή', icon: Mail },
    ],
  },
})
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-6">
      <!-- Logo (αριστερά) -->
      <div class="flex items-center gap-3 md:gap-4">
        <RouterLink to="/" class="inline-block shrink-0" aria-label="mie — Αρχική">
          <img src="/logo.png" alt="" aria-hidden="true" class="logo-light h-12 w-auto md:h-14" />
          <img src="/logo-dark.png" alt="" aria-hidden="true" class="logo-dark h-12 w-auto md:h-14" />
        </RouterLink>
      </div>

      <!-- Desktop nav (δεξιά) -->
      <nav class="hidden md:block">
        <ul class="flex items-center gap-10">
          <li v-for="l in props.links" :key="l.to">
            <RouterLink
                :to="l.to"
                exact-active-class="text-ink after:scale-x-100"
                class="label relative pb-1 text-ink-soft transition-colors hover:text-ink after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-center after:scale-x-0 after:bg-ink after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {{ l.label }}
            </RouterLink>
          </li>
          <ThemeToggle v-if="site.features.darkMode" />
        </ul>
      </nav>

      <!-- Mobile theme toggle (τέρμα δεξιά, μόνο σε mobile) -->
      <ThemeToggle v-if="site.features.darkMode" class="md:hidden" />
    </div>
  </header>

  <!-- Mobile bottom tab bar -->
  <nav
      class="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-surface/95 backdrop-blur md:hidden"
  >
    <ul
        class="flex items-stretch justify-around px-1 pt-1.5"
        style="padding-bottom: calc(0.4rem + env(safe-area-inset-bottom))"
    >
      <li v-for="l in props.links" :key="l.to" class="flex-1">
        <RouterLink
            :to="l.to"
            exact-active-class="text-accent bg-accent/10 font-medium"
            class="flex flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 text-ink-soft transition-colors"
        >
          <component :is="l.icon" :size="21" :stroke-width="1.6" />
          <span class="label text-[9px]">{{ l.label }}</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>