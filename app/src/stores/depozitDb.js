import axios from '@/api'
import { defineStore } from 'pinia'
import { useAuth } from '@/stores/auth'

export const useDepozitDb = defineStore('depozitDb', {
  state: () => ({
    depozite: []
  }),
  actions: {
    async getDepozite() {
      try {
        const response = await axios.get('http://localhost:3003/depozit/get-all', {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
        this.depozite = response.data
      } catch (error) {
        console.error('Error fetching depozite:', error)
      }
    },
    async addDepozit(nume, locatie) {
      try {
        const response = await axios.post('http://localhost:3003/depozit/add', { nume, locatie }, {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
        this.depozite.push(response.data)
      } catch (error) {
        console.error('Error adding depozit:', error)
      }
    },
    async addDepozitCuLot(payload) {
      try {
        const response = await axios.post('http://localhost:3003/depozit/add-cu-lot', payload, {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
        this.depozite.push(response.data)
      } catch (error) {
        console.error('Error adding depozit cu lot:', error)
      }
    },
    async removeDepozit(id) {
      this.depozite.splice(this.depozite.findIndex((d) => d.id === id), 1)
      try {
        await axios.delete('http://localhost:3003/depozit/delete', {
          headers: { Authorization: `Bearer ${useAuth().token}` },
          data: { id }
        })
      } catch (error) {
        console.error('Error removing depozit:', error)
      }
    },
    async updateNume(id, newNume) {
      const index = this.depozite.findIndex((d) => d.id === id)
      this.depozite[index].nume = newNume
      try {
        await axios.put('http://localhost:3003/depozit/update-nume', { id, newNume }, {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
      } catch (error) {
        console.error('Error update nume depozit:', error)
      }
    },
    async updateLocatie(id, newLocatie) {
      const index = this.depozite.findIndex((d) => d.id === id)
      this.depozite[index].locatie = newLocatie
      try {
        await axios.put('http://localhost:3003/depozit/update-locatie', { id, newLocatie }, {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
      } catch (error) {
        console.error('Error update locatie:', error)
      }
    },
    async toggleInchis(id) {
      const index = this.depozite.findIndex((d) => d.id === id)
      this.depozite[index].inchis = !this.depozite[index].inchis
      try {
        await axios.put('http://localhost:3003/depozit/update-inchis', { id }, {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
      } catch (error) {
        console.error('Error toggle inchis:', error)
      }
    }
  }
})
