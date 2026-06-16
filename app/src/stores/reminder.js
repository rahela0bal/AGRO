import axios from '@/api'
import { defineStore } from 'pinia'
import { useAuth } from '@/stores/auth'

export const useReminder = defineStore('reminder', {
  state: () => ({
    reminders: []
  }),
  actions: {
    async getReminders() {
      try {
        const response = await axios.get('http://localhost:3003/reminder/get-all', {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
        this.reminders = response.data
      } catch (error) {
        console.error('Error fetching reminders:', error)
      }
    },
    async addReminder(title, date, priority) {
      try {
        const response = await axios.post('http://localhost:3003/reminder/add', {
          title, date, priority
        }, {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
        this.reminders.push(response.data)
      } catch (error) {
        console.error('Error adding reminder:', error)
      }
    },
    async removeReminder(id) {
      this.reminders.splice(this.reminders.findIndex((r) => r.id === id), 1)
      try {
        await axios.delete('http://localhost:3003/reminder/delete', {
          headers: { Authorization: `Bearer ${useAuth().token}` },
          data: { id }
        })
      } catch (error) {
        console.error('Error removing reminder:', error)
      }
    },
    async toggleDone(id) {
      const index = this.reminders.findIndex((r) => r.id === id)
      this.reminders[index].done = !this.reminders[index].done
      try {
        await axios.put('http://localhost:3003/reminder/update-done', { id }, {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
      } catch (error) {
        console.error('Error toggling done:', error)
      }
    }
  }
})
