<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { works } from '@/config/content'

/**
 * WorksMosaic — alternating grid (κείμενο + φωτο), edge-to-edge.
 * Τα image cells γεμίζουν με ΤΥΧΑΙΑ έργα από τις δοσμένες κατηγορίες.
 * Τοποθέτησέ το ως full-width section (π.χ. χαμηλά στην αρχική).
 */
const props = defineProps({
  // από ποιες κατηγορίες τραβάμε τυχαία έργα
  categories: { type: Array, default: () => ['Pure art', 'Sketches'] },
})

// Πρότυπο διάταξης. type: 'text' | 'image'. Τα 'image' γεμίζουν τυχαία.
// tint: a (cream) · b (coral απαλό) · c (coral solid)
const pattern = [
  { type: 'text', tint: 'a', label: 'Pure art', text: 'Αφηρημένες συνθέσεις σε χρώμα και υφή.', to: { path: '/works', query: { c: 'Pure art' } } },
  { type: 'image' },
  { type: 'image' },
  { type: 'text', tint: 'b', label: 'Sketches', text: 'Έργα σε χαρτί — γραμμή, φόρμα και χρώμα.', to: { path: '/works', query: { c: 'Sketches' } } },
  { type: 'image' },
  { type: 'text', tint: 'c', label: 'Δείτε όλα τα έργα', text: 'Pure art, sketches & creative items.', to: '/works' },
  { type: 'image' },
  { type: 'image' },
]

const cells = ref([])

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

onMounted(() => {
  const pool = shuffle(works.filter((w) => props.categories.includes(w.category)))
  let pi = 0
  cells.value = pattern.map((c) => {
    if (c.type !== 'image') return c
    const work = pool.length ? pool[pi++ % pool.length] : null
    return { type: 'image', work, to: work ? { path: '/works', query: { c: work.category } } : '/works' }
  })
})
</script>

<template>
  <section class="grid grid-cols-2 md:grid-cols-4">
    <RouterLink
        v-for="(cell, i) in cells"
        :key="i"
        :to="cell.to"
        class="mosaic-cell group"
    >
      <!-- IMAGE CELL -->
      <template v-if="cell.type === 'image' && cell.work">
        <img
            :src="cell.work.image"
            :alt="cell.work.category"
            class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
        />
        <span class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent p-4">
          <span class="label text-[10px] text-white/90">{{ cell.work.category }}</span>
        </span>
      </template>

      <!-- TEXT CELL -->
      <div
          v-else
          class="flex h-full flex-col items-center justify-center px-6 py-10 text-center"
          :class="{
          'bg-bg-soft text-ink': cell.tint === 'a',
          'bg-accent/10 text-ink': cell.tint === 'b',
          'bg-accent text-white': cell.tint === 'c',
        }"
      >
        <h3 class="font-display text-2xl md:text-3xl">{{ cell.label }}</h3>
        <p class="mt-3 max-w-[22ch] text-sm leading-relaxed"
           :class="cell.tint === 'c' ? 'text-white/85' : 'text-ink-soft'">
          {{ cell.text }}
        </p>
        <span class="label mt-5 inline-block text-[11px]"
              :class="cell.tint === 'c' ? 'text-white' : 'text-accent-deep'">
          Δείτε →
        </span>
      </div>
    </RouterLink>
  </section>
</template>

<style scoped>
.mosaic-cell {
  position: relative;
  display: block;
  overflow: hidden;
  aspect-ratio: 4 / 5;
}
</style>
