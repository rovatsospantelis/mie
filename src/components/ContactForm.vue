<script setup>
import { ref } from 'vue'
import { Send, Check } from 'lucide-vue-next'
import { trackContact } from '@/utils/track'
import { site } from '@/config/site'
import { useLang } from '@/composables/useLang'

const { t } = useLang()

/**
 * ContactForm — φόρμα επικοινωνίας μέσω Formspree.
 *
 * ΣΤΗΣΙΜΟ (μία φορά ανά project):
 * 1) Λογαριασμός στο https://formspree.io (με το email που θα λαμβάνει τα μηνύματα)
 * 2) New form → πάρε το endpoint (https://formspree.io/f/XXXX)
 * 3) Βάλ' το στο `contact.formEndpoint` του src/config/site.js
 *
 * Spam: το κρυφό πεδίο `_gotcha` (honeypot) — αν το γεμίσει bot, το Formspree το απορρίπτει σιωπηλά.
 */
const props = defineProps({
  endpoint: { type: String, default: '' }, // Formspree URL
  initialMessage: { type: String, default: '' }, // προσυμπλήρωση μηνύματος (π.χ. από «Ενημερωθείτε πρώτοι»)
})

const empty = () => ({ name: '', email: '', phone: '', message: '', _gotcha: '' })
const form = ref({ ...empty(), message: props.initialMessage })
const status = ref('idle') // idle | sending | success | error
const errorMsg = ref('')

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function fail(msg) {
  errorMsg.value = msg
  status.value = 'error'
}

async function submit() {
  const f = form.value
  if (!f.name.trim() || !f.email.trim() || !f.message.trim()) {
    return fail(t('form.errRequired'))
  }
  if (!emailRe.test(f.email.trim())) {
    return fail(t('form.errEmail'))
  }
  if (!props.endpoint) {
    return fail(t('form.errEndpoint'))
  }

  status.value = 'sending'
  try {
    const res = await fetch(props.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: f.name.trim(),
        email: f.email.trim(),
        phone: f.phone.trim(),
        message: f.message.trim(),
        _gotcha: f._gotcha,
        _subject: `Νέο μήνυμα από ${f.name.trim()} — ${site.name}`,
      }),
    })
    if (res.ok) {
      status.value = 'success'
      trackContact('form', 'contact_page')
      form.value = empty()
      return
    }
    const data = await res.json().catch(() => ({}))
    const detail = data.errors?.map((e) => e.message).join(' ')
    fail(detail || t('form.errGeneric'))
  } catch (e) {
    fail(t('form.errNetwork'))
  }
}
</script>

<template>
  <div v-if="status === 'success'" class="rounded-2xl border border-line bg-bg-soft p-10 text-center" role="status">
    <span class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent-deep">
      <Check :size="28" :stroke-width="2" />
    </span>
    <h3 class="mt-4 text-2xl font-bold">{{ t('form.successTitle') }}</h3>
    <p class="mt-2 text-ink-soft">{{ t('form.successText') }}</p>
  </div>

  <form v-else class="space-y-4" novalidate @submit.prevent="submit">
    <div class="grid gap-4 sm:grid-cols-2">
      <div>
        <label for="cf-name" class="text-sm font-medium">{{ t('form.name') }}</label>
        <input id="cf-name" v-model="form.name" type="text" name="name" autocomplete="name" required
          class="mt-1.5 w-full rounded-xl border border-line bg-surface px-4 py-3 text-ink outline-none transition-colors focus:border-accent-deep" />
      </div>
      <div>
        <label for="cf-email" class="text-sm font-medium">{{ t('form.email') }}</label>
        <input id="cf-email" v-model="form.email" type="email" name="email" autocomplete="email" required
          class="mt-1.5 w-full rounded-xl border border-line bg-surface px-4 py-3 text-ink outline-none transition-colors focus:border-accent-deep" />
      </div>
    </div>
    <div>
      <label for="cf-phone" class="text-sm font-medium">{{ t('form.phone') }}</label>
      <input id="cf-phone" v-model="form.phone" type="tel" name="phone" autocomplete="tel"
        class="mt-1.5 w-full rounded-xl border border-line bg-surface px-4 py-3 text-ink outline-none transition-colors focus:border-accent-deep" />
    </div>
    <div>
      <label for="cf-message" class="text-sm font-medium">{{ t('form.message') }}</label>
      <textarea id="cf-message" v-model="form.message" name="message" rows="5" required
        class="mt-1.5 w-full rounded-xl border border-line bg-surface px-4 py-3 text-ink outline-none transition-colors focus:border-accent-deep"></textarea>
    </div>

    <!-- Honeypot: κρυφό από ανθρώπους, τα bots το γεμίζουν -->
    <input v-model="form._gotcha" type="text" name="_gotcha" tabindex="-1" autocomplete="off"
      aria-hidden="true" class="hidden" />

    <p v-if="status === 'error'" class="text-sm text-red-500" role="alert">{{ errorMsg }}</p>

    <button type="submit" :disabled="status === 'sending'"
      class="btn btn-solid w-full sm:w-auto">
      <Send :size="18" :stroke-width="1.8" />
      {{ status === 'sending' ? t('form.sending') : t('form.send') }}
    </button>
  </form>
</template>
