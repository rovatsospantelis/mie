<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { X, ChevronLeft, ChevronRight } from 'lucide-vue-next'

/**
 * Gallery — portfolio grid με lightbox.
 *
 * Χρήση:
 *   <Gallery :images="[{ src:'/work-1.jpg', alt:'Έργο 1', caption:'…' }, …]" />
 */
const props = defineProps({
  images: { type: Array, default: () => [] },
  columns: { type: Number, default: 3 },
})

const activeIndex = ref(-1) // -1 = κλειστό
const isOpen = ref(false)

function open(i) {
  activeIndex.value = i
  isOpen.value = true
  document.body.style.overflow = 'hidden'
}
function close() {
  isOpen.value = false
  document.body.style.overflow = ''
}
function next() {
  activeIndex.value = (activeIndex.value + 1) % props.images.length
}
function prev() {
  activeIndex.value = (activeIndex.value - 1 + props.images.length) % props.images.length
}

function onKey(e) {
  if (!isOpen.value) return
  if (e.key === 'Escape') close()
  if (e.key === 'ArrowRight') next()
  if (e.key === 'ArrowLeft') prev()
}
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})

// Swipe (mobile)
let touchX = 0
function onTouchStart(e) { touchX = e.touches[0].clientX }
function onTouchEnd(e) {
  const dx = e.changedTouches[0].clientX - touchX
  if (Math.abs(dx) > 50) (dx < 0 ? next() : prev())
}

const gridCols = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
}
</script>

<template>
  <div>
    <!-- Grid -->
    <div class="grid grid-cols-1 gap-4" :class="gridCols[columns]">
      <button
        v-for="(img, i) in images"
        :key="i"
        v-reveal="i"
        @click="open(i)"
        class="group relative aspect-square overflow-hidden rounded-2xl bg-bg-soft"
      >
        <img
          :src="img.src"
          :alt="img.alt || ''"
          loading="lazy"
          class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span class="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10"></span>
      </button>
    </div>

    <!-- Lightbox -->
    <Transition name="lb">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
        @click.self="close"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
      >
        <button @click="close" aria-label="Κλείσιμο"
          class="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">
          <X :size="22" />
        </button>

        <button v-if="images.length > 1" @click="prev" aria-label="Προηγούμενο"
          class="absolute left-2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:left-6">
          <ChevronLeft :size="26" />
        </button>

        <figure class="max-h-full max-w-4xl">
          <img :src="images[activeIndex].src" :alt="images[activeIndex].alt || ''"
            class="max-h-[80vh] w-auto rounded-lg object-contain" />
          <figcaption v-if="images[activeIndex].caption"
            class="mt-3 text-center text-sm text-white/70">
            {{ images[activeIndex].caption }}
          </figcaption>
        </figure>

        <button v-if="images.length > 1" @click="next" aria-label="Επόμενο"
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
