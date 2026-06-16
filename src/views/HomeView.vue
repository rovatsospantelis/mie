<script setup>
import { RouterLink } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'
import HeroCarousel from '@/components/HeroCarousel.vue'
import { site } from '@/config/site'
import { usePageSeo } from '@/composables/useSeo'
import { heroSlides, feature, collections, works, editorial } from '@/config/content'
import WorksMosaic from '@/components/WorksMosaic.vue'

usePageSeo({
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
})

const pick = (cat, n) => works.filter((w) => w.category === cat).slice(0, n)
const featuredWorks = [...pick('Pure art', 2), ...pick('Creative items', 2), ...pick('Sketches', 2)]
</script>

<template>
  <div>
    <!-- HERO CAROUSEL -->
    <HeroCarousel :slides="heroSlides" />

    <!-- FEATURE BANNER -->
    <section class="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div class="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div v-reveal class="order-2 md:order-1">
          <p class="label text-accent">{{ feature.eyebrow }}</p>
          <h2 class="mt-4 text-2xl md:text-4xl">{{ feature.title }}</h2>
          <p class="mt-5 max-w-md leading-relaxed text-ink-soft">{{ feature.text }}</p>
          <RouterLink :to="feature.cta.to" class="link-cta label mt-7 inline-block">
            {{ feature.cta.label }}
          </RouterLink>
        </div>
        <div v-reveal="1" class="order-1 overflow-hidden md:order-2">
          <img :src="feature.image" :alt="feature.title"
               class="aspect-[4/3] w-full object-cover" loading="lazy" />
        </div>
      </div>
    </section>

    <!-- ΣΥΛΛΟΓΕΣ -->
    <section class="border-y border-line bg-bg-soft">
      <div class="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div class="flex items-end justify-between">
          <div>
            <p class="eyebrow text-xl md:text-2xl">Δείτε ανά</p>
            <h2 class="mt-1 text-3xl md:text-4xl">Συλλογές</h2>
          </div>
          <RouterLink to="/works" class="label hidden text-ink-soft transition-colors hover:text-ink sm:inline-block">
            Όλα τα έργα →
          </RouterLink>
        </div>

        <div class="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3 md:gap-6">
          <RouterLink
            v-for="(col, i) in collections"
            :key="col.title"
            :to="{ path: '/works', query: { c: col.category } }"
            v-reveal="i"
            class="group block"
          >
            <div class="overflow-hidden">
              <img :src="col.image" :alt="col.title"
                   class="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                   loading="lazy" />
            </div>
            <p class="label mt-3 text-ink transition-colors group-hover:text-accent">
              {{ col.title }}
            </p>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ΕΠΙΛΕΓΜΕΝΑ ΕΡΓΑ -->
    <section class="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div class="text-center" style="margin-bottom: 20px">
        <p class="eyebrow text-xl md:text-2xl">Random</p>
        <h2 class="mt-1 text-3xl md:text-4xl">Μωσαϊκό έργων</h2>
      </div>

      <WorksMosaic />
    </section>

    <!-- EDITORIAL 3-UP -->
    <section class="border-t border-line">
      <div class="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div class="grid gap-6 md:grid-cols-3">
          <RouterLink
            v-for="(e, i) in editorial"
            :key="e.title"
            :to="e.to"
            v-reveal="i"
            class="group relative block overflow-hidden"
          >
            <img :src="e.image" :alt="e.title"
                 class="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                 loading="lazy" />
            <div class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/65 via-black/10 to-transparent p-7 text-white">
              <p class="label text-white/80">{{ e.label }}</p>
              <h3 class="mt-1 text-3xl">{{ e.title }}</h3>
              <span class="link-cta label mt-3 inline-block w-fit">Δείτε →</span>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- CTA BAND -->
    <section class="cta-band relative overflow-hidden">
      <img src="/logos/m-blue.png" alt="" aria-hidden="true"
           class="pointer-events-none absolute -right-8 -bottom-16 w-2/5 max-w-md select-none opacity-20 md:opacity-25" />
      <div class="relative z-10 mx-auto max-w-3xl px-6 py-20 text-center">
        <p class="label text-white/70">Ας συνεργαστούμε</p>
        <h2 class="mt-4 text-3xl text-white md:text-4xl">Έχετε ένα έργο στο μυαλό σας;</h2>
        <p class="mt-4 text-white/75">Παραγγελίες, συνεργασίες και custom αντικείμενα — ας τα πούμε.</p>
        <RouterLink to="/contact" class="btn mt-8" style="background:#fff;color:var(--color-accent-deep)">
          Επικοινωνία
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.cta-band { background: var(--color-accent-deep); }
:global(html.dark) .cta-band { background: #11211d; }
</style>
