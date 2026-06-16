import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

import { useProprietatiStore } from '@/stores/proprietati'

describe('proprietati store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('state initial are 2 proprietati predefinite', () => {
    const proprietatiStore = useProprietatiStore()

    expect(proprietatiStore.proprietati).toHaveLength(2)
    expect(proprietatiStore.proprietati[0].denumire).toBe('Lot Principal')
    expect(proprietatiStore.proprietati[1].denumire).toBe('Lot Secundar')
  })

  it('totalProprietati returneaza numarul corect', () => {
    const proprietatiStore = useProprietatiStore()

    expect(proprietatiStore.totalProprietati).toBe(2)
  })

  it('totalSuprafata returneaza suma suprafetelor', () => {
    const proprietatiStore = useProprietatiStore()

    expect(proprietatiStore.totalSuprafata).toBeCloseTo(23.7)
  })

  it('proprietatiCuCamera returneaza doar proprietatile cu hasCamera true', () => {
    const proprietatiStore = useProprietatiStore()

    const cuCamera = proprietatiStore.proprietatiCuCamera

    expect(cuCamera).toHaveLength(1)
    expect(cuCamera[0].denumire).toBe('Lot Principal')
  })

  it('addProprietate adauga o proprietate noua in lista', () => {
    const proprietatiStore = useProprietatiStore()

    proprietatiStore.addProprietate({
      denumire: 'Lot Nou',
      judet: 'Cluj',
      localitate: 'Cluj-Napoca',
      suprafata: 5.0,
      hasCamera: true
    })

    expect(proprietatiStore.proprietati).toHaveLength(3)
    expect(proprietatiStore.totalProprietati).toBe(3)
    expect(proprietatiStore.proprietati[2].denumire).toBe('Lot Nou')
    expect(proprietatiStore.proprietati[2].suprafata).toBe(5.0)
  })

  it('addProprietate actualizeaza totalSuprafata si proprietatiCuCamera', () => {
    const proprietatiStore = useProprietatiStore()

    proprietatiStore.addProprietate({
      denumire: 'Lot Camera',
      judet: 'Bihor',
      localitate: 'Oradea',
      suprafata: 10.0,
      hasCamera: true
    })

    expect(proprietatiStore.totalSuprafata).toBeCloseTo(33.7)
    expect(proprietatiStore.proprietatiCuCamera).toHaveLength(2)
  })

  it('deleteProprietate elimina o proprietate dupa id', () => {
    const proprietatiStore = useProprietatiStore()

    proprietatiStore.deleteProprietate(1)

    expect(proprietatiStore.proprietati).toHaveLength(1)
    expect(proprietatiStore.proprietati[0].denumire).toBe('Lot Secundar')
    expect(proprietatiStore.totalProprietati).toBe(1)
  })
})
