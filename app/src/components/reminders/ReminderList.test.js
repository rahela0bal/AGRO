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

const mockReminderStore = {
  reminders: [],
  getReminders: vi.fn(),
  addReminder: vi.fn(),
  removeReminder: vi.fn(),
  toggleDone: vi.fn()
}

const mockCategorieStore = {
  categorii: [],
  getCategorii: vi.fn()
}

vi.mock('@/stores/reminder', () => ({
  useReminder: () => mockReminderStore
}))

vi.mock('@/stores/categorieDb', () => ({
  useCategorieDb: () => mockCategorieStore
}))

import ReminderList from './ReminderList.vue'

describe('ReminderList.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
    mockReminderStore.reminders = []
    mockCategorieStore.categorii = []
  })

  it('componenta se randeaza', () => {
    const wrapper = mount(ReminderList)

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('h1').text()).toContain('Reminders')
  })

  it('afiseaza mesaj gol cand reminders e []', () => {
    mockReminderStore.reminders = []

    const wrapper = mount(ReminderList)

    expect(wrapper.text()).toContain('Nu ai niciun reminder. Adaugă unul!')
  })

  it('afiseaza remindere cand exista', () => {
    mockReminderStore.reminders = [
      { id: 1, title: 'Vaccinare bovine', date: '2026-06-10', priority: 'high', done: false },
      { id: 2, title: 'Comanda furaje', date: '2026-06-15', priority: 'medium', done: false }
    ]

    const wrapper = mount(ReminderList)

    expect(wrapper.text()).toContain('Vaccinare bovine')
    expect(wrapper.text()).toContain('Comanda furaje')
    expect(wrapper.text()).toContain('high')
    expect(wrapper.text()).toContain('medium')
    expect(wrapper.text()).not.toContain('Nu ai niciun reminder. Adaugă unul!')
  })

  it('butonul adauga afiseaza formularul', async () => {
    const wrapper = mount(ReminderList)

    expect(wrapper.find('input[placeholder="Ce trebuie să faci?"]').exists()).toBe(false)

    const addButton = wrapper.findAll('button').find(b => b.text().includes('Adaugă Reminder'))
    await addButton.trigger('click')

    expect(wrapper.find('input[placeholder="Ce trebuie să faci?"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Reminder nou')
    expect(wrapper.text()).toContain('Salvează')
    expect(wrapper.text()).toContain('Anulează')
  })
})
