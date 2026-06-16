<script setup>
import { onMounted, ref } from 'vue'
import { useCategorieDb } from '@/stores/categorieDb'
import { useReminder } from '@/stores/reminder'

const categorieStore = useCategorieDb()
const reminderStore = useReminder()

const reminderId = ref('')
const newNume = ref('')
const newCuloare = ref('#16a34a')
const isAdding = ref(false)

onMounted(async () => {
  await reminderStore.getReminders()
  await categorieStore.getCategorii()
})

const addCategorie = async () => {
  if (!newNume.value || reminderId.value === '') return
  await categorieStore.addCategorie(Number(reminderId.value), newNume.value, newCuloare.value)
  newNume.value = ''
  newCuloare.value = '#16a34a'
  reminderId.value = ''
  isAdding.value = false
}

const priorityLabel = (priority) => {
  if (priority === 'high') return '🔴 High'
  if (priority === 'medium') return '🟡 Medium'
  return '🟢 Low'
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-2xl mx-auto">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-green-800">
            🏷️ Categorii Remindere
          </h1>
          <p class="text-gray-500 mt-1">
            {{ categorieStore.categorii.length }} categorii
          </p>
        </div>
        <button
          class="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg transition"
          @click="isAdding = !isAdding"
        >
          + Adaugă
        </button>
      </div>

      <!-- Formular -->
      <div
        v-if="isAdding"
        class="bg-white rounded-xl shadow p-6 mb-6 border border-green-100"
      >
        <select
          v-model="reminderId"
          class="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:border-green-500 text-gray-900"
        >
          <option
            value=""
            disabled
          >
            Alege reminder (FK)
          </option>
          <option
            v-for="r in reminderStore.reminders"
            :key="r.id"
            :value="r.id"
          >
            {{ r.title }} — {{ priorityLabel(r.priority) }}
          </option>
        </select>
        <input
          v-model="newNume"
          type="text"
          placeholder="Nume categorie (ex. Sănătate)"
          class="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:border-green-500 text-gray-900"
          @keyup.enter="addCategorie"
        >
        <div class="flex items-center gap-3 mb-3">
          <label class="text-sm text-gray-600 flex-shrink-0">Culoare:</label>
          <input
            v-model="newCuloare"
            type="color"
            class="w-12 h-10 rounded cursor-pointer border border-gray-300 text-gray-900"
          >
          <span class="text-sm text-gray-500">{{ newCuloare }}</span>
        </div>
        <div class="flex gap-2">
          <button
            class="flex-1 bg-green-700 text-white py-2 rounded-lg transition hover:bg-green-800"
            @click="addCategorie"
          >
            Salvează
          </button>
          <button
            class="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg transition hover:bg-gray-300"
            @click="isAdding = false"
          >
            Anulează
          </button>
        </div>
      </div>

      <!-- Lista -->
      <div class="space-y-3">
        <div
          v-for="cat in categorieStore.categorii"
          :key="cat.id"
          class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-4 hover:shadow-md transition"
        >
          <!-- Indicator culoare -->
          <div
            class="w-4 h-4 rounded-full flex-shrink-0"
            :style="{ backgroundColor: cat.culoare || '#16a34a' }"
          />

          <div class="flex-1">
            <p class="font-medium text-gray-800">
              {{ cat.nume }}
            </p>
            <p
              v-if="cat.Reminder"
              class="text-xs text-gray-400 mt-0.5"
            >
              📋 {{ cat.Reminder.title }}
              <span class="ml-1">— {{ priorityLabel(cat.Reminder.priority) }}</span>
            </p>
          </div>

          <span
            class="text-xs font-medium px-2 py-1 rounded-full text-white"
            :style="{ backgroundColor: cat.culoare || '#16a34a' }"
          >
            {{ cat.culoare || '#16a34a' }}
          </span>
        </div>
      </div>

      <!-- Gol -->
      <div
        v-if="categorieStore.categorii.length === 0"
        class="text-center mt-16 text-gray-400"
      >
        <p class="text-5xl mb-4">
          🏷️
        </p>
        <p class="text-lg">
          Nu există categorii. Adaugă una!
        </p>
      </div>
    </div>
  </div>
</template>
