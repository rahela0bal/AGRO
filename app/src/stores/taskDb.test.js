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

import { useTaskDb } from '@/stores/taskDb'
import axios from '@/api'

describe('taskDb', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('state initial are tasks array gol', () => {
    const taskDb = useTaskDb()

    expect(taskDb.tasks).toEqual([])
  })

  it('addTask adauga un task in lista locala', async () => {
    const taskDb = useTaskDb()

    axios.post.mockResolvedValue({
      data: { id: 1, title: 'Task nou', done: false, favorite: false }
    })

    await taskDb.addTask('Task nou')

    expect(taskDb.tasks).toHaveLength(1)
    expect(taskDb.tasks[0].title).toBe('Task nou')
    expect(taskDb.tasks[0].id).toBe(1)
  })

  it('removeTask elimina un task dupa id', async () => {
    const taskDb = useTaskDb()

    taskDb.tasks = [
      { id: 1, title: 'Task 1', done: false, favorite: false },
      { id: 2, title: 'Task 2', done: false, favorite: false }
    ]

    axios.delete.mockResolvedValue({})

    await taskDb.removeTask(1)

    expect(taskDb.tasks).toHaveLength(1)
    expect(taskDb.tasks[0].id).toBe(2)
  })

  it('toggleDone schimba proprietatea done', async () => {
    const taskDb = useTaskDb()

    taskDb.tasks = [
      { id: 1, title: 'Task 1', done: false, favorite: false }
    ]

    axios.put.mockResolvedValue({})

    await taskDb.toggleDone(1)

    expect(taskDb.tasks[0].done).toBe(true)

    await taskDb.toggleDone(1)

    expect(taskDb.tasks[0].done).toBe(false)
  })

  it('toggleFavorite inverseaza proprietatea favorite', async () => {
    const taskDb = useTaskDb()

    taskDb.tasks = [
      { id: 1, title: 'Task 1', done: false, favorite: false }
    ]

    axios.put.mockResolvedValue({})

    await taskDb.toggleFavorite(1)

    expect(taskDb.tasks[0].favorite).toBe(true)

    await taskDb.toggleFavorite(1)

    expect(taskDb.tasks[0].favorite).toBe(false)
  })

  it('updateTitle schimba titlul unui task existent', async () => {
    const taskDb = useTaskDb()

    taskDb.tasks = [
      { id: 1, title: 'Titlu vechi', done: false, favorite: false }
    ]

    axios.put.mockResolvedValue({})

    await taskDb.updateTitle(1, 'Titlu nou')

    expect(taskDb.tasks[0].title).toBe('Titlu nou')
  })

  it('getTasks nu craseaza la eroare de retea', async () => {
    const taskDb = useTaskDb()

    axios.get.mockRejectedValue(new Error('Network error'))

    await expect(taskDb.getTasks()).resolves.toBeUndefined()
    expect(taskDb.tasks).toEqual([])
  })

  it('addTask nu craseaza la eroare de retea', async () => {
    const taskDb = useTaskDb()

    axios.post.mockRejectedValue(new Error('Network error'))

    await expect(taskDb.addTask('Task eroare')).resolves.toBeUndefined()
    expect(taskDb.tasks).toEqual([])
  })

  it('removeTask nu craseaza la eroare de retea', async () => {
    const taskDb = useTaskDb()

    taskDb.tasks = [{ id: 1, title: 'Task 1', done: false, favorite: false }]

    axios.delete.mockRejectedValue(new Error('Network error'))

    await expect(taskDb.removeTask(1)).resolves.toBeUndefined()
  })

  it('toggleDone nu craseaza la eroare de retea', async () => {
    const taskDb = useTaskDb()

    taskDb.tasks = [{ id: 1, title: 'Task 1', done: false, favorite: false }]

    axios.put.mockRejectedValue(new Error('Network error'))

    await expect(taskDb.toggleDone(1)).resolves.toBeUndefined()
  })
})
