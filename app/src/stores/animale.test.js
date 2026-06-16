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

import { useAnimaleStore } from '@/stores/animale'
import axios from '@/api'

describe('animale store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('state initial are fermieri array gol', () => {
    const animaleStore = useAnimaleStore()

    expect(animaleStore.fermieri).toEqual([])
  })

  it('animale computed e gol cand fermieri e gol', () => {
    const animaleStore = useAnimaleStore()

    expect(animaleStore.animale).toEqual([])
    expect(animaleStore.totalAnimale).toBe(0)
  })

  it('fetchAnimale populeaza fermieri din API mock', async () => {
    const animaleStore = useAnimaleStore()

    axios.get.mockResolvedValue({
      data: [
        { id: 1, nume: 'Ion Popescu', Animals: [] },
        { id: 2, nume: 'Maria Ionescu', Animals: [] }
      ]
    })

    await animaleStore.fetchAnimale()

    expect(animaleStore.fermieri).toHaveLength(2)
    expect(animaleStore.fermieri[0].nume).toBe('Ion Popescu')
    expect(animaleStore.fermieri[1].nume).toBe('Maria Ionescu')
  })

  it('animale computed aplatizeaza Animals din toti fermierii', async () => {
    const animaleStore = useAnimaleStore()

    axios.get.mockResolvedValue({
      data: [
        { id: 1, nume: 'Ion Popescu', Animals: [
          { id: 10, nume: 'Bobiță', specie: 'Vaca' },
          { id: 11, nume: 'Florica', specie: 'Vaca' }
        ]},
        { id: 2, nume: 'Maria Ionescu', Animals: [
          { id: 20, nume: 'Rex', specie: 'Caine' }
        ]}
      ]
    })

    await animaleStore.fetchAnimale()

    expect(animaleStore.animale).toHaveLength(3)
    expect(animaleStore.animale[0].fermierNume).toBe('Ion Popescu')
    expect(animaleStore.animale[2].fermierNume).toBe('Maria Ionescu')
    expect(animaleStore.totalAnimale).toBe(3)
  })

  it('categorii computed returneaza speciile unice', async () => {
    const animaleStore = useAnimaleStore()

    axios.get.mockResolvedValue({
      data: [
        { id: 1, nume: 'Ion Popescu', Animals: [
          { id: 10, specie: 'Vaca' },
          { id: 11, specie: 'Vaca' },
          { id: 12, specie: 'Porc' }
        ]}
      ]
    })

    await animaleStore.fetchAnimale()

    expect(animaleStore.categorii).toHaveLength(2)
    expect(animaleStore.categorii).toContain('Vaca')
    expect(animaleStore.categorii).toContain('Porc')
  })
})
