<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { works } from '@/config/content'

/**
 * CollectionBand — split band (χρωματιστό panel + φωτο), full-width.
 * Default: pure art. Η φωτο επιλέγεται τυχαία από την κατηγορία (ή δώσε :image).
 * Τοποθέτησέ το χαμηλά, πριν το CTA.
 */
const props = defineProps({
  eyebrow: { type: String, default: 'Pure art' },
  heading: { type: String, default: 'Πρωτότυπα\nέργα τέχνης' },
  text: {
    type: String,
    default:
        'Αφηρημένες συνθέσεις σε χρώμα και υφή — κάθε πίνακας ζωγραφισμένος στο χέρι, ένα και μοναδικό κομμάτι για τον χώρο σου.',
  },
  buttonLabel: { type: String, default: 'Δείτε τη συλλογή' },
  to: { type: [String, Object], default: () => ({ path: '/works', query: { c: 'Pure art' } }) },
  category: { type: String, default: 'Pure art' },
  image: { type: String, default: '/works/pure/pure-05.jpg' }, // override· αλλιώς τυχαία από category
  reverse: { type: Boolean, default: false }, // φωτο αριστερά αντί δεξιά
})

const img = ref(props.image)
onMounted(() => {
  if (!img.value) {
    const pool = works.filter((w) => w.category === props.category)
    if (pool.length) img.value = pool[Math.floor(Math.random() * pool.length)].image
  }
})
</script>

<template>
  <section class="grid md:grid-cols-2">
    <!-- Panel (πράσινο σκούρο) -->
    <div
        class="band-panel flex flex-col justify-center px-8 py-16 md:px-16 md:py-24"
        :class="reverse ? 'md:order-2' : 'md:order-1'"
    >
      <p v-if="eyebrow" class="label text-white/55">{{ eyebrow }}</p>
      <h2 class="mt-4 whitespace-pre-line font-display text-4xl leading-[1.08] text-white md:text-5xl">
        {{ heading }}
      </h2>
      <p v-if="text" class="mt-5 max-w-md leading-relaxed text-white/75">{{ text }}</p>
      <RouterLink
          :to="to"
          class="mt-9 inline-block w-fit bg-white px-9 py-4 text-center text-xs font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-white/90"
      >
        {{ buttonLabel }}
      </RouterLink>
    </div>

    <!-- Photo -->
    <div
        class="relative min-h-[340px] md:min-h-0"
        :class="reverse ? 'md:order-1' : 'md:order-2'"
    >
      <img
          v-if="img"
          :src="img"
          :alt="eyebrow"
          class="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
      />
    </div>
  </section>
</template>

<style scoped>
.band-panel {
  background: #4a6253; /* πράσινο σκούρο */
}
:global(html.dark) .band-panel {
  background: #223026;
}
</style>
