import axios from '@/api'
import { defineStore } from 'pinia'
import { useAuth } from '@/stores/auth'

export const useLotSeminteDb = defineStore('lotSeminteDb', {
  state: () => ({
    loturi: []
  }),
  actions: {
    async getLoturi() {
      try {
        const response = await axios.get('http://localhost:3003/lot-seminte/get-all', {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
        this.loturi = response.data
      } catch (error) {
        console.error('Error fetching loturi:', error)
      }
    },
    async addLot(numeSoi, cantitateKg, DepozitId) {
      try {
        const response = await axios.post('http://localhost:3003/lot-seminte/add', {
          numeSoi, cantitateKg, DepozitId
        }, {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
        this.loturi.push(response.data)
      } catch (error) {
        console.error('Error adding lot:', error)
      }
    },
    async removeLot(id) {
      this.loturi.splice(this.loturi.findIndex((l) => l.id === id), 1)
      try {
        await axios.delete('http://localhost:3003/lot-seminte/delete', {
          headers: { Authorization: `Bearer ${useAuth().token}` },
          data: { id }
        })
      } catch (error) {
        console.error('Error removing lot:', error)
      }
    },
    async updateNumeSoi(id, newNumeSoi) {
      const index = this.loturi.findIndex((l) => l.id === id)
      this.loturi[index].numeSoi = newNumeSoi
      try {
        await axios.put('http://localhost:3003/lot-seminte/update-numeSoi', { id, newNumeSoi }, {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
      } catch (error) {
        console.error('Error update nume soi:', error)
      }
    },
    async updateCantitateKg(id, newCantitateKg) {
      const index = this.loturi.findIndex((l) => l.id === id)
      this.loturi[index].cantitateKg = newCantitateKg
      try {
        await axios.put('http://localhost:3003/lot-seminte/update-cantitateKg', { id, newCantitateKg }, {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
      } catch (error) {
        console.error('Error update cantitate:', error)
      }
    },
    async toggleBio(id) {
      const index = this.loturi.findIndex((l) => l.id === id)
      this.loturi[index].bio = !this.loturi[index].bio
      try {
        await axios.put('http://localhost:3003/lot-seminte/update-bio', { id }, {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
      } catch (error) {
        console.error('Error toggle bio:', error)
      }
    }
  }
})
