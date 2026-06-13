<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, default: '' },
  soft: { type: Boolean, default: false }, // bg-soft variant
  narrow: { type: Boolean, default: false }, // max-w-3xl αντί 6xl
})
</script>

<template>
  <section
    v-reveal
    class="border-t border-line"
    :class="soft ? 'bg-bg-soft' : ''"
  >
    <div
      class="mx-auto px-6 pt-14 pb-20 md:pt-20"
      :class="narrow ? 'max-w-3xl' : 'max-w-6xl'"
    >
      <div v-if="eyebrow || title" class="text-center">
        <p v-if="eyebrow" class="font-display text-2xl italic text-ink-soft">
          {{ eyebrow }}
        </p>
        <h2 v-if="title" class="mt-1 text-3xl font-bold md:text-4xl">
          {{ title }}
        </h2>
      </div>
      <div :class="(eyebrow || title) ? 'mt-12' : ''">
        <slot />
      </div>
    </div>
  </section>
</template>
