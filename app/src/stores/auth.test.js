import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

vi.mock('axios', () => ({
  default: {
    post: vi.fn()
  }
}))

vi.mock('@/router', () => ({
  default: { push: vi.fn() }
}))

import { useAuth } from '@/stores/auth'
import axios from 'axios'
import router from '@/router'

describe('auth store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('state initial are token gol si isAuthenticated false', () => {
    const auth = useAuth()

    expect(auth.token).toBe('')
    expect(auth.refreshToken).toBe('')
    expect(auth.isAuthenticated).toBe(false)
  })

  it('setTokens salveaza token-urile in state si localStorage', () => {
    const auth = useAuth()

    auth.setTokens('access-123', 'refresh-456')

    expect(auth.token).toBe('access-123')
    expect(auth.refreshToken).toBe('refresh-456')
    expect(auth.isAuthenticated).toBe(true)
    expect(localStorage.getItem('token')).toBe('access-123')
    expect(localStorage.getItem('refreshToken')).toBe('refresh-456')
  })

  it('clearTokens sterge token-urile din state si localStorage', () => {
    const auth = useAuth()

    auth.setTokens('access-123', 'refresh-456')
    auth.clearTokens()

    expect(auth.token).toBe('')
    expect(auth.refreshToken).toBe('')
    expect(auth.isAuthenticated).toBe(false)
    expect(localStorage.getItem('token')).toBeNull()
    expect(localStorage.getItem('refreshToken')).toBeNull()
  })

  it('checkCredentials cu succes salveaza tokenurile si redirecteaza', async () => {
    const auth = useAuth()

    axios.post.mockResolvedValue({
      data: { success: true, token: 'access-abc', refreshToken: 'refresh-xyz' }
    })

    await auth.checkCredentials('admin', 'admin')

    expect(auth.token).toBe('access-abc')
    expect(auth.isAuthenticated).toBe(true)
    expect(router.push).toHaveBeenCalledWith('/')
  })

  it('checkCredentials cu esec returneaza mesajul de eroare', async () => {
    const auth = useAuth()

    axios.post.mockResolvedValue({
      data: { success: false, message: 'Credențiale incorecte.' }
    })

    const result = await auth.checkCredentials('admin', 'gresit')

    expect(result).toBe('Credențiale incorecte.')
    expect(auth.isAuthenticated).toBe(false)
  })

  it('checkCredentials cu eroare server returneaza mesaj generic', async () => {
    const auth = useAuth()

    axios.post.mockRejectedValue(new Error('Network Error'))

    const result = await auth.checkCredentials('admin', 'admin')

    expect(result).toBe('Eroare server. Încearcă din nou.')
    expect(auth.isAuthenticated).toBe(false)
  })

  it('refreshAccessToken cu succes actualizeaza tokenurile', async () => {
    const auth = useAuth()

    auth.setTokens('old-token', 'old-refresh')

    axios.post.mockResolvedValue({
      data: { success: true, token: 'new-token', refreshToken: 'new-refresh' }
    })

    await auth.refreshAccessToken()

    expect(auth.token).toBe('new-token')
    expect(auth.refreshToken).toBe('new-refresh')
    expect(auth.isAuthenticated).toBe(true)
  })

  it('refreshAccessToken cu esec sterge tokenurile si redirecteaza la signIn', async () => {
    const auth = useAuth()

    auth.setTokens('old-token', 'old-refresh')

    axios.post.mockResolvedValue({
      data: { success: false }
    })

    await auth.refreshAccessToken()

    expect(auth.isAuthenticated).toBe(false)
    expect(router.push).toHaveBeenCalledWith('/signIn')
  })

  it('logout sterge tokenurile si redirecteaza la firstView', () => {
    const auth = useAuth()

    auth.setTokens('access-123', 'refresh-456')
    auth.logout()

    expect(auth.isAuthenticated).toBe(false)
    expect(auth.token).toBe('')
    expect(router.push).toHaveBeenCalledWith('/firstView')
  })
})
