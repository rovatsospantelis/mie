<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { site } from '@/config/site'

const schedule = site.hours
const days = ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο']
const now = ref(new Date())
let timer

onMounted(() => { timer = setInterval(() => { now.value = new Date() }, 60000) })
onUnmounted(() => clearInterval(timer))

function fmt(mins) {
  const h = Math.floor(mins / 60)
  const m = String(mins % 60).padStart(2, '0')
  return `${h}:${m}`
}

const status = computed(() => {
  const local = new Date(now.value.toLocaleString('en-US', { timeZone: 'Europe/Athens' }))
  const day = local.getDay()
  const mins = local.getHours() * 60 + local.getMinutes()
  const today = schedule[day]

  if (today && mins >= today.open && mins < today.close) {
    return { open: true, text: `Ανοιχτά τώρα · έως ${fmt(today.close)}` }
  }
  if (today && mins < today.open) {
    return { open: false, text: `Κλειστά · ανοίγει σήμερα ${fmt(today.open)}` }
  }
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7
    if (schedule[d]) {
      const label = i === 1 ? 'αύριο' : days[d]
      return { open: false, text: `Κλειστά · ανοίγει ${label} ${fmt(schedule[d].open)}` }
    }
  }
  return { open: false, text: 'Κλειστά' }
})
</script>

<template>
  <span class="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm">
    <span class="relative flex h-2.5 w-2.5">
      <span v-if="status.open" class="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style="background: #4CAF50"></span>
      <span class="relative inline-flex h-2.5 w-2.5 rounded-full" :style="{ background: status.open ? '#4CAF50' : 'var(--color-muted)' }"></span>
    </span>
    <span :class="status.open ? 'font-medium text-ink' : 'text-ink-soft'">{{ status.text }}</span>
  </span>
</template>
