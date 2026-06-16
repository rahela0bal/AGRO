import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'

vi.mock('@/ws', () => ({
  default: { send: vi.fn() }
}))

const mockWsStore = {
  senzori: {
    hranire: { label: 'Hrănire animale', timeLeft: 43200000, active: false, interval: 43200000 },
    adapare: { label: 'Adăpare animale', timeLeft: 28800000, active: false, interval: 28800000 },
    vaccin: { label: 'Vaccin animale', timeLeft: 604800000, active: false, interval: 604800000 }
  },
  startAll: vi.fn(),
  resetSenzor: vi.fn()
}

vi.mock('@/stores/wsStore', () => ({
  useWsStore: () => mockWsStore
}))

import Senzori from './Senzori.vue'

describe('Senzori.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
    mockWsStore.senzori.hranire.active = false
    mockWsStore.senzori.adapare.active = false
    mockWsStore.senzori.vaccin.active = false
  })

  it('componenta se randeaza', () => {
    const wrapper = mount(Senzori)

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('h1').text()).toContain('Dispozitive / Senzori')
  })

  it('afiseaza cele 3 carduri de senzori', () => {
    const wrapper = mount(Senzori)

    const carduri = wrapper.findAll('.card')
    expect(carduri).toHaveLength(3)

    expect(wrapper.text()).toContain('Hrănire animale')
    expect(wrapper.text()).toContain('Adăpare animale')
    expect(wrapper.text()).toContain('Vaccin animale')
  })

  it('nu afiseaza butonul Am facut cand active e false', () => {
    const wrapper = mount(Senzori)

    expect(wrapper.find('.btn-facut').exists()).toBe(false)
    expect(wrapper.find('.mesaj-alerta').exists()).toBe(false)
  })

  it('afiseaza butonul Am facut si mesajul cand active e true', () => {
    mockWsStore.senzori.hranire.active = true

    const wrapper = mount(Senzori)

    expect(wrapper.find('.btn-facut').exists()).toBe(true)
    expect(wrapper.find('.btn-facut').text()).toContain('Am făcut')
    expect(wrapper.find('.mesaj-alerta').exists()).toBe(true)
    expect(wrapper.text()).toContain('Este timpul să hrănești animalele!')
  })

  it('butonul Am facut apeleaza resetSenzor cu cheia corecta', async () => {
    mockWsStore.senzori.adapare.active = true

    const wrapper = mount(Senzori)

    const buton = wrapper.find('.btn-facut')
    await buton.trigger('click')

    expect(mockWsStore.resetSenzor).toHaveBeenCalledWith('adapare')
  })
})
