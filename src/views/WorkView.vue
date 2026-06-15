<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { X, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { site } from '@/config/site'
import { usePageSeo } from '@/composables/useSeo'
import { works, collections } from '@/config/content'

usePageSeo({
  title: `Έργα — ${site.name}`,
  description: `Τα έργα της Μαρίνας Δούκα — sketches, creative items και pure art.`,
})

const route = useRoute()
const router = useRouter()

const categories = ['Όλα', ...collections.map((c) => c.category)]

function getCategoryFromRoute() {
  const c = Array.isArray(route.query.c) ? route.query.c[0] : route.query.c

  return c && categories.includes(c)
      ? c
      : 'Όλα'
}

const active = ref(getCategoryFromRoute())

watch(
    () => route.query.c,
    () => {
      active.value = getCategoryFromRoute()
    }
)

function setCategory(cat) {
  active.value = cat

  router.replace({
    path: '/works',
    query: cat === 'Όλα' ? {} : { c: cat },
  })
}

const filtered = computed(() =>
  active.value === 'Όλα' ? works : works.filter((w) => w.category === active.value)
)

// --- Lightbox ---
const idx = ref(-1)
const open = computed(() => idx.value >= 0)
const cur = computed(() => filtered.value[idx.value] || {})
function show(i) { idx.value = i; document.body.style.overflow = 'hidden' }
function close() { idx.value = -1; document.body.style.overflow = '' }
function next() { idx.value = (idx.value + 1) % filtered.value.length }
function prev() { idx.value = (idx.value - 1 + filtered.value.length) % filtered.value.length }

function onKey(e) {
  if (!open.value) return
  if (e.key === 'Escape') close()
  if (e.key === 'ArrowRight') next()
  if (e.key === 'ArrowLeft') prev()
}
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})

let touchX = 0
function onTouchStart(e) { touchX = e.touches[0].clientX }
function onTouchEnd(e) {
  const dx = e.changedTouches[0].clientX - touchX
  if (Math.abs(dx) > 50) (dx < 0 ? next() : prev())
}
</script>

<template>
  <div>
    <section class="mx-auto max-w-6xl px-6 pt-14 pb-24 md:pt-16">
      <!-- Header -->
      <div class="text-center">
        <p class="eyebrow text-xl md:text-2xl">Το χαρτοφυλάκιο</p>
        <h1 class="mt-1 text-2xl md:text-4xl">Έργα</h1>
      </div>

      <!-- Filters (υπο-tabs) -->
      <div class="mt-10 flex flex-wrap justify-center gap-x-7 gap-y-3">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="setCategory(cat)"
          class="label pb-1 transition-colors"
          :class="active === cat
            ? 'border-b border-ink text-ink'
            : 'border-b border-transparent text-ink-soft hover:text-ink'"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Grid -->
      <div class="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3">
        <button
          v-for="(w, i) in filtered"
          :key="w.image"
          v-reveal="i % 3"
          @click="show(i)"
          class="group text-left"
        >
          <div class="overflow-hidden bg-bg-soft">
            <img :src="w.image" :alt="w.title || w.category"
                 class="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                 loading="lazy" />
          </div>
          <div v-if="w.title || active === 'Όλα'" class="mt-3">
            <h3 v-if="w.title" class="text-xl">{{ w.title }}</h3>
            <p class="label text-[11px] text-ink-soft" :class="w.title && 'mt-1'">{{ w.category }}</p>
          </div>
        </button>
      </div>

      <p v-if="!filtered.length" class="mt-16 text-center text-ink-soft">
        Δεν υπάρχουν έργα σε αυτή την κατηγορία ακόμη.
      </p>
    </section>

    <!-- Lightbox -->
    <Transition name="lb">
      <div
        v-if="open"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4"
        @click.self="close"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
      >
        <button @click="close" aria-label="Κλείσιμο"
          class="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">
          <X :size="22" />
        </button>

        <button v-if="filtered.length > 1" @click="prev" aria-label="Προηγούμενο"
          class="absolute left-2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:left-6">
          <ChevronLeft :size="26" />
        </button>

        <figure class="max-h-full max-w-4xl text-center">
          <img :src="cur.image" :alt="cur.title || cur.category"
               class="mx-auto max-h-[78vh] w-auto object-contain" />
          <figcaption class="mt-4 text-white">
            <p v-if="cur.title" class="font-display text-2xl">{{ cur.title }}</p>
            <p class="label mt-1 text-xs text-white/70">
              {{ cur.category }} · {{ idx + 1 }} / {{ filtered.length }}
            </p>
          </figcaption>
        </figure>

        <button v-if="filtered.length > 1" @click="next" aria-label="Επόμενο"
          class="absolute right-2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-6">
          <ChevronRight :size="26" />
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.lb-enter-active, .lb-leave-active { transition: opacity .3s ease; }
.lb-enter-from, .lb-leave-to { opacity: 0; }
</style>
