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

import { useCulturaDb } from '@/stores/culturaDb'
import axios from '@/api'

describe('culturaDb store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('state initial are culturi array gol', () => {
    const culturaStore = useCulturaDb()

    expect(culturaStore.culturi).toEqual([])
  })

  it('getCulturi populeaza lista din API mock', async () => {
    const culturaStore = useCulturaDb()

    axios.get.mockResolvedValue({
      data: [
        { id: 1, nume: 'Grau', anPlantare: 2024, ProprietateId: 1, recoltata: false },
        { id: 2, nume: 'Porumb', anPlantare: 2025, ProprietateId: 2, recoltata: true }
      ]
    })

    await culturaStore.getCulturi()

    expect(culturaStore.culturi).toHaveLength(2)
    expect(culturaStore.culturi[0].nume).toBe('Grau')
    expect(culturaStore.culturi[1].anPlantare).toBe(2025)
  })

  it('addCultura adauga o cultura cu nume, anPlantare si ProprietateId', async () => {
    const culturaStore = useCulturaDb()

    axios.post.mockResolvedValue({
      data: { id: 3, nume: 'Floarea soarelui', anPlantare: 2026, ProprietateId: 1, recoltata: false }
    })

    await culturaStore.addCultura('Floarea soarelui', 2026, 1)

    expect(culturaStore.culturi).toHaveLength(1)
    expect(culturaStore.culturi[0].nume).toBe('Floarea soarelui')
    expect(culturaStore.culturi[0].anPlantare).toBe(2026)
    expect(culturaStore.culturi[0].ProprietateId).toBe(1)
  })

  it('removeCultura elimina o cultura dupa id', async () => {
    const culturaStore = useCulturaDb()

    culturaStore.culturi = [
      { id: 1, nume: 'Grau', anPlantare: 2024, ProprietateId: 1, recoltata: false },
      { id: 2, nume: 'Porumb', anPlantare: 2025, ProprietateId: 2, recoltata: true }
    ]

    axios.delete.mockResolvedValue({})

    await culturaStore.removeCultura(1)

    expect(culturaStore.culturi).toHaveLength(1)
    expect(culturaStore.culturi[0].id).toBe(2)
  })

  it('updateNume schimba numele unei culturi existente', async () => {
    const culturaStore = useCulturaDb()

    culturaStore.culturi = [
      { id: 1, nume: 'Grau', anPlantare: 2024, ProprietateId: 1, recoltata: false }
    ]

    axios.put.mockResolvedValue({})

    await culturaStore.updateNume(1, 'Grau Superior')

    expect(culturaStore.culturi[0].nume).toBe('Grau Superior')
  })

  it('updateAnPlantare schimba anul de plantare al unei culturi', async () => {
    const culturaStore = useCulturaDb()

    culturaStore.culturi = [
      { id: 1, nume: 'Grau', anPlantare: 2024, ProprietateId: 1, recoltata: false }
    ]

    axios.put.mockResolvedValue({})

    await culturaStore.updateAnPlantare(1, 2025)

    expect(culturaStore.culturi[0].anPlantare).toBe(2025)
  })

  it('toggleRecoltata inverseaza proprietatea recoltata a unei culturi', async () => {
    const culturaStore = useCulturaDb()

    culturaStore.culturi = [
      { id: 1, nume: 'Grau', anPlantare: 2024, ProprietateId: 1, recoltata: false }
    ]

    axios.put.mockResolvedValue({})

    await culturaStore.toggleRecoltata(1)

    expect(culturaStore.culturi[0].recoltata).toBe(true)

    await culturaStore.toggleRecoltata(1)

    expect(culturaStore.culturi[0].recoltata).toBe(false)
  })

  it('getCulturi nu craseaza la eroare de retea', async () => {
    const culturaStore = useCulturaDb()

    axios.get.mockRejectedValue(new Error('Network error'))

    await expect(culturaStore.getCulturi()).resolves.toBeUndefined()
    expect(culturaStore.culturi).toEqual([])
  })

  it('addCultura nu craseaza la eroare de retea', async () => {
    const culturaStore = useCulturaDb()

    axios.post.mockRejectedValue(new Error('Network error'))

    await expect(culturaStore.addCultura('Soia', 2026, 1)).resolves.toBeUndefined()
    expect(culturaStore.culturi).toEqual([])
  })

  it('removeCultura nu craseaza la eroare de retea', async () => {
    const culturaStore = useCulturaDb()

    culturaStore.culturi = [{ id: 1, nume: 'Grau', anPlantare: 2024, ProprietateId: 1, recoltata: false }]

    axios.delete.mockRejectedValue(new Error('Network error'))

    await expect(culturaStore.removeCultura(1)).resolves.toBeUndefined()
  })

  it('updateNume nu craseaza la eroare de retea', async () => {
    const culturaStore = useCulturaDb()

    culturaStore.culturi = [{ id: 1, nume: 'Grau', anPlantare: 2024, ProprietateId: 1, recoltata: false }]

    axios.put.mockRejectedValue(new Error('Network error'))

    await expect(culturaStore.updateNume(1, 'Grau Nou')).resolves.toBeUndefined()
  })
})
