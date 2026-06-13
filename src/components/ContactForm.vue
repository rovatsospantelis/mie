<script setup>
import { ref } from 'vue'
import { Send, Check } from 'lucide-vue-next'
import { trackContact } from '@/utils/track'

/**
 * ContactForm — φόρμα επικοινωνίας για lead generation.
 *
 * ΣΤΗΣΙΜΟ (μία φορά ανά project):
 * 1) Φτιάξε δωρεάν λογαριασμό στο https://formspree.io
 * 2) Νέα φόρμα → πάρε το endpoint (https://formspree.io/f/XXXX)
 * 3) Βάλ' το στο prop `endpoint` ή στο config
 *
 * Εναλλακτικά: Netlify Forms (πρόσθεσε netlify σε <form> — δες docs)
 */
const props = defineProps({
  endpoint: { type: String, default: '' }, // Formspree URL
})

const form = ref({ name: '', email: '', phone: '', message: '' })
const status = ref('idle') // idle | sending | success | error
const errorMsg = ref('')

async function submit() {
  if (!form.value.name || !form.value.email || !form.value.message) {
    errorMsg.value = 'Συμπλήρωσε όνομα, email και μήνυμα.'
    status.value = 'error'
    return
  }
  if (!props.endpoint) {
    errorMsg.value = 'Η φόρμα δεν έχει ρυθμιστεί ακόμα (λείπει endpoint).'
    status.value = 'error'
    return
  }

  status.value = 'sending'
  try {
    const res = await fetch(props.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(form.value),
    })
    if (res.ok) {
      status.value = 'success'
      trackContact('form', 'contact_page')
      form.value = { name: '', email: '', phone: '', message: '' }
    } else {
      throw new Error('bad response')
    }
  } catch (e) {
    errorMsg.value = 'Κάτι πήγε στραβά. Δοκίμασε ξανά ή στείλε email απευθείας.'
    status.value = 'error'
  }
}
</script>

<template>
  <div v-if="status === 'success'" class="rounded-2xl border border-line bg-bg-soft p-10 text-center">
    <span class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent-deep">
      <Check :size="28" :stroke-width="2" />
    </span>
    <h3 class="mt-4 text-2xl font-bold">Το μήνυμα στάλθηκε</h3>
    <p class="mt-2 text-ink-soft">Θα επικοινωνήσουμε μαζί σου σύντομα.</p>
  </div>

  <div v-else class="space-y-4">
    <div class="grid gap-4 sm:grid-cols-2">
      <div>
        <label class="text-sm font-medium">Όνομα *</label>
        <input v-model="form.name" type="text"
          class="mt-1.5 w-full rounded-xl border border-line bg-surface px-4 py-3 text-ink outline-none transition-colors focus:border-accent-deep" />
      </div>
      <div>
        <label class="text-sm font-medium">Email *</label>
        <input v-model="form.email" type="email"
          class="mt-1.5 w-full rounded-xl border border-line bg-surface px-4 py-3 text-ink outline-none transition-colors focus:border-accent-deep" />
      </div>
    </div>
    <div>
      <label class="text-sm font-medium">Τηλέφωνο</label>
      <input v-model="form.phone" type="tel"
        class="mt-1.5 w-full rounded-xl border border-line bg-surface px-4 py-3 text-ink outline-none transition-colors focus:border-accent-deep" />
    </div>
    <div>
      <label class="text-sm font-medium">Μήνυμα *</label>
      <textarea v-model="form.message" rows="5"
        class="mt-1.5 w-full rounded-xl border border-line bg-surface px-4 py-3 text-ink outline-none transition-colors focus:border-accent-deep"></textarea>
    </div>

    <p v-if="status === 'error'" class="text-sm text-red-500">{{ errorMsg }}</p>

    <button @click="submit" :disabled="status === 'sending'"
      class="btn btn-solid w-full sm:w-auto">
      <Send :size="18" :stroke-width="1.8" />
      {{ status === 'sending' ? 'Αποστολή…' : 'Στείλε μήνυμα' }}
    </button>
  </div>
</template>
