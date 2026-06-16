<script setup>
import { onMounted, ref } from 'vue'
import { useTodo } from '@/stores/todo'

const todoStore = useTodo()

const newTitle = ref('')
const newDate = ref(new Date().toISOString().split('T')[0])
const isAdding = ref(false)

onMounted(async () => {
  await todoStore.getTodos()
})

const addTodo = async () => {
  if (!newTitle.value) return
  await todoStore.addTodo(newTitle.value, newDate.value)
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
            📋 To Do of the Day
          </h1>
          <p class="text-gray-500 mt-1">
            {{ new Date().toLocaleDateString('ro-RO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
          </p>
        </div>
        <div class="flex gap-2">
          <button
            class="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg text-sm transition"
            @click="todoStore.removeAllDone()"
          >
            Șterge completate
          </button>
          <button
            class="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg transition"
            @click="isAdding = !isAdding"
          >
            + Adaugă
          </button>
        </div>
      </div>

      <!-- Formular -->
      <div
        v-if="isAdding"
        class="bg-white rounded-xl shadow p-6 mb-6 border border-green-100"
      >
        <input
          v-model="newTitle"
          type="text"
          placeholder="Ce ai de făcut?"
          class="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:border-green-500 text-gray-900"
          @keyup.enter="addTodo"
        >
        <input
          v-model="newDate"
          type="date"
          class="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:border-green-500 text-gray-900"
        >
        <div class="flex gap-2">
          <button
            class="flex-1 bg-green-700 text-white py-2 rounded-lg transition hover:bg-green-800"
            @click="addTodo"
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
          v-for="todo in todoStore.todos"
          :key="todo.id"
          class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center justify-between hover:shadow-md transition"
        >
          <div class="flex items-center gap-3">
            <input
              type="checkbox"
              :checked="todo.done"
              class="w-5 h-5 accent-green-600 cursor-pointer text-gray-900"
              @change="todoStore.toggleDone(todo.id)"
            >
            <div>
              <p
                class="font-medium text-gray-800"
                :class="{ 'line-through text-gray-400': todo.done }"
              >
                {{ todo.title }}
              </p>
              <p class="text-xs text-gray-400">
                📅 {{ todo.date }}
              </p>
            </div>
          </div>
          <button
            class="text-gray-300 hover:text-red-500 text-xl transition"
            @click="todoStore.removeTodo(todo.id)"
          >
            ✕
          </button>
        </div>
      </div>

      <!-- Gol -->
      <div
        v-if="todoStore.todos.length === 0"
        class="text-center mt-16 text-gray-400"
      >
        <p class="text-5xl mb-4">
          ✅
        </p>
        <p class="text-lg">
          Nu ai nimic de făcut azi!
        </p>
      </div>
    </div>
  </div>
</template>
