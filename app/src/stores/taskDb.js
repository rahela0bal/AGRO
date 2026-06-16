import axios from '@/api'
import { defineStore } from 'pinia'
import { useAuth } from '@/stores/auth'

export const useTaskDb = defineStore('taskDb', {
  state: () => ({
    tasks: []
  }),
  actions: {
    async getTasks() {
      try {
        const response = await axios.get('http://localhost:3003/task/get-all', {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
        this.tasks = response.data
      } catch (error) {
        console.error('Error fetching tasks:', error)
      }
    },
    async addTask(title) {
      try {
        const response = await axios.post('http://localhost:3003/task/add', { title }, {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
        this.tasks.push(response.data)
      } catch (error) {
        console.error('Error adding task:', error)
      }
    },
    async removeTask(id) {
      this.tasks.splice(this.tasks.findIndex((t) => t.id === id), 1)
      try {
        await axios.delete('http://localhost:3003/task/delete', {
          headers: { Authorization: `Bearer ${useAuth().token}` },
          data: { id }
        })
      } catch (error) {
        console.error('Error removing task:', error)
      }
    },
    async toggleDone(id) {
      const index = this.tasks.findIndex((t) => t.id === id)
      this.tasks[index].done = !this.tasks[index].done
      try {
        await axios.put('http://localhost:3003/task/update-done', { id }, {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
      } catch (error) {
        console.error('Error toggling done:', error)
      }
    },
    async toggleFavorite(id) {
      const index = this.tasks.findIndex((t) => t.id === id)
      this.tasks[index].favorite = !this.tasks[index].favorite
      try {
        await axios.put('http://localhost:3003/task/update-favorite', { id }, {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
      } catch (error) {
        console.error('Error toggling favorite:', error)
      }
    },
    async updateTitle(id, newTitle) {
      const index = this.tasks.findIndex((t) => t.id === id)
      this.tasks[index].title = newTitle
      try {
        await axios.put('http://localhost:3003/task/update-title', { id, newTitle }, {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
      } catch (error) {
        console.error('Error updating title:', error)
      }
    }
  }
})
