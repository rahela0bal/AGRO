import axios from '@/api'
import { defineStore } from 'pinia'
import { useAuth } from '@/stores/auth'

export const useProprietateDb = defineStore('proprietateDb', {
  state: () => ({
    proprietati: []
  }),
  actions: {
    async getProprietati() {
      try {
        const response = await axios.get('http://localhost:3003/proprietate/get-all', {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
        this.proprietati = response.data
      } catch (error) {
        console.error('Error fetching proprietati:', error)
      }
    },
    async addProprietate(nume, localitate) {
      try {
        const response = await axios.post('http://localhost:3003/proprietate/add', { nume, localitate }, {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
        this.proprietati.push(response.data)
      } catch (error) {
        console.error('Error adding proprietate:', error)
      }
    },
    async addProprietateCuDetalii(payload) {
      try {
        const response = await axios.post('http://localhost:3003/proprietate/add-cu-detalii', payload, {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
        this.proprietati.push(response.data)
      } catch (error) {
        console.error('Error adding proprietate cu detalii:', error)
      }
    },
    async removeProprietate(id) {
      this.proprietati.splice(this.proprietati.findIndex((p) => p.id === id), 1)
      try {
        await axios.delete('http://localhost:3003/proprietate/delete', {
          headers: { Authorization: `Bearer ${useAuth().token}` },
          data: { id }
        })
      } catch (error) {
        console.error('Error removing proprietate:', error)
      }
    },
    async updateNume(id, newNume) {
      const index = this.proprietati.findIndex((p) => p.id === id)
      this.proprietati[index].nume = newNume
      try {
        await axios.put('http://localhost:3003/proprietate/update-nume', { id, newNume }, {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
      } catch (error) {
        console.error('Error update nume:', error)
      }
    },
    async updateLocalitate(id, newLocalitate) {
      const index = this.proprietati.findIndex((p) => p.id === id)
      this.proprietati[index].localitate = newLocalitate
      try {
        await axios.put('http://localhost:3003/proprietate/update-localitate', { id, newLocalitate }, {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
      } catch (error) {
        console.error('Error update localitate:', error)
      }
    },
    async toggleActiv(id) {
      const index = this.proprietati.findIndex((p) => p.id === id)
      this.proprietati[index].activ = !this.proprietati[index].activ
      try {
        await axios.put('http://localhost:3003/proprietate/update-activ', { id }, {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
      } catch (error) {
        console.error('Error toggle activ:', error)
      }
    }
  }
})
