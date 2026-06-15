<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps({
  slides: { type: Array, default: () => [] },
  interval: { type: Number, default: 3000 },
})

const index = ref(0)
const paused = ref(false)
let timer = null

const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function go(i) {
  index.value = (i + props.slides.length) % props.slides.length
}
function next() { go(index.value + 1) }
function prev() { go(index.value - 1) }

function start() {
  if (reduced || props.slides.length < 2) return
  stop()
  timer = setInterval(() => { if (!paused.value) next() }, props.interval)
}
function stop() { if (timer) clearInterval(timer) }

onMounted(start)
onUnmounted(stop)

const current = computed(() => props.slides[index.value])
</script>

<template>
  <section
    class="relative w-full overflow-hidden"
    @mouseenter="paused = true"
    @mouseleave="paused = false"
    aria-roledescription="carousel"
  >
    <!-- Slides -->
    <div class="relative h-[68vh] min-h-[440px] md:h-[78vh]">
      <transition-group name="blur-fade">
        <div
          v-for="(s, i) in slides"
          v-show="i === index"
          :key="i"
          class="absolute inset-0"
        >
          <img
            :src="s.image"
            :alt="s.title"
            class="h-full w-full object-cover"
            :loading="i === 0 ? 'eager' : 'lazy'"
            :fetchpriority="i === 0 ? 'high' : 'auto'"
          />
          <div class="absolute inset-0 hero-scrim"></div>
        </div>
      </transition-group>

      <!-- Caption -->
      <div class="absolute inset-0 flex items-end md:items-center">
        <div class="mx-auto w-full max-w-6xl px-6 pb-16 md:pb-0">
          <transition name="rise" mode="out-in">
            <div :key="index" class="max-w-xl text-white">
              <p v-if="current.eyebrow" class="label text-white/80">{{ current.eyebrow }}</p>
              <h1 class="mt-3 text-3xl font-medium md:text-5xl">{{ current.title }}</h1>
              <p v-if="current.text" class="mt-4 max-w-md text-base text-white/85 md:text-lg">
                {{ current.text }}
              </p>
              <RouterLink
                v-if="current.cta"
                :to="current.cta.to"
                class="link-cta label mt-7 inline-block text-white"
              >
                {{ current.cta.label }}
              </RouterLink>
            </div>
          </transition>
        </div>
      </div>

      <!-- Arrows (desktop) -->
      <button
        v-if="slides.length > 1"
        @click="prev"
        aria-label="Προηγούμενο"
        class="absolute left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-white/90 backdrop-blur-sm transition-colors hover:bg-white/15 md:flex"
      >
        <ChevronLeft :size="22" />
      </button>
      <button
        v-if="slides.length > 1"
        @click="next"
        aria-label="Επόμενο"
        class="absolute right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-white/90 backdrop-blur-sm transition-colors hover:bg-white/15 md:flex"
      >
        <ChevronRight :size="22" />
      </button>
    </div>

    <!-- Dots -->
    <div v-if="slides.length > 1" class="absolute inset-x-0 bottom-5 flex justify-center gap-2.5">
      <button
        v-for="(s, i) in slides"
        :key="i"
        @click="go(i)"
        :aria-label="`Slide ${i + 1}`"
        :aria-current="i === index"
        class="h-1.5 rounded-full transition-all duration-300"
        :class="i === index ? 'w-7 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'"
      />
    </div>
  </section>
</template>

<style scoped>
.hero-scrim {
  background: linear-gradient(
    90deg,
    rgba(20, 19, 16, 0.62) 0%,
    rgba(20, 19, 16, 0.32) 45%,
    rgba(20, 19, 16, 0.12) 100%
  );
}
@media (max-width: 767px) {
  .hero-scrim {
    background: linear-gradient(
      0deg,
      rgba(20, 19, 16, 0.72) 0%,
      rgba(20, 19, 16, 0.25) 55%,
      rgba(20, 19, 16, 0.1) 100%
    );
  }
}

.blur-fade-enter-active,
.blur-fade-leave-active {
  transition:
      opacity 2s ease,
      filter 2s ease,
      transform 2.4s ease;
}

.blur-fade-enter-from {
  opacity: 0;
  filter: blur(8px);
  transform: scale(1.035);
}

.blur-fade-leave-to {
  opacity: 0;
  filter: blur(4px);
  transform: scale(1);
}

@media (prefers-reduced-motion: reduce) {
  .fade-enter-active, .fade-leave-active,
  .rise-enter-active, .rise-leave-active { transition: none; }
}
</style>
