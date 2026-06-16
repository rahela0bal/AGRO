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

import { useDepozitDb } from '@/stores/depozitDb'
import axios from '@/api'

describe('depozitDb store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('state initial are depozite array gol', () => {
    const depozitStore = useDepozitDb()

    expect(depozitStore.depozite).toEqual([])
  })

  it('getDepozite populeaza lista din API mock', async () => {
    const depozitStore = useDepozitDb()

    axios.get.mockResolvedValue({
      data: [
        { id: 1, nume: 'Depozit Central', locatie: 'Cluj', inchis: false },
        { id: 2, nume: 'Depozit Secundar', locatie: 'Oradea', inchis: true }
      ]
    })

    await depozitStore.getDepozite()

    expect(depozitStore.depozite).toHaveLength(2)
    expect(depozitStore.depozite[0].nume).toBe('Depozit Central')
    expect(depozitStore.depozite[1].locatie).toBe('Oradea')
  })

  it('addDepozit adauga un depozit cu nume si locatie', async () => {
    const depozitStore = useDepozitDb()

    axios.post.mockResolvedValue({
      data: { id: 3, nume: 'Depozit Nou', locatie: 'Brasov', inchis: false }
    })

    await depozitStore.addDepozit('Depozit Nou', 'Brasov')

    expect(depozitStore.depozite).toHaveLength(1)
    expect(depozitStore.depozite[0].nume).toBe('Depozit Nou')
    expect(depozitStore.depozite[0].locatie).toBe('Brasov')
  })

  it('removeDepozit elimina un depozit dupa id', async () => {
    const depozitStore = useDepozitDb()

    depozitStore.depozite = [
      { id: 1, nume: 'Depozit Central', locatie: 'Cluj', inchis: false },
      { id: 2, nume: 'Depozit Secundar', locatie: 'Oradea', inchis: true }
    ]

    axios.delete.mockResolvedValue({})

    await depozitStore.removeDepozit(1)

    expect(depozitStore.depozite).toHaveLength(1)
    expect(depozitStore.depozite[0].id).toBe(2)
  })

  it('updateNume schimba numele unui depozit existent', async () => {
    const depozitStore = useDepozitDb()

    depozitStore.depozite = [
      { id: 1, nume: 'Depozit Central', locatie: 'Cluj', inchis: false }
    ]

    axios.put.mockResolvedValue({})

    await depozitStore.updateNume(1, 'Depozit Principal')

    expect(depozitStore.depozite[0].nume).toBe('Depozit Principal')
  })

  it('updateLocatie schimba locatia unui depozit existent', async () => {
    const depozitStore = useDepozitDb()

    depozitStore.depozite = [
      { id: 1, nume: 'Depozit Central', locatie: 'Cluj', inchis: false }
    ]

    axios.put.mockResolvedValue({})

    await depozitStore.updateLocatie(1, 'Brasov')

    expect(depozitStore.depozite[0].locatie).toBe('Brasov')
  })

  it('toggleInchis inverseaza proprietatea inchis a unui depozit', async () => {
    const depozitStore = useDepozitDb()

    depozitStore.depozite = [
      { id: 1, nume: 'Depozit Central', locatie: 'Cluj', inchis: false }
    ]

    axios.put.mockResolvedValue({})

    await depozitStore.toggleInchis(1)

    expect(depozitStore.depozite[0].inchis).toBe(true)

    await depozitStore.toggleInchis(1)

    expect(depozitStore.depozite[0].inchis).toBe(false)
  })

  it('getDepozite nu craseaza la eroare de retea', async () => {
    const depozitStore = useDepozitDb()

    axios.get.mockRejectedValue(new Error('Network error'))

    await expect(depozitStore.getDepozite()).resolves.toBeUndefined()
    expect(depozitStore.depozite).toEqual([])
  })

  it('addDepozit nu craseaza la eroare de retea', async () => {
    const depozitStore = useDepozitDb()

    axios.post.mockRejectedValue(new Error('Network error'))

    await expect(depozitStore.addDepozit('Depozit eroare', 'Sibiu')).resolves.toBeUndefined()
    expect(depozitStore.depozite).toEqual([])
  })

  it('removeDepozit nu craseaza la eroare de retea', async () => {
    const depozitStore = useDepozitDb()

    depozitStore.depozite = [{ id: 1, nume: 'Depozit Central', locatie: 'Cluj', inchis: false }]

    axios.delete.mockRejectedValue(new Error('Network error'))

    await expect(depozitStore.removeDepozit(1)).resolves.toBeUndefined()
  })

  it('updateNume nu craseaza la eroare de retea', async () => {
    const depozitStore = useDepozitDb()

    depozitStore.depozite = [{ id: 1, nume: 'Depozit Central', locatie: 'Cluj', inchis: false }]

    axios.put.mockRejectedValue(new Error('Network error'))

    await expect(depozitStore.updateNume(1, 'Nou')).resolves.toBeUndefined()
  })
})
