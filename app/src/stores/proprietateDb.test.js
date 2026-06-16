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

import { useProprietateDb } from '@/stores/proprietateDb'
import axios from '@/api'

describe('proprietateDb store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('state initial are proprietati array gol', () => {
    const proprietateStore = useProprietateDb()

    expect(proprietateStore.proprietati).toEqual([])
  })

  it('getProprietati populeaza lista din API mock', async () => {
    const proprietateStore = useProprietateDb()

    axios.get.mockResolvedValue({
      data: [
        { id: 1, nume: 'Ferma Nord', localitate: 'Cluj', activ: true },
        { id: 2, nume: 'Ferma Sud', localitate: 'Timisoara', activ: false }
      ]
    })

    await proprietateStore.getProprietati()

    expect(proprietateStore.proprietati).toHaveLength(2)
    expect(proprietateStore.proprietati[0].nume).toBe('Ferma Nord')
    expect(proprietateStore.proprietati[1].localitate).toBe('Timisoara')
  })

  it('addProprietate adauga o proprietate cu nume si localitate', async () => {
    const proprietateStore = useProprietateDb()

    axios.post.mockResolvedValue({
      data: { id: 3, nume: 'Ferma Est', localitate: 'Iasi', activ: true }
    })

    await proprietateStore.addProprietate('Ferma Est', 'Iasi')

    expect(proprietateStore.proprietati).toHaveLength(1)
    expect(proprietateStore.proprietati[0].nume).toBe('Ferma Est')
    expect(proprietateStore.proprietati[0].localitate).toBe('Iasi')
  })

  it('removeProprietate elimina o proprietate dupa id', async () => {
    const proprietateStore = useProprietateDb()

    proprietateStore.proprietati = [
      { id: 1, nume: 'Ferma Nord', localitate: 'Cluj', activ: true },
      { id: 2, nume: 'Ferma Sud', localitate: 'Timisoara', activ: false }
    ]

    axios.delete.mockResolvedValue({})

    await proprietateStore.removeProprietate(1)

    expect(proprietateStore.proprietati).toHaveLength(1)
    expect(proprietateStore.proprietati[0].id).toBe(2)
  })

  it('updateNume schimba numele unei proprietati existente', async () => {
    const proprietateStore = useProprietateDb()

    proprietateStore.proprietati = [
      { id: 1, nume: 'Ferma Nord', localitate: 'Cluj', activ: true }
    ]

    axios.put.mockResolvedValue({})

    await proprietateStore.updateNume(1, 'Ferma Centrala')

    expect(proprietateStore.proprietati[0].nume).toBe('Ferma Centrala')
  })

  it('updateLocalitate schimba localitatea unei proprietati existente', async () => {
    const proprietateStore = useProprietateDb()

    proprietateStore.proprietati = [
      { id: 1, nume: 'Ferma Nord', localitate: 'Cluj', activ: true }
    ]

    axios.put.mockResolvedValue({})

    await proprietateStore.updateLocalitate(1, 'Oradea')

    expect(proprietateStore.proprietati[0].localitate).toBe('Oradea')
  })

  it('toggleActiv inverseaza proprietatea activ a unei proprietati', async () => {
    const proprietateStore = useProprietateDb()

    proprietateStore.proprietati = [
      { id: 1, nume: 'Ferma Nord', localitate: 'Cluj', activ: true }
    ]

    axios.put.mockResolvedValue({})

    await proprietateStore.toggleActiv(1)

    expect(proprietateStore.proprietati[0].activ).toBe(false)

    await proprietateStore.toggleActiv(1)

    expect(proprietateStore.proprietati[0].activ).toBe(true)
  })

  it('getProprietati nu craseaza la eroare de retea', async () => {
    const proprietateStore = useProprietateDb()

    axios.get.mockRejectedValue(new Error('Network error'))

    await expect(proprietateStore.getProprietati()).resolves.toBeUndefined()
    expect(proprietateStore.proprietati).toEqual([])
  })

  it('addProprietate nu craseaza la eroare de retea', async () => {
    const proprietateStore = useProprietateDb()

    axios.post.mockRejectedValue(new Error('Network error'))

    await expect(proprietateStore.addProprietate('Ferma eroare', 'Sibiu')).resolves.toBeUndefined()
    expect(proprietateStore.proprietati).toEqual([])
  })

  it('removeProprietate nu craseaza la eroare de retea', async () => {
    const proprietateStore = useProprietateDb()

    proprietateStore.proprietati = [{ id: 1, nume: 'Ferma Nord', localitate: 'Cluj', activ: true }]

    axios.delete.mockRejectedValue(new Error('Network error'))

    await expect(proprietateStore.removeProprietate(1)).resolves.toBeUndefined()
  })

  it('updateNume nu craseaza la eroare de retea', async () => {
    const proprietateStore = useProprietateDb()

    proprietateStore.proprietati = [{ id: 1, nume: 'Ferma Nord', localitate: 'Cluj', activ: true }]

    axios.put.mockRejectedValue(new Error('Network error'))

    await expect(proprietateStore.updateNume(1, 'Ferma Noua')).resolves.toBeUndefined()
  })
})
