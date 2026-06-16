import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

import { useFurnizoriStore } from '@/stores/furnizori'

describe('furnizori store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('state initial are 2 furnizori predefiniti', () => {
    const furnizoriStore = useFurnizoriStore()

    expect(furnizoriStore.furnizori).toHaveLength(2)
    expect(furnizoriStore.furnizori[0].nume).toBe('AgroSem')
    expect(furnizoriStore.furnizori[1].nume).toBe('FertilPlus')
  })

  it('totalFurnizori returneaza numarul corect de furnizori', () => {
    const furnizoriStore = useFurnizoriStore()

    expect(furnizoriStore.totalFurnizori).toBe(2)
  })

  it('furnizoriByLocalitate grupeaza furnizorii dupa localitate', () => {
    const furnizoriStore = useFurnizoriStore()

    const grouped = furnizoriStore.furnizoriByLocalitate

    expect(grouped['Oradea']).toHaveLength(1)
    expect(grouped['Oradea'][0].nume).toBe('AgroSem')
    expect(grouped['Cluj']).toHaveLength(1)
    expect(grouped['Cluj'][0].nume).toBe('FertilPlus')
  })

  it('addFurnizor adauga un furnizor nou in lista', () => {
    const furnizoriStore = useFurnizoriStore()

    furnizoriStore.addFurnizor({ nume: 'SeedPro', tipProduse: 'Pesticide', localitate: 'Timisoara' })

    expect(furnizoriStore.furnizori).toHaveLength(3)
    expect(furnizoriStore.totalFurnizori).toBe(3)
    expect(furnizoriStore.furnizori[2].nume).toBe('SeedPro')
    expect(furnizoriStore.furnizori[2].localitate).toBe('Timisoara')
  })

  it('furnizoriByLocalitate include furnizorul nou adaugat', () => {
    const furnizoriStore = useFurnizoriStore()

    furnizoriStore.addFurnizor({ nume: 'AgroVest', tipProduse: 'Utilaje', localitate: 'Oradea' })

    expect(furnizoriStore.furnizoriByLocalitate['Oradea']).toHaveLength(2)
  })
})
