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

import { useProprietateDetaliiDb } from '@/stores/proprietateDetaliiDb'
import axios from '@/api'

describe('proprietateDetaliiDb store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('state initial are detalii array gol', () => {
    const detaliiStore = useProprietateDetaliiDb()

    expect(detaliiStore.detalii).toEqual([])
  })

  it('getDetalii populeaza lista din API mock', async () => {
    const detaliiStore = useProprietateDetaliiDb()

    axios.get.mockResolvedValue({
      data: [
        { id: 1, suprafataHa: 10.5, irigata: true, comentariu: 'Camp fertil', ProprietateId: 1 },
        { id: 2, suprafataHa: 5.0, irigata: false, comentariu: 'Camp secundar', ProprietateId: 2 }
      ]
    })

    await detaliiStore.getDetalii()

    expect(detaliiStore.detalii).toHaveLength(2)
    expect(detaliiStore.detalii[0].suprafataHa).toBe(10.5)
    expect(detaliiStore.detalii[1].comentariu).toBe('Camp secundar')
  })

  it('addDetaliu adauga un detaliu cu payload complet', async () => {
    const detaliiStore = useProprietateDetaliiDb()

    const payload = { suprafataHa: 8.0, irigata: true, comentariu: 'Nou', ProprietateId: 3 }

    axios.post.mockResolvedValue({
      data: { id: 3, ...payload }
    })

    await detaliiStore.addDetaliu(payload)

    expect(detaliiStore.detalii).toHaveLength(1)
    expect(detaliiStore.detalii[0].suprafataHa).toBe(8.0)
    expect(detaliiStore.detalii[0].irigata).toBe(true)
    expect(detaliiStore.detalii[0].ProprietateId).toBe(3)
  })

  it('removeDetaliu elimina un detaliu dupa id', async () => {
    const detaliiStore = useProprietateDetaliiDb()

    detaliiStore.detalii = [
      { id: 1, suprafataHa: 10.5, irigata: true, comentariu: 'Camp fertil', ProprietateId: 1 },
      { id: 2, suprafataHa: 5.0, irigata: false, comentariu: 'Camp secundar', ProprietateId: 2 }
    ]

    axios.delete.mockResolvedValue({})

    await detaliiStore.removeDetaliu(1)

    expect(detaliiStore.detalii).toHaveLength(1)
    expect(detaliiStore.detalii[0].id).toBe(2)
  })

  it('updateSuprafataHa schimba suprafata unui detaliu existent', async () => {
    const detaliiStore = useProprietateDetaliiDb()

    detaliiStore.detalii = [
      { id: 1, suprafataHa: 10.5, irigata: true, comentariu: 'Camp fertil', ProprietateId: 1 }
    ]

    axios.put.mockResolvedValue({})

    await detaliiStore.updateSuprafataHa(1, 15.0)

    expect(detaliiStore.detalii[0].suprafataHa).toBe(15.0)
  })

  it('toggleIrigata inverseaza valoarea irigata a unui detaliu', async () => {
    const detaliiStore = useProprietateDetaliiDb()

    detaliiStore.detalii = [
      { id: 1, suprafataHa: 10.5, irigata: false, comentariu: 'Camp fertil', ProprietateId: 1 }
    ]

    axios.put.mockResolvedValue({})

    await detaliiStore.toggleIrigata(1)

    expect(detaliiStore.detalii[0].irigata).toBe(true)

    await detaliiStore.toggleIrigata(1)

    expect(detaliiStore.detalii[0].irigata).toBe(false)
  })

  it('updateComentariu schimba comentariul unui detaliu existent', async () => {
    const detaliiStore = useProprietateDetaliiDb()

    detaliiStore.detalii = [
      { id: 1, suprafataHa: 10.5, irigata: true, comentariu: 'Camp fertil', ProprietateId: 1 }
    ]

    axios.put.mockResolvedValue({})

    await detaliiStore.updateComentariu(1, 'Camp modernizat')

    expect(detaliiStore.detalii[0].comentariu).toBe('Camp modernizat')
  })
})
