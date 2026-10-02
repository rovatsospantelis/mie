<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import {
  Home,
  LayoutGrid,
  User,
  Mail,
  Menu,
  X,
  ChevronDown,
} from 'lucide-vue-next'

import ThemeToggle from '@/components/ThemeToggle.vue'
import LangToggle from '@/components/LangToggle.vue'
import { site } from '@/config/site'
import { useLang } from '@/composables/useLang'

const { t } = useLang()

const props = defineProps({
  // label = κλειδί του src/i18n/ui.js
  links: {
    type: Array,
    default: () => [
      { to: '/', label: 'nav.home', icon: Home },
      { to: '/works', label: 'nav.works', icon: LayoutGrid },
      { to: '/about', label: 'nav.about', icon: User },
      { to: '/contact', label: 'nav.contactShort', icon: Mail },
    ],
  },
})

const route = useRoute()

const drawerOpen = ref(false)
const worksOpen = ref(true)

const workLinks = [
  {
    to: '/works',
    label: 'nav.allWorks'
  },
  {
    to: { path: '/works', query: { c: 'Sketches' } },
    label: 'Sketches'
  },
  {
    to: { path: '/works', query: { c: 'Items' } },
    label: 'Items'
  },
  {
    to: { path: '/works', query: { c: 'Pure art' } },
    label: 'Pure Art'
  },
]

const openDrawer = () => {
  drawerOpen.value = true
}

const closeDrawer = () => {
  drawerOpen.value = false
}

watch(
    () => route.fullPath,
    () => closeDrawer()
)

watch(drawerOpen, (isOpen) => {
  document.documentElement.style.overflow = isOpen ? 'hidden' : ''
})

onBeforeUnmount(() => {
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-6">
      <!-- Logo -->
      <RouterLink to="/" class="inline-block shrink-0" :aria-label="t('nav.homeAria')">
        <img src="/logo.png" alt="" aria-hidden="true" class="logo-light h-10 w-auto md:h-12" />
        <img src="/logo-dark.png" alt="" aria-hidden="true" class="logo-dark h-10 w-auto md:h-12" />
      </RouterLink>

      <!-- Desktop nav -->
      <nav class="hidden md:block">
        <ul class="flex items-center gap-10">
          <li v-for="l in props.links" :key="l.to">
            <RouterLink
                :to="l.to"
                exact-active-class="text-ink after:scale-x-100"
                class="label relative pb-1 text-ink-soft transition-colors hover:text-ink after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-center after:scale-x-0 after:bg-ink after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {{ t(l.label) }}
            </RouterLink>
          </li>

          <li class="flex items-center gap-2">
            <LangToggle />
            <ThemeToggle v-if="site.features.darkMode" />
          </li>
        </ul>
      </nav>

      <!-- Mobile actions -->
      <div class="flex items-center gap-2 md:hidden">
        <LangToggle />
        <ThemeToggle v-if="site.features.darkMode" />

        <button
            type="button"
            class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-sm transition hover:bg-accent/10"
            :aria-label="t('nav.openMenu')"
            @click="openDrawer"
        >
          <Menu :size="22" :stroke-width="1.8" />
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile drawer backdrop -->
  <Transition name="drawer-fade">
    <button
        v-if="drawerOpen"
        type="button"
        class="fixed inset-0 z-[60] bg-ink/35 backdrop-blur-[2px] md:hidden"
        :aria-label="t('nav.closeMenu')"
        @click="closeDrawer"
    />
  </Transition>

  <!-- Mobile drawer -->
  <Transition name="drawer-slide">
    <aside
        v-if="drawerOpen"
        class="fixed inset-y-0 right-0 z-[70] flex w-[84vw] max-w-[360px] flex-col border-l border-line bg-bg shadow-2xl md:hidden"
        aria-label="Mobile menu"
    >
      <div class="flex items-center justify-between border-b border-line px-6 py-5">
        <RouterLink to="/" :aria-label="t('nav.homeAria')" @click="closeDrawer">
          <img src="/logo.png" alt="" aria-hidden="true" class="logo-light h-10 w-auto" />
          <img src="/logo-dark.png" alt="" aria-hidden="true" class="logo-dark h-10 w-auto" />
        </RouterLink>

        <button
            type="button"
            class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink transition hover:bg-accent/10"
            :aria-label="t('nav.closeMenu')"
            @click="closeDrawer"
        >
          <X :size="22" :stroke-width="1.8" />
        </button>
      </div>

      <nav class="flex-1 overflow-y-auto px-6 py-6">
        <ul class="space-y-2">
          <li>
            <RouterLink
                to="/"
                exact-active-class="bg-accent/10 text-accent"
                class="flex items-center gap-4 rounded-2xl px-4 py-3 text-ink-soft transition hover:bg-surface hover:text-ink"
            >
              <Home :size="21" :stroke-width="1.6" />
              <span class="label text-sm">{{ t('nav.home') }}</span>
            </RouterLink>
          </li>

          <li>
            <button
                type="button"
                class="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-ink-soft transition hover:bg-surface hover:text-ink"
                :class="{ 'bg-accent/10 text-accent': route.path === '/works' }"
                @click="worksOpen = !worksOpen"
            >
              <span class="flex items-center gap-4">
                <LayoutGrid :size="21" :stroke-width="1.6" />
                <span class="label text-sm">{{ t('nav.works') }}</span>
              </span>

              <ChevronDown
                  :size="18"
                  :stroke-width="1.7"
                  class="transition-transform duration-300"
                  :class="{ 'rotate-180': worksOpen }"
              />
            </button>

            <Transition name="drawer-sub">
              <ul v-if="worksOpen" class="ml-10 mt-2 space-y-1 border-l border-line pl-4">
                <li v-for="item in workLinks" :key="item.label">
                  <RouterLink
                      :to="item.to"
                      class="block rounded-xl px-3 py-2 text-sm text-ink-soft transition hover:bg-surface hover:text-ink"
                  >
                    {{ t(item.label) }}
                  </RouterLink>
                </li>
              </ul>
            </Transition>
          </li>

          <li>
            <RouterLink
                to="/about"
                exact-active-class="bg-accent/10 text-accent"
                class="flex items-center gap-4 rounded-2xl px-4 py-3 text-ink-soft transition hover:bg-surface hover:text-ink"
            >
              <User :size="21" :stroke-width="1.6" />
              <span class="label text-sm">{{ t('nav.about') }}</span>
            </RouterLink>
          </li>

          <li>
            <RouterLink
                to="/contact"
                exact-active-class="bg-accent/10 text-accent"
                class="flex items-center gap-4 rounded-2xl px-4 py-3 text-ink-soft transition hover:bg-surface hover:text-ink"
            >
              <Mail :size="21" :stroke-width="1.6" />
              <span class="label text-sm">{{ t('nav.contactShort') }}</span>
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div class="border-t border-line px-6 py-5">
        <p class="label text-xs uppercase tracking-[0.24em] text-accent">
          mie
        </p>
        <p class="mt-2 text-sm text-ink-soft">
          {{ t('nav.drawerNote') }}
        </p>
      </div>
    </aside>
  </Transition>
</template>

<style scoped>
.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition: opacity 0.25s ease;
}

.drawer-fade-enter-from,
.drawer-fade-leave-to {
  opacity: 0;
}

.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: transform 0.32s ease;
}

.drawer-slide-enter-from,
.drawer-slide-leave-to {
  transform: translateX(100%);
}

.drawer-sub-enter-active,
.drawer-sub-leave-active {
  transition: all 0.2s ease;
  overflow: hidden;
}

.drawer-sub-enter-from,
.drawer-sub-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>