<script setup>
import { Instagram, Facebook } from 'lucide-vue-next'
import { site } from '@/config/site'

const year = new Date().getFullYear()
const c = site.contact
const s = site.social

// Ωράριο σε αναγνώσιμη μορφή για το footer
const dayNames = ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο']
function fmt(mins) {
  const h = Math.floor(mins / 60)
  const m = String(mins % 60).padStart(2, '0')
  return `${h}:${m}`
}
function dayLine(d) {
  const h = site.hours[d]
  return h ? `${fmt(h.open)}–${fmt(h.close)}` : 'Κλειστά'
}
</script>

<template>
  <footer class="site-footer">
    <div
      class="mx-auto grid max-w-6xl gap-10 px-6 py-14 text-center md:grid-cols-4 md:text-left"
    >
      <!-- Brand -->
      <div>
        <img src="/logo-dark.png" alt="mie" class="mx-auto h-20 w-auto md:mx-0" />
        <p class="mt-4 font-display text-lg italic opacity-80">{{ site.tagline }}</p>
      </div>

      <!-- Contact -->
      <div class="text-sm">
        <p class="label">Επικοινωνία</p>
        <div class="mt-3 space-y-1.5 opacity-80">
          <p v-if="c.address.street">{{ c.address.street }}, {{ c.address.area }}</p>
          <p v-if="c.phone"><a :href="'tel:' + c.phoneRaw" class="hover:opacity-100">{{ c.phone }}</a></p>
          <p v-if="c.mobile"><a :href="'tel:' + c.mobileRaw" class="hover:opacity-100">{{ c.mobile }}</a></p>
          <p v-if="c.email"><a :href="'mailto:' + c.email" class="hover:opacity-100">{{ c.email }}</a></p>
        </div>
      </div>

      <!-- Hours -->
      <div v-if="site.features.openStatus" class="text-sm">
        <p class="font-medium">Ωράριο</p>
        <div class="mt-3 space-y-1.5 opacity-80">
          <p>Δευ–Παρ: {{ dayLine(1) }}</p>
          <p>Σάββατο: {{ dayLine(6) }}</p>
          <p>Κυριακή: {{ dayLine(0) }}</p>
        </div>
      </div>

      <!-- Social -->
      <div v-if="s.instagram || s.tiktok || s.facebook" class="text-sm">
        <p class="label">Ακολουθήστε μας</p>
        <div class="mt-3 flex justify-center gap-3 md:justify-start">
          <a v-if="s.instagram" :href="s.instagram" target="_blank" rel="noopener" aria-label="Instagram"
             class="social-icon flex h-11 w-11 items-center justify-center rounded-full border">
            <Instagram :size="20" :stroke-width="1.8" />
          </a>
          <a v-if="s.tiktok" :href="s.tiktok" target="_blank" rel="noopener" aria-label="TikTok"
             class="social-icon flex h-11 w-11 items-center justify-center rounded-full border">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M16.5 3c.3 2.1 1.6 3.7 3.7 4v2.6c-1.3.1-2.6-.3-3.7-1v5.9c0 3.2-2.4 5.5-5.5 5.5S5.5 17.7 5.5 14.5 7.9 9 11 9c.3 0 .6 0 .9.1v2.7c-.3-.1-.6-.2-.9-.2-1.6 0-2.8 1.2-2.8 2.8s1.2 2.9 2.8 2.9 2.8-1.2 2.8-2.9V3h2.7z" />
            </svg>
          </a>
          <a v-if="s.facebook" :href="s.facebook" target="_blank" rel="noopener" aria-label="Facebook"
             class="social-icon flex h-11 w-11 items-center justify-center rounded-full border">
            <Facebook :size="20" :stroke-width="1.8" />
          </a>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="border-t" style="border-color: rgba(255,255,255,0.08)">
      <div class="mx-auto max-w-6xl px-6 pt-5 pb-28 text-center text-xs opacity-60 md:pb-5">
        <p>© {{ year }} {{ site.name }}</p>
        <p class="mt-1">
          Powered by
          <a :href="'mailto:' + site.credit.email" class="font-medium hover:opacity-100">
            {{ site.credit.name }}
          </a>
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: #1a1a1a;
  color: rgba(255, 255, 255, 0.85);
}
:global(html.dark) .site-footer {
  background: #0d0d0d;
}
.social-icon {
  border-color: rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.9);
  transition: all .25s ease;
}
.social-icon:hover {
  border-color: var(--color-accent);
  background: var(--color-accent);
  color: var(--color-bg);
}
</style>
