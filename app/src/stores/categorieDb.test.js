import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

vi.mock('@/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  }
}))

vi.mock('@/stores/auth', () => ({
  useAuth: () => ({ token: 'test-token' })
}))

import { useCategorieDb } from '@/stores/categorieDb'
import axios from '@/api'

describe('categorieDb store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('state initial are categorii array gol', () => {
    const categorieStore = useCategorieDb()

    expect(categorieStore.categorii).toEqual([])
  })

  it('addCategorie adauga o categorie in lista cu nume si culoare', async () => {
    const categorieStore = useCategorieDb()

    axios.post.mockResolvedValue({
      data: { id: 1, nume: 'Urgente', culoare: '#ff0000', reminderId: 2 }
    })

    await categorieStore.addCategorie(2, 'Urgente', '#ff0000')

    expect(categorieStore.categorii).toHaveLength(1)
    expect(categorieStore.categorii[0].nume).toBe('Urgente')
    expect(categorieStore.categorii[0].culoare).toBe('#ff0000')
    expect(categorieStore.categorii[0].id).toBe(1)
  })

  it('getCategorii populeaza lista din API mock', async () => {
    const categorieStore = useCategorieDb()

    axios.get.mockResolvedValue({
      data: [
        { id: 1, nume: 'Urgente', culoare: '#ff0000' },
        { id: 2, nume: 'Personal', culoare: '#00ff00' },
        { id: 3, nume: 'Munca', culoare: '#0000ff' }
      ]
    })

    await categorieStore.getCategorii()

    expect(categorieStore.categorii).toHaveLength(3)
    expect(categorieStore.categorii[0].nume).toBe('Urgente')
    expect(categorieStore.categorii[1].culoare).toBe('#00ff00')
    expect(categorieStore.categorii[2].id).toBe(3)
  })
})
