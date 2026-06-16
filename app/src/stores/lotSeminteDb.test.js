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

import { useLotSeminteDb } from '@/stores/lotSeminteDb'
import axios from '@/api'

describe('lotSeminteDb store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('state initial are loturi array gol', () => {
    const lotStore = useLotSeminteDb()

    expect(lotStore.loturi).toEqual([])
  })

  it('getLoturi populeaza lista din API mock', async () => {
    const lotStore = useLotSeminteDb()

    axios.get.mockResolvedValue({
      data: [
        { id: 1, numeSoi: 'Grau Orizont', cantitateKg: 500, DepozitId: 1, bio: false },
        { id: 2, numeSoi: 'Porumb Auriu', cantitateKg: 300, DepozitId: 2, bio: true }
      ]
    })

    await lotStore.getLoturi()

    expect(lotStore.loturi).toHaveLength(2)
    expect(lotStore.loturi[0].numeSoi).toBe('Grau Orizont')
    expect(lotStore.loturi[1].cantitateKg).toBe(300)
  })

  it('addLot adauga un lot cu numeSoi, cantitateKg si DepozitId', async () => {
    const lotStore = useLotSeminteDb()

    axios.post.mockResolvedValue({
      data: { id: 3, numeSoi: 'Soia Premium', cantitateKg: 200, DepozitId: 1, bio: true }
    })

    await lotStore.addLot('Soia Premium', 200, 1)

    expect(lotStore.loturi).toHaveLength(1)
    expect(lotStore.loturi[0].numeSoi).toBe('Soia Premium')
    expect(lotStore.loturi[0].cantitateKg).toBe(200)
    expect(lotStore.loturi[0].DepozitId).toBe(1)
  })

  it('removeLot elimina un lot dupa id', async () => {
    const lotStore = useLotSeminteDb()

    lotStore.loturi = [
      { id: 1, numeSoi: 'Grau Orizont', cantitateKg: 500, DepozitId: 1, bio: false },
      { id: 2, numeSoi: 'Porumb Auriu', cantitateKg: 300, DepozitId: 2, bio: true }
    ]

    axios.delete.mockResolvedValue({})

    await lotStore.removeLot(1)

    expect(lotStore.loturi).toHaveLength(1)
    expect(lotStore.loturi[0].id).toBe(2)
  })

  it('updateNumeSoi schimba numeSoi unui lot existent', async () => {
    const lotStore = useLotSeminteDb()

    lotStore.loturi = [
      { id: 1, numeSoi: 'Grau Orizont', cantitateKg: 500, DepozitId: 1, bio: false }
    ]

    axios.put.mockResolvedValue({})

    await lotStore.updateNumeSoi(1, 'Grau Superior')

    expect(lotStore.loturi[0].numeSoi).toBe('Grau Superior')
  })

  it('updateCantitateKg schimba cantitatea unui lot existent', async () => {
    const lotStore = useLotSeminteDb()

    lotStore.loturi = [
      { id: 1, numeSoi: 'Grau Orizont', cantitateKg: 500, DepozitId: 1, bio: false }
    ]

    axios.put.mockResolvedValue({})

    await lotStore.updateCantitateKg(1, 750)

    expect(lotStore.loturi[0].cantitateKg).toBe(750)
  })

  it('toggleBio inverseaza valoarea bio a unui lot', async () => {
    const lotStore = useLotSeminteDb()

    lotStore.loturi = [
      { id: 1, numeSoi: 'Grau Orizont', cantitateKg: 500, DepozitId: 1, bio: false }
    ]

    axios.put.mockResolvedValue({})

    await lotStore.toggleBio(1)

    expect(lotStore.loturi[0].bio).toBe(true)

    await lotStore.toggleBio(1)

    expect(lotStore.loturi[0].bio).toBe(false)
  })
})
