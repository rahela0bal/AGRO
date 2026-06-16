import axios from 'axios'
import { useAuth } from '@/stores/auth'

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/refresh')
    ) {
      originalRequest._retry = true

      const auth = useAuth()

      await auth.refreshAccessToken()

      if (auth.isAuthenticated) {
        originalRequest.headers['Authorization'] = `Bearer ${auth.token}`
        return axios(originalRequest)
      } else {
        auth.logout()
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  }
)

export default axios
