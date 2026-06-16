import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useWsStore } from '@/stores/wsStore'

describe('wsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('store-ul are toti senzorii definiti', () => {
    const wsStore = useWsStore()

    expect(wsStore.senzori).toHaveProperty('hranire')
    expect(wsStore.senzori).toHaveProperty('adapare')
    expect(wsStore.senzori).toHaveProperty('vaccin')
    expect(wsStore.senzori).toHaveProperty('test')
  })

  it('state initial are toti senzorii cu active: false', () => {
    const wsStore = useWsStore()

    for (const key in wsStore.senzori) {
      expect(wsStore.senzori[key].active).toBe(false)
    }
  })

  it('resetSenzor seteaza active: false si reseteaza timeLeft la interval pentru hranire', () => {
    const wsStore = useWsStore()

    wsStore.senzori.hranire.active = true
    wsStore.senzori.hranire.timeLeft = 0

    wsStore.resetSenzor('hranire')

    expect(wsStore.senzori.hranire.active).toBe(false)
    expect(wsStore.senzori.hranire.timeLeft).toBe(wsStore.senzori.hranire.interval)
  })

  it('startAll scade timeLeft cu 1000ms dupa fiecare secunda', () => {
    vi.useFakeTimers()

    const wsStore = useWsStore()

    const timeLeftInitial = wsStore.senzori.hranire.timeLeft

    wsStore.startAll()

    vi.advanceTimersByTime(1000)

    expect(wsStore.senzori.hranire.timeLeft).toBe(timeLeftInitial - 1000)
    expect(wsStore.senzori.adapare.timeLeft).toBe(wsStore.senzori.adapare.interval - 1000)
    expect(wsStore.senzori.vaccin.timeLeft).toBe(wsStore.senzori.vaccin.interval - 1000)
  })

  it('startAll seteaza active: true cand timeLeft ajunge la 0', () => {
    vi.useFakeTimers()

    const wsStore = useWsStore()

    wsStore.senzori.test.timeLeft = 1000

    wsStore.startAll()

    vi.advanceTimersByTime(1000)

    expect(wsStore.senzori.test.active).toBe(true)
    expect(wsStore.senzori.test.timeLeft).toBe(wsStore.senzori.test.interval)
  })
})
