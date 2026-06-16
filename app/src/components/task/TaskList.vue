<script setup>
import { onMounted, ref } from 'vue'
import { useTaskDb } from '@/stores/taskDb'

const taskStore = useTaskDb()

const newTitle = ref('')
const isAdding = ref(false)

onMounted(async () => {
  await taskStore.getTasks()
})

const addTask = async () => {
  if (!newTitle.value) return
  await taskStore.addTask(newTitle.value)
  newTitle.value = ''
  isAdding.value = false
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-2xl mx-auto">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-green-800">
            ⚡ Tasks
          </h1>
          <p class="text-gray-500 mt-1">
            {{ taskStore.tasks.filter(t => !t.done).length }} rămase •
            {{ taskStore.tasks.filter(t => t.favorite).length }} favorite
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
        <input
          v-model="newTitle"
          type="text"
          placeholder="Titlul task-ului..."
          class="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:border-green-500 text-gray-900"
          @keyup.enter="addTask"
        >
        <div class="flex gap-2">
          <button
            class="flex-1 bg-green-700 text-white py-2 rounded-lg transition hover:bg-green-800"
            @click="addTask"
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
          v-for="task in taskStore.tasks"
          :key="task.id"
          class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-3 hover:shadow-md transition"
          :class="{ 'opacity-60': task.done }"
        >
          <!-- Checkbox done -->
          <input
            type="checkbox"
            :checked="task.done"
            class="w-5 h-5 accent-green-600 cursor-pointer flex-shrink-0 text-gray-900"
            @change="taskStore.toggleDone(task.id)"
          >

          <!-- Titlu editabil inline -->
          <input
            :value="task.title"
            type="text"
            class="flex-1 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-green-500 focus:outline-none p-1 transition text-gray-900"
            :class="{ 'line-through text-gray-400': task.done }"
            @change="taskStore.updateTitle(task.id, $event.target.value)"
          >

          <!-- Favorite -->
          <button
            class="text-xl transition flex-shrink-0"
            :class="task.favorite ? 'text-yellow-400 hover:text-yellow-500' : 'text-gray-300 hover:text-yellow-400'"
            @click="taskStore.toggleFavorite(task.id)"
            title="Marchează ca favorit"
          >
            ★
          </button>

          <!-- Delete -->
          <button
            class="text-gray-300 hover:text-red-500 text-xl transition flex-shrink-0"
            @click="taskStore.removeTask(task.id)"
          >
            ✕
          </button>
        </div>
      </div>

      <!-- Gol -->
      <div
        v-if="taskStore.tasks.length === 0"
        class="text-center mt-16 text-gray-400"
      >
        <p class="text-5xl mb-4">
          ⚡
        </p>
        <p class="text-lg">
          Nu ai niciun task. Adaugă unul!
        </p>
      </div>
    </div>
  </div>
</template>
