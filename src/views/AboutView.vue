<script setup>
import { RouterLink } from 'vue-router'
import { site } from '@/config/site'
import { usePageSeo } from '@/composables/useSeo'
import { about } from '@/config/content'

usePageSeo({
  title: `Σχετικά — ${site.name}`,
  description: `Η Μαρίνα Δούκα — creative designer με υπόβαθρο στην εσωτερική αρχιτεκτονική. Art pieces & print pieces.`,
})
</script>

<template>
  <div>
    <!-- Intro: portrait + lead -->
    <section class="mx-auto max-w-6xl px-6 pt-14 pb-16 md:pt-16 md:pb-20">
      <div class="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div v-reveal class="overflow-hidden">
          <img :src="about.portrait" alt="Η Μαρίνα Δούκα στο εργαστήριο"
               class="aspect-[4/5] w-full object-cover" loading="lazy" />
        </div>
        <div v-reveal="1">
          <p class="eyebrow text-xl md:text-2xl">Το εργαστήριο</p>
          <h1 class="mt-3 text-4xl md:text-6xl">
            <span class="brush">Μαρίνα Δούκα</span>
          </h1>
          <p class="mt-6 font-display text-2xl italic leading-snug text-ink md:text-3xl">
            {{ about.lead }}
          </p>
        </div>
      </div>
    </section>

    <!-- Text -->
    <section class="border-t border-line">
      <div class="mx-auto max-w-2xl px-6 py-16 md:py-20">
        <div class="space-y-6 text-lg leading-relaxed text-ink-soft" v-reveal>
          <p v-for="(p, i) in about.paragraphs" :key="i">{{ p }}</p>
        </div>

        <!-- Focus areas -->
        <ul class="mt-10 flex flex-wrap gap-x-3 gap-y-3" v-reveal="1">
          <li v-for="f in about.focus" :key="f"
              class="label border border-line px-4 py-2 text-ink-soft">
            {{ f }}
          </li>
        </ul>
      </div>
    </section>

    <!-- Secondary image -->
    <section v-if="about.secondary" class="border-t border-line bg-bg-soft">
      <div class="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div class="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div v-reveal class="order-2 md:order-1">
            <p class="eyebrow text-xl md:text-2xl">Στο στούντιο</p>
            <h2 class="mt-2 text-3xl md:text-4xl">Από το σχέδιο στο αντικείμενο</h2>
            <p class="mt-5 leading-relaxed text-ink-soft">
              Ζωγραφική, prints και χειροποίητα αντικείμενα — όλα ξεκινούν από το ίδιο
              λεξιλόγιο χρώματος και φόρμας.
            </p>
            <RouterLink to="/works" class="link-cta label mt-6 inline-block">Δείτε τα έργα</RouterLink>
          </div>
          <div v-reveal="1" class="order-1 overflow-hidden md:order-2">
            <img :src="about.secondary" alt="Έκθεση / εγκατάσταση"
                 class="aspect-[4/3] w-full object-cover" loading="lazy" />
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="border-t border-line">
      <div class="mx-auto max-w-3xl px-6 py-16 text-center">
        <h2 class="text-3xl md:text-4xl">Ας συνεργαστούμε</h2>
        <p class="mt-3 text-ink-soft">Για παραγγελίες, συνεργασίες και custom αντικείμενα.</p>
        <RouterLink to="/contact" class="btn btn-primary mt-7">Επικοινωνία</RouterLink>
      </div>
    </section>
  </div>
</template>
