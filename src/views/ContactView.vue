<script setup>
import { MapPin, Phone, Smartphone, Mail } from 'lucide-vue-next'
import ContactForm from '@/components/ContactForm.vue'
import { useRoute } from 'vue-router'
import { site } from '@/config/site'
import { comingSoon } from '@/config/content'
import { usePageSeo } from '@/composables/useSeo'
import { useLang } from '@/composables/useLang'

usePageSeo('contact')
const { t, tr } = useLang()

const c = site.contact
// /contact?topic=items → έτοιμο μήνυμα ενδιαφέροντος για τη συλλογή
const initialMessage = useRoute().query.topic === 'items' ? tr(comingSoon.message) : ''
</script>

<template>
  <section class="mx-auto max-w-6xl px-6 pt-14 pb-24 md:pt-16">
    <div class="text-center">
      <p class="eyebrow text-xl md:text-2xl">{{ t('contact.eyebrow') }}</p>
      <h1 class="mt-1 text-2xl md:text-4xl">{{ t('contact.title') }}</h1>
    </div>

    <div class="mt-14 grid gap-12 lg:grid-cols-2">
      <!-- Info -->
      <div v-reveal>
        <ul class="space-y-6">
          <li v-if="c.address.street" class="flex items-start gap-4">
            <MapPin :size="20" :stroke-width="1.6" class="mt-1 shrink-0 text-accent" />
            <div><p class="label text-ink-soft">{{ t('contact.studio') }}</p>
              <p class="mt-1 text-lg">{{ c.address.street }}, {{ c.address.area }}</p></div>
          </li>
          <li v-if="c.phone" class="flex items-start gap-4">
            <Phone :size="20" :stroke-width="1.6" class="mt-1 shrink-0 text-accent" />
            <div><p class="label text-ink-soft">{{ t('contact.phone') }}</p>
              <a :href="'tel:' + c.phoneRaw" class="mt-1 block text-lg hover:text-accent">{{ c.phone }}</a></div>
          </li>
          <li v-if="c.mobile" class="flex items-start gap-4">
            <Smartphone :size="20" :stroke-width="1.6" class="mt-1 shrink-0 text-accent" />
            <div><p class="label text-ink-soft">{{ t('contact.mobile') }}</p>
              <a :href="'tel:' + c.mobileRaw" class="mt-1 block text-lg hover:text-accent">{{ c.mobile }}</a></div>
          </li>
          <li v-if="c.email" class="flex items-start gap-4">
            <Mail :size="20" :stroke-width="1.6" class="mt-1 shrink-0 text-accent" />
            <div><p class="label text-ink-soft">{{ t('contact.email') }}</p>
              <a :href="'mailto:' + c.email" class="mt-1 block text-lg hover:text-accent">{{ c.email }}</a></div>
          </li>
        </ul>
      </div>

      <!-- Form -->
      <div v-if="site.features.contactForm" v-reveal="1">
        <ContactForm :endpoint="c.formEndpoint" :initial-message="initialMessage" />
      </div>
    </div>
  </section>
</template>
