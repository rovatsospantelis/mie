<script setup>
import { RouterLink } from 'vue-router'
import HeroCarousel from '@/components/HeroCarousel.vue'
import { usePageSeo } from '@/composables/useSeo'
import { useLang } from '@/composables/useLang'
import { heroSlides, feature, works, editorial } from '@/config/content'
import WorksMosaic from '@/components/WorksMosaic.vue'
import CollectionBand from '@/components/CollectionBand.vue'

usePageSeo('home')
const { t, tr } = useLang()

const pick = (cat, n) => works.filter((w) => w.category === cat).slice(0, n)
const featuredWorks = [...pick('Pure art', 2), ...pick('Items', 2), ...pick('Sketches', 2)]
</script>

<template>
  <div>
    <!-- HERO CAROUSEL -->
    <HeroCarousel :slides="heroSlides" />

    <!-- FEATURE BANNER -->
    <section class="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div class="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div v-reveal class="order-2 md:order-1">
          <p class="label text-accent">{{ tr(feature.eyebrow) }}</p>
          <h2 class="mt-4 text-2xl md:text-4xl">{{ tr(feature.title) }}</h2>
          <p class="mt-5 max-w-md leading-relaxed text-ink-soft">{{ tr(feature.text) }}</p>
          <RouterLink :to="feature.cta.to" class="link-cta label mt-7 inline-block">
            {{ tr(feature.cta.label) }}
          </RouterLink>
        </div>
        <div v-reveal="1" class="order-1 overflow-hidden md:order-2">
          <img :src="feature.image" :alt="tr(feature.title)"
               class="aspect-[4/3] w-full object-cover" loading="lazy" />
        </div>
      </div>
    </section>

    <!-- ΣΥΛΛΟΓΕΣ -->
    <section class="border-y border-line bg-bg-soft">
      <div class="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div class="flex items-end justify-between">
          <div>
            <p class="eyebrow text-xl md:text-2xl">{{ t('home.collectionsEyebrow') }}</p>
            <h2 class="mt-1 text-3xl md:text-4xl">{{ t('home.collectionsTitle') }}</h2>
          </div>
          <RouterLink to="/works" class="label hidden text-ink-soft transition-colors hover:text-ink sm:inline-block">
            {{ t('home.allWorks') }}
          </RouterLink>
        </div>

        <div class="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3 md:gap-6">
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
              <p class="label text-white/80">{{ tr(e.label) }}</p>
              <h3 class="mt-1 text-3xl">{{ e.title }}</h3>
              <span class="link-cta label mt-3 inline-block w-fit">{{ t('common.see') }}</span>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ΕΠΙΛΕΓΜΕΝΑ ΕΡΓΑ -->
    <section class="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div class="text-center" style="margin-bottom: 20px">
        <p class="eyebrow text-xl md:text-2xl">{{ t('home.mosaicEyebrow') }}</p>
        <h2 class="mt-1 text-3xl md:text-4xl">{{ t('home.mosaicTitle') }}</h2>
      </div>

      <WorksMosaic />
    </section>

    <section class="border-y border-line bg-bg-soft">
      <div class="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div class="flex items-end justify-between">
          <CollectionBand />
        </div>
      </div>
    </section>

    <!-- CTA BAND -->
    <section class="cta-band relative overflow-hidden">
      <img src="/logos/m-blue.png" alt="" aria-hidden="true"
           class="pointer-events-none absolute -right-8 -bottom-16 w-2/5 max-w-md select-none opacity-20 md:opacity-25" />
      <div class="relative z-10 mx-auto max-w-3xl px-6 py-20 text-center">
        <p class="label text-white/70">{{ t('home.ctaEyebrow') }}</p>
        <h2 class="mt-4 text-3xl text-white md:text-4xl">{{ t('home.ctaTitle') }}</h2>
        <p class="mt-4 text-white/75">{{ t('home.ctaText') }}</p>
        <RouterLink to="/contact" class="btn mt-8" style="background:#fff;color:var(--color-accent-deep)">
          {{ t('nav.contact') }}
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.cta-band { background: var(--color-accent-deep); }
:global(html.dark) .cta-band { background: #11211d; }
</style>
