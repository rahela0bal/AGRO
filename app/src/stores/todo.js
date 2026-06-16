import axios from '@/api'
import { defineStore } from 'pinia'
import { useAuth } from '@/stores/auth'

export const useTodo = defineStore('todo', {
  state: () => ({
    todos: []
  }),
  actions: {
    async getTodos() {
      try {
        const response = await axios.get('http://localhost:3003/todo/get-all', {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
        this.todos = response.data
      } catch (error) {
        console.error('Error fetching todos:', error)
      }
    },
    async getTodosByDate(date) {
      try {
        const response = await axios.get(`http://localhost:3003/todo/get-by-date/${date}`, {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
        this.todos = response.data
      } catch (error) {
        console.error('Error fetching todos by date:', error)
      }
    },
    async addTodo(title, date) {
      try {
        const response = await axios.post('http://localhost:3003/todo/add', { title, date }, {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
        this.todos.push(response.data)
      } catch (error) {
        console.error('Error adding todo:', error)
      }
    },
    async toggleDone(id) {
      const index = this.todos.findIndex((t) => t.id === id)
      this.todos[index].done = !this.todos[index].done
      try {
        await axios.put('http://localhost:3003/todo/update-done', { id }, {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
      } catch (error) {
        console.error('Error toggling done:', error)
      }
    },
    async removeTodo(id) {
      this.todos.splice(this.todos.findIndex((t) => t.id === id), 1)
      try {
        await axios.delete('http://localhost:3003/todo/delete', {
          headers: { Authorization: `Bearer ${useAuth().token}` },
          data: { id }
        })
      } catch (error) {
        console.error('Error removing todo:', error)
      }
    },
    async removeAllDone() {
      this.todos = this.todos.filter((t) => !t.done)
      try {
        await axios.delete('http://localhost:3003/todo/delete-all-done', {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
      } catch (error) {
        console.error('Error removing done todos:', error)
      }
    }
  }
})
