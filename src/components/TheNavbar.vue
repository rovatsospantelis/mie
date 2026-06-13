<script setup>
import { Home, LayoutGrid, User, Mail, Instagram } from 'lucide-vue-next'
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
  <header class="sticky top-0 z-50 bg-bg/90 backdrop-blur">
    <!-- Tier 1: utility bar -->
    <div class="border-b border-line/70">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-5 py-2.5 md:px-6">
        <ThemeToggle v-if="site.features.darkMode" />
        <span v-else class="h-9 w-9" />

        <div class="flex items-center gap-4">
          <a
            v-if="site.social.instagram"
            :href="site.social.instagram"
            target="_blank"
            rel="noopener"
            aria-label="Instagram"
            class="text-ink-soft transition-colors hover:text-ink"
          >
            <Instagram :size="17" :stroke-width="1.7" />
          </a>
        </div>
      </div>
    </div>

    <!-- Tier 2: centered logo -->
    <div class="mx-auto max-w-6xl px-6 py-5 text-center md:py-6">
      <RouterLink to="/" class="inline-block" aria-label="mie — Αρχική">
        <img src="/logo.png" alt="" aria-hidden="true" class="logo-light mx-auto h-14 w-auto md:h-[68px]" />
        <img src="/logo-dark.png" alt="" aria-hidden="true" class="logo-dark mx-auto h-14 w-auto md:h-[68px]" />
      </RouterLink>
    </div>

    <!-- Tier 3: desktop nav -->
    <nav class="hidden border-y border-line md:block">
      <ul class="mx-auto flex max-w-6xl items-center justify-center gap-12 px-6 py-3.5">
        <li v-for="l in props.links" :key="l.to">
          <RouterLink
            :to="l.to"
            exact-active-class="text-ink after:scale-x-100"
            class="label relative pb-1 text-ink-soft transition-colors hover:text-ink after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-center after:scale-x-0 after:bg-ink after:transition-transform after:duration-300 hover:after:scale-x-100"
          >
            {{ l.label }}
          </RouterLink>
        </li>
      </ul>
    </nav>
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
          exact-active-class="text-ink"
          class="flex flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 text-ink-soft transition-colors"
        >
          <component :is="l.icon" :size="21" :stroke-width="1.6" />
          <span class="label text-[9px]">{{ l.label }}</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
