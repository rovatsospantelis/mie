<script setup>
import { MapPin, Phone, Smartphone, Mail } from 'lucide-vue-next'
import ContactForm from '@/components/ContactForm.vue'
import { site } from '@/config/site'
import { usePageSeo } from '@/composables/useSeo'

usePageSeo({
  title: `Επικοινωνία — ${site.name}`,
  description: `Επικοινωνήστε με το ${site.name} για παραγγελίες, εκθέσεις και συνεργασίες.`,
})

const c = site.contact
// TODO: βάλε το Formspree endpoint σου εδώ
const formEndpoint = ''
</script>

<template>
  <section class="mx-auto max-w-6xl px-6 pt-14 pb-24 md:pt-16">
    <div class="text-center">
      <p class="eyebrow text-xl md:text-2xl">Ας μιλήσουμε</p>
      <h1 class="mt-1 text-2xl md:text-4xl">Επικοινωνία</h1>
    </div>

    <div class="mt-14 grid gap-12 lg:grid-cols-2">
      <!-- Info -->
      <div v-reveal>
        <ul class="space-y-6">
          <li v-if="c.address.street" class="flex items-start gap-4">
            <MapPin :size="20" :stroke-width="1.6" class="mt-1 shrink-0 text-accent" />
            <div><p class="label text-ink-soft">Στούντιο</p>
              <p class="mt-1 text-lg">{{ c.address.street }}, {{ c.address.area }}</p></div>
          </li>
          <li v-if="c.phone" class="flex items-start gap-4">
            <Phone :size="20" :stroke-width="1.6" class="mt-1 shrink-0 text-accent" />
            <div><p class="label text-ink-soft">Τηλέφωνο</p>
              <a :href="'tel:' + c.phoneRaw" class="mt-1 block text-lg hover:text-accent">{{ c.phone }}</a></div>
          </li>
          <li v-if="c.mobile" class="flex items-start gap-4">
            <Smartphone :size="20" :stroke-width="1.6" class="mt-1 shrink-0 text-accent" />
            <div><p class="label text-ink-soft">Κινητό</p>
              <a :href="'tel:' + c.mobileRaw" class="mt-1 block text-lg hover:text-accent">{{ c.mobile }}</a></div>
          </li>
          <li v-if="c.email" class="flex items-start gap-4">
            <Mail :size="20" :stroke-width="1.6" class="mt-1 shrink-0 text-accent" />
            <div><p class="label text-ink-soft">Email</p>
              <a :href="'mailto:' + c.email" class="mt-1 block text-lg hover:text-accent">{{ c.email }}</a></div>
          </li>
        </ul>
      </div>

      <!-- Form -->
      <div v-if="site.features.contactForm" v-reveal="1">
        <ContactForm :endpoint="formEndpoint" />
      </div>
    </div>
  </section>
</template>
