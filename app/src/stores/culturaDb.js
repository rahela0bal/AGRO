import axios from '@/api'
import { defineStore } from 'pinia'
import { useAuth } from '@/stores/auth'

export const useCulturaDb = defineStore('culturaDb', {
  state: () => ({
    culturi: []
  }),
  actions: {
    async getCulturi() {
      try {
        const response = await axios.get('http://localhost:3003/cultura/get-all', {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
        this.culturi = response.data
      } catch (error) {
        console.error('Error fetching culturi:', error)
      }
    },
    async addCultura(nume, anPlantare, ProprietateId) {
      try {
        const response = await axios.post('http://localhost:3003/cultura/add', {
          nume, anPlantare, ProprietateId
        }, {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
        this.culturi.push(response.data)
      } catch (error) {
        console.error('Error adding cultura:', error)
      }
    },
    async removeCultura(id) {
      this.culturi.splice(this.culturi.findIndex((c) => c.id === id), 1)
      try {
        await axios.delete('http://localhost:3003/cultura/delete', {
          headers: { Authorization: `Bearer ${useAuth().token}` },
          data: { id }
        })
      } catch (error) {
        console.error('Error removing cultura:', error)
      }
    },
    async updateNume(id, newNume) {
      const index = this.culturi.findIndex((c) => c.id === id)
      this.culturi[index].nume = newNume
      try {
        await axios.put('http://localhost:3003/cultura/update-nume', { id, newNume }, {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
      } catch (error) {
        console.error('Error update nume cultura:', error)
      }
    },
    async updateAnPlantare(id, newAnPlantare) {
      const index = this.culturi.findIndex((c) => c.id === id)
      this.culturi[index].anPlantare = newAnPlantare
      try {
        await axios.put('http://localhost:3003/cultura/update-anPlantare', { id, newAnPlantare }, {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
      } catch (error) {
        console.error('Error update an:', error)
      }
    },
    async toggleRecoltata(id) {
      const index = this.culturi.findIndex((c) => c.id === id)
      this.culturi[index].recoltata = !this.culturi[index].recoltata
      try {
        await axios.put('http://localhost:3003/cultura/update-recoltata', { id }, {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
      } catch (error) {
        console.error('Error toggle recoltata:', error)
      }
    }
  }
})
