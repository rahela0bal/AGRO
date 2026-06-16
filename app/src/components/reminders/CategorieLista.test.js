import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
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

const mockCategorieStore = {
  categorii: [],
  getCategorii: vi.fn(),
  addCategorie: vi.fn()
}

const mockReminderStore = {
  reminders: [],
  getReminders: vi.fn()
}

vi.mock('@/stores/categorieDb', () => ({
  useCategorieDb: () => mockCategorieStore
}))

vi.mock('@/stores/reminder', () => ({
  useReminder: () => mockReminderStore
}))

import CategorieLista from './CategorieLista.vue'

describe('CategorieLista.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
    mockCategorieStore.categorii = []
    mockReminderStore.reminders = []
  })

  it('componenta se randeaza', () => {
    const wrapper = mount(CategorieLista)

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('h1').text()).toContain('Categorii Remindere')
  })

  it('afiseaza mesaj gol cand categorii e []', () => {
    const wrapper = mount(CategorieLista)

    expect(wrapper.text()).toContain('Nu există categorii. Adaugă una!')
  })

  it('afiseaza categoriile cand exista', () => {
    mockCategorieStore.categorii = [
      { id: 1, nume: 'Urgente', culoare: '#ff0000' },
      { id: 2, nume: 'Sanatate', culoare: '#00ff00' }
    ]

    const wrapper = mount(CategorieLista)

    expect(wrapper.text()).toContain('Urgente')
    expect(wrapper.text()).toContain('Sanatate')
    expect(wrapper.text()).not.toContain('Nu există categorii. Adaugă una!')
  })

  it('butonul Adauga afiseaza formularul la click', async () => {
    const wrapper = mount(CategorieLista)

    expect(wrapper.find('select').exists()).toBe(false)

    const addButton = wrapper.findAll('button').find(b => b.text().includes('Adaugă'))
    await addButton.trigger('click')

    expect(wrapper.find('select').exists()).toBe(true)
    expect(wrapper.text()).toContain('Salvează')
    expect(wrapper.text()).toContain('Anulează')
  })

  it('butonul Anuleaza ascunde formularul', async () => {
    const wrapper = mount(CategorieLista)

    const addButton = wrapper.findAll('button').find(b => b.text().includes('Adaugă'))
    await addButton.trigger('click')
    expect(wrapper.find('select').exists()).toBe(true)

    const cancelButton = wrapper.findAll('button').find(b => b.text().includes('Anulează'))
    await cancelButton.trigger('click')

    expect(wrapper.find('select').exists()).toBe(false)
  })
})
