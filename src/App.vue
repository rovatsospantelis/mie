<script setup>
import { Home, LayoutGrid, User, Mail } from 'lucide-vue-next'
import TheNavbar from '@/components/TheNavbar.vue'
import TheFooter from '@/components/TheFooter.vue'
import WhatsAppButton from '@/components/WhatsAppButton.vue'
import { site } from '@/config/site'
import { useStructuredData } from '@/composables/useSeo'

// JSON-LD μία φορά για όλο το site
useStructuredData()

const navLinks = [
  { to: '/', label: 'Αρχική', icon: Home },
  { to: '/works', label: 'Έργα', icon: LayoutGrid },
  { to: '/about', label: 'Σχετικά', icon: User },
  { to: '/contact', label: 'Επαφή', icon: Mail },
]
</script>

<template>
  <TheNavbar :links="navLinks" />

  <main class="pb-16 md:pb-0">
    <RouterView v-slot="{ Component, route }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </main>

  <TheFooter />

  <WhatsAppButton v-if="site.features.whatsappButton" />

  <!-- Landscape notice (mobile) -->
  <div class="rotate-notice fixed inset-0 z-[100] hidden flex-col items-center justify-center gap-4 bg-bg px-8 text-center">
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" class="text-accent">
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 19h2" stroke-linecap="round" />
    </svg>
    <p class="font-display text-2xl italic">Γύρισε τη συσκευή σου</p>
    <p class="max-w-xs text-ink-soft">Καλύτερη εμπειρία σε κατακόρυφη προβολή 📱</p>
  </div>
</template>

<style>
@media (max-width: 1023px) and (orientation: landscape) {
  .rotate-notice { display: flex; }
}
</style>
