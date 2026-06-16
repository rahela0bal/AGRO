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

import { useFermierDb } from '@/stores/fermierDb'
import axios from '@/api'

describe('fermierDb store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('state initial are fermieri array gol', () => {
    const fermierStore = useFermierDb()

    expect(fermierStore.fermieri).toEqual([])
  })

  it('getFermieri populeaza lista din API mock', async () => {
    const fermierStore = useFermierDb()

    axios.get.mockResolvedValue({
      data: [
        { id: 1, nume: 'Ion Popescu', email: 'ion@ferma.ro', Animals: [] },
        { id: 2, nume: 'Maria Ionescu', email: 'maria@ferma.ro', Animals: [] }
      ]
    })

    await fermierStore.getFermieri()

    expect(fermierStore.fermieri).toHaveLength(2)
    expect(fermierStore.fermieri[0].nume).toBe('Ion Popescu')
    expect(fermierStore.fermieri[1].email).toBe('maria@ferma.ro')
  })

  it('addFermier adauga un fermier cu nume si email', async () => {
    const fermierStore = useFermierDb()

    axios.post.mockResolvedValue({
      data: { id: 3, nume: 'Gheorghe Marin', email: 'gheorghe@ferma.ro' }
    })

    await fermierStore.addFermier('Gheorghe Marin', 'gheorghe@ferma.ro')

    expect(fermierStore.fermieri).toHaveLength(1)
    expect(fermierStore.fermieri[0].nume).toBe('Gheorghe Marin')
    expect(fermierStore.fermieri[0].email).toBe('gheorghe@ferma.ro')
    expect(fermierStore.fermieri[0].Animals).toEqual([])
  })

  it('removeFermier elimina un fermier dupa id', async () => {
    const fermierStore = useFermierDb()

    fermierStore.fermieri = [
      { id: 1, nume: 'Ion Popescu', email: 'ion@ferma.ro', Animals: [] },
      { id: 2, nume: 'Maria Ionescu', email: 'maria@ferma.ro', Animals: [] }
    ]

    axios.delete.mockResolvedValue({})

    await fermierStore.removeFermier(1)

    expect(fermierStore.fermieri).toHaveLength(1)
    expect(fermierStore.fermieri[0].id).toBe(2)
  })

  it('updateNume schimba numele unui fermier existent', async () => {
    const fermierStore = useFermierDb()

    fermierStore.fermieri = [
      { id: 1, nume: 'Ion Popescu', email: 'ion@ferma.ro', Animals: [] }
    ]

    axios.put.mockResolvedValue({})

    await fermierStore.updateNume(1, 'Ion Georgescu')

    expect(fermierStore.fermieri[0].nume).toBe('Ion Georgescu')
  })

  it('updateEmail schimba email-ul unui fermier existent', async () => {
    const fermierStore = useFermierDb()

    fermierStore.fermieri = [
      { id: 1, nume: 'Ion Popescu', email: 'ion@ferma.ro', Animals: [] }
    ]

    axios.put.mockResolvedValue({})

    await fermierStore.updateEmail(1, 'ion.nou@ferma.ro')

    expect(fermierStore.fermieri[0].email).toBe('ion.nou@ferma.ro')
  })

  it('addAnimal adauga un animal in lista Animals a fermierului', async () => {
    const fermierStore = useFermierDb()

    fermierStore.fermieri = [
      { id: 1, nume: 'Ion Popescu', email: 'ion@ferma.ro', Animals: [] }
    ]

    axios.post.mockResolvedValue({
      data: { id: 10, nume: 'Bobiță', specie: 'Vaca', varsta: 3 }
    })

    await fermierStore.addAnimal(1, 'Bobiță', 'Vaca', 3)

    expect(fermierStore.fermieri[0].Animals).toHaveLength(1)
    expect(fermierStore.fermieri[0].Animals[0].nume).toBe('Bobiță')
    expect(fermierStore.fermieri[0].Animals[0].specie).toBe('Vaca')
  })

  it('getFermieri nu craseaza la eroare de retea', async () => {
    const fermierStore = useFermierDb()

    axios.get.mockRejectedValue(new Error('Network error'))

    await expect(fermierStore.getFermieri()).resolves.toBeUndefined()
    expect(fermierStore.fermieri).toEqual([])
  })

  it('addFermier nu craseaza la eroare de retea', async () => {
    const fermierStore = useFermierDb()

    axios.post.mockRejectedValue(new Error('Network error'))

    await expect(fermierStore.addFermier('Test', 'test@ferma.ro')).resolves.toBeUndefined()
    expect(fermierStore.fermieri).toEqual([])
  })
})
