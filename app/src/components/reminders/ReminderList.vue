<script setup>
import { onMounted, ref } from 'vue'
import { useReminder } from '@/stores/reminder'

const reminderStore = useReminder()

const newTitle = ref('')
const newDate = ref('')
const newPriority = ref('medium')
const isAdding = ref(false)

onMounted(async () => {
  await reminderStore.getReminders()
})

const addReminder = async () => {
  if (!newTitle.value) return
  await reminderStore.addReminder(newTitle.value, newDate.value, newPriority.value)
  newTitle.value = ''
  newDate.value = ''
  newPriority.value = 'medium'
  isAdding.value = false
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-3xl mx-auto">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-green-800">
          📋 Reminders
        </h1>
        <button
          class="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-lg font-medium transition"
          @click="isAdding = !isAdding"
        >
          + Adaugă Reminder
        </button>
      </div>

      <!-- Formular de adăugare -->
      <div
        v-if="isAdding"
        class="bg-white rounded-xl shadow p-6 mb-6 border border-green-100"
      >
        <h2 class="text-lg font-semibold text-green-800 mb-4">
          Reminder nou
        </h2>
        <input
          v-model="newTitle"
          type="text"
          placeholder="Ce trebuie să faci?"
          class="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:border-green-500 text-gray-900"
        >
        <div class="flex gap-3 mb-3">
          <input
            v-model="newDate"
            type="date"
            class="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-green-500 text-gray-900"
          >
          <select
            v-model="newPriority"
            class="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-green-500 text-gray-900"
          >
            <option value="low">
              🟢 Low
            </option>
            <option value="medium">
              🟡 Medium
            </option>
            <option value="high">
              🔴 High
            </option>
          </select>
        </div>
        <div class="flex gap-3">
          <button
            class="flex-1 bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg font-medium transition"
            @click="addReminder"
          >
            Salvează
          </button>
          <button
            class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg font-medium transition"
            @click="isAdding = false"
          >
            Anulează
          </button>
        </div>
      </div>

      <!-- Lista de reminders -->
      <div class="space-y-3">
        <div
          v-for="reminder in reminderStore.reminders"
          :key="reminder.id"
          class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center justify-between hover:shadow-md transition"
        >
          <div class="flex items-center gap-4">
            <input
              type="checkbox"
              :checked="reminder.done"
              class="w-5 h-5 accent-green-600 cursor-pointer text-gray-900"
              @change="reminderStore.toggleDone(reminder.id)"
            >
            <div>
              <p
                class="font-medium text-gray-800"
                :class="{ 'line-through text-gray-400': reminder.done }"
              >
                {{ reminder.title }}
              </p>
              <p class="text-sm text-gray-400">
                📅 {{ reminder.date }}
              </p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <span
              class="text-xs font-semibold px-3 py-1 rounded-full"
              :class="{
                'bg-red-100 text-red-700': reminder.priority === 'high',
                'bg-yellow-100 text-yellow-700': reminder.priority === 'medium',
                'bg-green-100 text-green-700': reminder.priority === 'low'
              }"
            >
              {{ reminder.priority }}
            </span>
            <button
              class="text-gray-300 hover:text-red-500 text-xl transition"
              @click="reminderStore.removeReminder(reminder.id)"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      <!-- Mesaj gol -->
      <div
        v-if="reminderStore.reminders.length === 0"
        class="text-center mt-16 text-gray-400"
      >
        <p class="text-5xl mb-4">
          📝
        </p>
        <p class="text-lg">
          Nu ai niciun reminder. Adaugă unul!
        </p>
      </div>
    </div>
  </div>
</template>
