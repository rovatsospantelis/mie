<script setup>
import { wordmark } from '@/config/content'
</script>

<template>
  <section class="bw" :aria-label="wordmark.text" v-reveal>
    <div class="bw-word">
      <span
          v-for="(l, i) in wordmark.letters"
          :key="i"
          class="bw-letter"
          :style="{ backgroundImage: `url(${l.image})`, backgroundPosition: l.position || 'center' }"
      >{{ l.char }}</span>
    </div>
  </section>
</template>

<style scoped>
.bw {
  display: flex;
  justify-content: center;
  padding: 3.5rem 1rem 0;
  overflow: hidden;
}
.bw-word {
  display: flex;
  justify-content: center;
  font-family: 'Baloo 2', sans-serif;
  font-weight: 800;
  line-height: 0.78;
  letter-spacing: -0.04em;
  font-size: clamp(110px, 30vw, 320px);
  user-select: none;
}
.bw-letter {
  background-size: cover;
  background-repeat: no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}
</style>
