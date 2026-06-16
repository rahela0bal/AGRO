import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

import { useEvenimenteStore } from '@/stores/evenimente'

describe('evenimente store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('state initial are 2 evenimente predefinite', () => {
    const evenimenteStore = useEvenimenteStore()

    expect(evenimenteStore.evenimente).toHaveLength(2)
    expect(evenimenteStore.evenimente[0].tip).toBe('Control')
    expect(evenimenteStore.evenimente[1].tip).toBe('Aprovizionare')
  })

  it('totalEvenimente returneaza numarul corect de evenimente', () => {
    const evenimenteStore = useEvenimenteStore()

    expect(evenimenteStore.totalEvenimente).toBe(2)
  })

  it('evenimenteViitoare nu include evenimentele din trecut', () => {
    const evenimenteStore = useEvenimenteStore()

    // Evenimentele predefinite (2026-01-25 si 2026-01-28) sunt in trecut fata de 2026-06-04
    const viitoare = evenimenteStore.evenimenteViitoare
    const viitoareIds = viitoare.map((e) => e.id)

    expect(viitoareIds).not.toContain(1)
    expect(viitoareIds).not.toContain(2)
  })

  it('evenimenteViitoare include evenimentele cu data in viitor', () => {
    const evenimenteStore = useEvenimenteStore()

    evenimenteStore.addEveniment({ tip: 'Vaccinare', descriere: 'Vaccin bovine', data: '2027-01-01' })

    const viitoare = evenimenteStore.evenimenteViitoare

    expect(viitoare.some((e) => e.tip === 'Vaccinare')).toBe(true)
  })

  it('addEveniment adauga un eveniment nou in lista', () => {
    const evenimenteStore = useEvenimenteStore()

    evenimenteStore.addEveniment({ tip: 'Recoltare', descriere: 'Recoltare grau', data: '2027-08-15' })

    expect(evenimenteStore.evenimente).toHaveLength(3)
    expect(evenimenteStore.totalEvenimente).toBe(3)
    expect(evenimenteStore.evenimente[2].tip).toBe('Recoltare')
    expect(evenimenteStore.evenimente[2].descriere).toBe('Recoltare grau')
  })
})
