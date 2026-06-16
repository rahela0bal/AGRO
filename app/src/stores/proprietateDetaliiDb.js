import axios from '@/api'
import { defineStore } from 'pinia'
import { useAuth } from '@/stores/auth'

export const useProprietateDetaliiDb = defineStore('proprietateDetaliiDb', {
  state: () => ({
    detalii: []
  }),
  actions: {
    async getDetalii() {
      try {
        const response = await axios.get('http://localhost:3003/proprietate-detalii/get-all', {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
        this.detalii = response.data
      } catch (error) {
        console.error('Error fetching detalii:', error)
      }
    },
    async addDetaliu(payload) {
      try {
        const response = await axios.post('http://localhost:3003/proprietate-detalii/add', payload, {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
        this.detalii.push(response.data)
      } catch (error) {
        console.error('Error adding detaliu:', error)
      }
    },
    async removeDetaliu(id) {
      this.detalii.splice(this.detalii.findIndex((d) => d.id === id), 1)
      try {
        await axios.delete('http://localhost:3003/proprietate-detalii/delete', {
          headers: { Authorization: `Bearer ${useAuth().token}` },
          data: { id }
        })
      } catch (error) {
        console.error('Error removing detaliu:', error)
      }
    },
    async updateSuprafataHa(id, newSuprafataHa) {
      const index = this.detalii.findIndex((d) => d.id === id)
      this.detalii[index].suprafataHa = newSuprafataHa
      try {
        await axios.put('http://localhost:3003/proprietate-detalii/update-suprafataHa', { id, newSuprafataHa }, {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
      } catch (error) {
        console.error('Error update suprafata:', error)
      }
    },
    async toggleIrigata(id) {
      const index = this.detalii.findIndex((d) => d.id === id)
      this.detalii[index].irigata = !this.detalii[index].irigata
      try {
        await axios.put('http://localhost:3003/proprietate-detalii/update-irigata', { id }, {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
      } catch (error) {
        console.error('Error toggle irigata:', error)
      }
    },
    async updateComentariu(id, newComentariu) {
      const index = this.detalii.findIndex((d) => d.id === id)
      this.detalii[index].comentariu = newComentariu
      try {
        await axios.put('http://localhost:3003/proprietate-detalii/update-comentariu', { id, newComentariu }, {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
      } catch (error) {
        console.error('Error update comentariu:', error)
      }
    }
  }
})
