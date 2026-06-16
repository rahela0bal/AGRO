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

vi.mock('@/ws', () => ({
  default: { send: vi.fn() }
}))

const mockTaskStore = {
  tasks: [],
  getTasks: vi.fn(),
  addTask: vi.fn(),
  removeTask: vi.fn(),
  toggleDone: vi.fn(),
  toggleFavorite: vi.fn(),
  updateTitle: vi.fn()
}

vi.mock('@/stores/taskDb', () => ({
  useTaskDb: () => mockTaskStore
}))

import TaskList from './TaskList.vue'

describe('TaskList.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
    mockTaskStore.tasks = []
  })

  it('componenta se randeaza fara erori', () => {
    const wrapper = mount(TaskList)

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('h1').text()).toContain('Tasks')
  })

  it('afiseaza mesaj cand tasks e gol', () => {
    mockTaskStore.tasks = []

    const wrapper = mount(TaskList)

    expect(wrapper.text()).toContain('Nu ai niciun task. Adaugă unul!')
  })

  it('afiseaza taskurile cand exista', () => {
    mockTaskStore.tasks = [
      { id: 1, title: 'Verifica seră', done: false, favorite: false },
      { id: 2, title: 'Cumpara seminte', done: true, favorite: true }
    ]

    const wrapper = mount(TaskList)

    const inputs = wrapper.findAll('input[type="text"]')
    expect(inputs[0].element.value).toBe('Verifica seră')
    expect(inputs[1].element.value).toBe('Cumpara seminte')
    expect(wrapper.text()).not.toContain('Nu ai niciun task. Adaugă unul!')
  })

  it('butonul de adaugare afiseaza formularul', async () => {
    const wrapper = mount(TaskList)

    expect(wrapper.find('input[placeholder="Titlul task-ului..."]').exists()).toBe(false)

    const addButton = wrapper.findAll('button').find(b => b.text().includes('Adaugă'))
    await addButton.trigger('click')

    expect(wrapper.find('input[placeholder="Titlul task-ului..."]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Salvează')
    expect(wrapper.text()).toContain('Anulează')
  })

  it('checkbox done apeleaza toggleDone cu id-ul corect', async () => {
    mockTaskStore.tasks = [
      { id: 99, title: 'Task de test', done: false, favorite: false }
    ]

    const wrapper = mount(TaskList)

    const checkbox = wrapper.find('input[type="checkbox"]')
    await checkbox.trigger('change')

    expect(mockTaskStore.toggleDone).toHaveBeenCalledWith(99)
  })
})
