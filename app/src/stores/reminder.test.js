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

import { useReminder } from '@/stores/reminder'
import axios from '@/api'

describe('reminder store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('state initial are reminders array gol', () => {
    const reminderStore = useReminder()

    expect(reminderStore.reminders).toEqual([])
  })

  it('addReminder adauga un reminder in lista cu titlu si prioritate', async () => {
    const reminderStore = useReminder()

    axios.post.mockResolvedValue({
      data: { id: 1, title: 'Reminder nou', date: '2026-06-04', priority: 'high' }
    })

    await reminderStore.addReminder('Reminder nou', '2026-06-04', 'high')

    expect(reminderStore.reminders).toHaveLength(1)
    expect(reminderStore.reminders[0].title).toBe('Reminder nou')
    expect(reminderStore.reminders[0].priority).toBe('high')
    expect(reminderStore.reminders[0].id).toBe(1)
  })

  it('removeReminder elimina un reminder dupa id', async () => {
    const reminderStore = useReminder()

    reminderStore.reminders = [
      { id: 1, title: 'Reminder 1', done: false },
      { id: 2, title: 'Reminder 2', done: false }
    ]

    axios.delete.mockResolvedValue({})

    await reminderStore.removeReminder(1)

    expect(reminderStore.reminders).toHaveLength(1)
    expect(reminderStore.reminders[0].id).toBe(2)
  })

  it('getReminders populeaza lista din API mock', async () => {
    const reminderStore = useReminder()

    axios.get.mockResolvedValue({
      data: [
        { id: 1, title: 'Reminder 1', priority: 'low', done: false },
        { id: 2, title: 'Reminder 2', priority: 'medium', done: false },
        { id: 3, title: 'Reminder 3', priority: 'high', done: true }
      ]
    })

    await reminderStore.getReminders()

    expect(reminderStore.reminders).toHaveLength(3)
    expect(reminderStore.reminders[0].title).toBe('Reminder 1')
    expect(reminderStore.reminders[1].priority).toBe('medium')
    expect(reminderStore.reminders[2].done).toBe(true)
  })

  it('toggleDone inverseaza proprietatea done a unui reminder', async () => {
    const reminderStore = useReminder()

    reminderStore.reminders = [
      { id: 1, title: 'Reminder test', done: false, priority: 'low' }
    ]

    axios.put.mockResolvedValue({})

    await reminderStore.toggleDone(1)

    expect(reminderStore.reminders[0].done).toBe(true)

    await reminderStore.toggleDone(1)

    expect(reminderStore.reminders[0].done).toBe(false)
  })

  it('getReminders nu craseaza la eroare de retea', async () => {
    const reminderStore = useReminder()

    axios.get.mockRejectedValue(new Error('Network error'))

    await expect(reminderStore.getReminders()).resolves.toBeUndefined()
    expect(reminderStore.reminders).toEqual([])
  })

  it('addReminder nu craseaza la eroare de retea', async () => {
    const reminderStore = useReminder()

    axios.post.mockRejectedValue(new Error('Network error'))

    await expect(reminderStore.addReminder('Test', '2026-06-04', 'low')).resolves.toBeUndefined()
    expect(reminderStore.reminders).toEqual([])
  })
})
