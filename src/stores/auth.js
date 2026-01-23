import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isLoggedIn = ref(false)

  const userName = computed(() => user.value?.name || 'Utilizator')
  const userEmail = computed(() => user.value?.email || '')

  function login(credentials) {
    user.value = { name: 'Fermier Test', email: credentials.email }
    isLoggedIn.value = true
  }

  function logout() {
    user.value = null
    isLoggedIn.value = false
  }

  return { user, isLoggedIn, userName, userEmail, login, logout }
})
