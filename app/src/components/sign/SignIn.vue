<script setup>
import { ref } from 'vue'
import { useAuth } from '@/stores/auth'

const auth = useAuth()
const username = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const authentification = async () => {
  if (!username.value || !password.value) {
    errorMessage.value = 'Te rugăm să completezi toate câmpurile!'
    return
  }
  isLoading.value = true
  errorMessage.value = ''
  const error = await auth.checkCredentials(username.value, password.value)
  if (error) {
    errorMessage.value = 'Username sau parolă greșită!'
  }
  isLoading.value = false
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md">
      <!-- Logo si titlu -->
      <div class="text-center mb-8">
        <p class="text-4xl mb-2">
          🌿
        </p>
        <h1 class="text-2xl font-bold text-green-800">
          Bun venit înapoi!
        </h1>
        <p class="text-gray-500 mt-1">
          Conectează-te la FarmHub
        </p>
      </div>

      <!-- Mesaj eroare -->
      <div
        v-if="errorMessage"
        class="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm"
      >
        ⚠️ {{ errorMessage }}
      </div>

      <!-- Formular -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
        <input
          v-model="username"
          type="text"
          placeholder="Introdu username-ul"
          class="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-green-500 text-gray-900"
          @keyup.enter="authentification"
        >
      </div>

      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-1">Parolă</label>
        <input
          v-model="password"
          type="password"
          placeholder="Introdu parola"
          class="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-green-500 text-gray-900"
          @keyup.enter="authentification"
        >
      </div>

      <button
        :disabled="isLoading"
        class="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-medium transition"
        @click="authentification"
      >
        {{ isLoading ? 'Se conectează...' : 'Sign In' }}
      </button>

      <a class="block text-center mt-4 text-sm text-blue-500 hover:underline cursor-pointer">
        Am uitat parola
      </a>
    </div>
  </div>
</template>
