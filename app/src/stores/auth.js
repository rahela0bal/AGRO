import router from '@/router'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuth = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    refreshToken: localStorage.getItem('refreshToken') || '',
    isAuthenticated: Boolean(localStorage.getItem('token'))
  }),

  actions: {
    setTokens(token, refreshToken) {
      this.token = token
      this.refreshToken = refreshToken
      this.isAuthenticated = true
      localStorage.setItem('token', token)
      localStorage.setItem('refreshToken', refreshToken)
    },

    clearTokens() {
      this.token = ''
      this.refreshToken = ''
      this.isAuthenticated = false
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
    },

    async checkCredentials(username, password) {
      try {
        const response = await axios.post('http://localhost:3003/auth/login', {
          username,
          password
        })
        if (response.data.success) {
          this.setTokens(response.data.token, response.data.refreshToken)
          router.push('/')
        } else {
          this.clearTokens()
          return response.data.message || 'Login eșuat.'
        }
      } catch (error) {
        this.clearTokens()
        return 'Eroare server. Încearcă din nou.'
      }
    },

    async refreshAccessToken() {
      try {
        const response = await axios.post('http://localhost:3003/auth/refresh', {
          refreshToken: this.refreshToken
        })
        if (response.data.success) {
          this.setTokens(response.data.token, response.data.refreshToken)
        } else {
          this.clearTokens()
          router.push('/signIn')
        }
      } catch (error) {
        this.clearTokens()
        router.push('/signIn')
      }
    },

    logout() {
      this.clearTokens()
      router.push('/firstView')
    }
  }
})
