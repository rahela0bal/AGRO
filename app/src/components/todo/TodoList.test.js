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

const mockTodoStore = {
  todos: [],
  getTodos: vi.fn(),
  addTodo: vi.fn(),
  removeTodo: vi.fn(),
  toggleDone: vi.fn(),
  removeAllDone: vi.fn()
}

vi.mock('@/stores/todo', () => ({
  useTodo: () => mockTodoStore
}))

import TodoList from './TodoList.vue'

describe('TodoList.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
    mockTodoStore.todos = []
  })

  it('componenta se randeaza fara erori', () => {
    const wrapper = mount(TodoList)

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('h1').text()).toContain('To Do of the Day')
  })

  it('afiseaza mesajul gol cand todos e []', () => {
    mockTodoStore.todos = []

    const wrapper = mount(TodoList)

    expect(wrapper.text()).toContain('Nu ai nimic de făcut azi!')
  })

  it('afiseaza lista cand todos are elemente', () => {
    mockTodoStore.todos = [
      { id: 1, title: 'Cumpara furaje', done: false, date: '2026-06-04' },
      { id: 2, title: 'Verifica animale', done: true, date: '2026-06-04' }
    ]

    const wrapper = mount(TodoList)

    expect(wrapper.text()).toContain('Cumpara furaje')
    expect(wrapper.text()).toContain('Verifica animale')
    expect(wrapper.text()).not.toContain('Nu ai nimic de făcut azi!')
  })

  it('butonul + Adauga afiseaza formularul la click', async () => {
    const wrapper = mount(TodoList)

    expect(wrapper.find('input[type="text"]').exists()).toBe(false)

    const addButton = wrapper.findAll('button').find(b => b.text().includes('Adaugă'))
    await addButton.trigger('click')

    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Salvează')
    expect(wrapper.text()).toContain('Anulează')
  })

  it('checkbox-ul apeleaza toggleDone cu id-ul corect', async () => {
    mockTodoStore.todos = [
      { id: 42, title: 'Task de test', done: false, date: '2026-06-04' }
    ]

    const wrapper = mount(TodoList)

    const checkbox = wrapper.find('input[type="checkbox"]')
    await checkbox.trigger('change')

    expect(mockTodoStore.toggleDone).toHaveBeenCalledWith(42)
  })
})
