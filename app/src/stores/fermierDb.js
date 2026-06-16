import axios from '@/api'
import { defineStore } from 'pinia'
import { useAuth } from '@/stores/auth'

export const useFermierDb = defineStore('fermierDb', {
  state: () => ({
    fermieri: []
  }),
  actions: {
    async getFermieri() {
      try {
        const response = await axios.get('http://localhost:3003/fermier/get-all', {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
        this.fermieri = response.data
      } catch (error) {
        console.error('Error fetching fermieri:', error)
      }
    },
    async addFermier(nume, email) {
      try {
        const response = await axios.post('http://localhost:3003/fermier/add', { nume, email }, {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
        this.fermieri.push({ ...response.data, Animals: [] })
      } catch (error) {
        console.error('Error adding fermier:', error)
      }
    },
    async removeFermier(id) {
      this.fermieri.splice(this.fermieri.findIndex((f) => f.id === id), 1)
      try {
        await axios.delete('http://localhost:3003/fermier/delete', {
          headers: { Authorization: `Bearer ${useAuth().token}` },
          data: { id }
        })
      } catch (error) {
        console.error('Error removing fermier:', error)
      }
    },
    async updateNume(id, newNume) {
      const index = this.fermieri.findIndex((f) => f.id === id)
      this.fermieri[index].nume = newNume
      try {
        await axios.put('http://localhost:3003/fermier/update-nume', { id, newNume }, {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
      } catch (error) {
        console.error('Error updating nume fermier:', error)
      }
    },
    async updateEmail(id, newEmail) {
      const index = this.fermieri.findIndex((f) => f.id === id)
      this.fermieri[index].email = newEmail
      try {
        await axios.put('http://localhost:3003/fermier/update-email', { id, newEmail }, {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
      } catch (error) {
        console.error('Error updating email fermier:', error)
      }
    },
    async addAnimal(fermierId, nume, specie, varsta) {
      try {
        const response = await axios.post('http://localhost:3003/fermier/add-animal', {
          fermierId, nume, specie, varsta
        }, {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
        const index = this.fermieri.findIndex((f) => f.id === fermierId)
        if (!this.fermieri[index].Animals) this.fermieri[index].Animals = []
        this.fermieri[index].Animals.push(response.data)
      } catch (error) {
        console.error('Error adding animal:', error)
      }
    }
  }
})
