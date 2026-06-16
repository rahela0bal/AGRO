<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const sectiuniFerma = [
  { text: 'Animalele mele', link: '/animaleleMele', emoji: '🐄' },
  { text: 'Proprietățile mele', link: '/proprietatileMele', emoji: '🏡' },
  { text: 'Postările mele', link: '/postarileMele', emoji: '📝' },
  { text: 'Calendarul meu', link: '/calendarulMeu', emoji: '📅' },
  { text: 'Furnizorii mei', link: '/furnizoriiMei', emoji: '🚛' },
  { text: 'Reminders', link: '/reminders', emoji: '⏰' },
  { text: 'To do of the day', link: '/todo', emoji: '✅' },
]

const sectiuniEvidenta = [
  { text: 'Proprietăți', link: '/proprietati-api', emoji: '📋', sub: 'parcele în baza de date' },
  { text: 'Detalii parcele', link: '/proprietate-detalii-api', emoji: '📐', sub: 'suprafață, irigație' },
  { text: 'Culturi', link: '/culturi-api', emoji: '🌾', sub: 'legat de proprietăți' },
  { text: 'Depozite', link: '/depozite-api', emoji: '🏚️', sub: 'spații de depozitare' },
  { text: 'Loturi semințe', link: '/loturi-seminte-api', emoji: '🌰', sub: 'în depozite' },
]
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6 pb-12 md:p-8">
    <h1 class="mb-2 text-center text-3xl font-bold text-green-800 md:text-4xl">
      Ferma mea
    </h1>
    <p class="mb-8 text-center text-sm text-gray-500">
      Un dashboard personalizat pentru gestionarea fermei tale, cu secțiuni dedicate activităților zilnice și evidenței datelor.
    </p>

    <h2 class="mx-auto mb-3 max-w-3xl text-sm font-semibold uppercase tracking-wide text-green-900/80">
      Activitate fermă
    </h2>
    <div class="mx-auto mb-10 grid max-w-3xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
      <div
        v-for="sectiune in sectiuniFerma"
        :key="sectiune.link"
        class="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:border-green-300 hover:shadow-md"
        role="button"
        tabindex="0"
        @click="router.push(sectiune.link)"
        @keydown.enter="router.push(sectiune.link)"
      >
        <span class="mb-2 text-3xl sm:text-4xl">{{ sectiune.emoji }}</span>
        <span class="text-center text-sm font-medium text-green-800 sm:text-base">{{ sectiune.text }}</span>
      </div>
    </div>

    <h2 class="mx-auto mb-3 max-w-3xl text-sm font-semibold uppercase tracking-wide text-green-900/80">
      Evidență fermă
    </h2>
    <p class="mx-auto mb-4 max-w-3xl text-xs text-gray-500">
      Accesează datele fermei tale stocate în baza de date, cu detalii despre proprietăți, culturi și depozite.
    </p>
    <div class="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
      <div
        v-for="sectiune in sectiuniEvidenta"
        :key="sectiune.link"
        class="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-emerald-100 bg-gradient-to-b from-white to-emerald-50/60 p-5 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
        role="button"
        tabindex="0"
        @click="router.push(sectiune.link)"
        @keydown.enter="router.push(sectiune.link)"
      >
        <span class="mb-2 text-3xl sm:text-4xl">{{ sectiune.emoji }}</span>
        <span class="mb-1 text-center text-sm font-semibold text-emerald-900 sm:text-base">{{ sectiune.text }}</span>
        <span class="text-center text-[11px] leading-tight text-emerald-800/70 sm:text-xs">{{ sectiune.sub }}</span>
      </div>
    </div>

    <div class="mx-auto mt-10 max-w-3xl rounded-xl border border-dashed border-gray-200 bg-white/60 p-4 text-center text-sm text-gray-600">
      <span class="font-medium text-green-800">Autentificare:</span>
      acces rapid la
      <button
        type="button"
        class="font-semibold text-emerald-700 underline decoration-emerald-300 underline-offset-2 hover:text-emerald-900"
        @click="router.push('/signIn')"
      >
        Sign in
      </button>
    </div>
  </div>
</template>
