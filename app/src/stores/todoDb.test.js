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

import { useTodo } from '@/stores/todo'
import axios from '@/api'

describe('todo store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('state initial are todos array gol', () => {
    const todoStore = useTodo()

    expect(todoStore.todos).toEqual([])
  })

  it('addTodo adauga un todo in lista', async () => {
    const todoStore = useTodo()

    axios.post.mockResolvedValue({
      data: { id: 1, title: 'Todo nou', done: false, date: '2026-06-04' }
    })

    await todoStore.addTodo('Todo nou', '2026-06-04')

    expect(todoStore.todos).toHaveLength(1)
    expect(todoStore.todos[0].title).toBe('Todo nou')
    expect(todoStore.todos[0].id).toBe(1)
  })

  it('removeTodo elimina un todo dupa id', async () => {
    const todoStore = useTodo()

    todoStore.todos = [
      { id: 1, title: 'Todo 1', done: false },
      { id: 2, title: 'Todo 2', done: false }
    ]

    axios.delete.mockResolvedValue({})

    await todoStore.removeTodo(1)

    expect(todoStore.todos).toHaveLength(1)
    expect(todoStore.todos[0].id).toBe(2)
  })

  it('getTodos populeaza lista din response-ul API mock', async () => {
    const todoStore = useTodo()

    axios.get.mockResolvedValue({
      data: [
        { id: 1, title: 'Todo 1', done: false },
        { id: 2, title: 'Todo 2', done: true },
        { id: 3, title: 'Todo 3', done: false }
      ]
    })

    await todoStore.getTodos()

    expect(todoStore.todos).toHaveLength(3)
    expect(todoStore.todos[0].title).toBe('Todo 1')
    expect(todoStore.todos[1].done).toBe(true)
    expect(todoStore.todos[2].id).toBe(3)
  })

  it('toggleDone inverseaza proprietatea done a unui todo', async () => {
    const todoStore = useTodo()

    todoStore.todos = [
      { id: 1, title: 'Todo 1', done: false }
    ]

    axios.put.mockResolvedValue({})

    await todoStore.toggleDone(1)

    expect(todoStore.todos[0].done).toBe(true)

    await todoStore.toggleDone(1)

    expect(todoStore.todos[0].done).toBe(false)
  })

  it('removeAllDone sterge toate todosurile marcate ca done', async () => {
    const todoStore = useTodo()

    todoStore.todos = [
      { id: 1, title: 'Todo 1', done: true },
      { id: 2, title: 'Todo 2', done: false },
      { id: 3, title: 'Todo 3', done: true }
    ]

    axios.delete.mockResolvedValue({})

    await todoStore.removeAllDone()

    expect(todoStore.todos).toHaveLength(1)
    expect(todoStore.todos[0].id).toBe(2)
    expect(todoStore.todos[0].done).toBe(false)
  })

  it('getTodos nu craseaza la eroare de retea', async () => {
    const todoStore = useTodo()

    axios.get.mockRejectedValue(new Error('Network error'))

    await expect(todoStore.getTodos()).resolves.toBeUndefined()
    expect(todoStore.todos).toEqual([])
  })

  it('addTodo nu craseaza la eroare de retea', async () => {
    const todoStore = useTodo()

    axios.post.mockRejectedValue(new Error('Network error'))

    await expect(todoStore.addTodo('Todo eroare', '2026-06-04')).resolves.toBeUndefined()
    expect(todoStore.todos).toEqual([])
  })

  it('toggleDone nu craseaza la eroare de retea', async () => {
    const todoStore = useTodo()

    todoStore.todos = [{ id: 1, title: 'Todo 1', done: false }]

    axios.put.mockRejectedValue(new Error('Network error'))

    await expect(todoStore.toggleDone(1)).resolves.toBeUndefined()
  })

  it('removeTodo nu craseaza la eroare de retea', async () => {
    const todoStore = useTodo()

    todoStore.todos = [{ id: 1, title: 'Todo 1', done: false }]

    axios.delete.mockRejectedValue(new Error('Network error'))

    await expect(todoStore.removeTodo(1)).resolves.toBeUndefined()
  })

  it('removeAllDone nu craseaza la eroare de retea', async () => {
    const todoStore = useTodo()

    todoStore.todos = []

    axios.delete.mockRejectedValue(new Error('Network error'))

    await expect(todoStore.removeAllDone()).resolves.toBeUndefined()
  })
})
