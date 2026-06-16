import axios from '@/api'
import { defineStore } from 'pinia'
import { useAuth } from '@/stores/auth'

export const useCategorieDb = defineStore('categorieDb', {
  state: () => ({
    categorii: []
  }),
  actions: {
    async getCategorii() {
      try {
        const response = await axios.get('http://localhost:3003/reminder/get-categorii', {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
        this.categorii = response.data
      } catch (error) {
        console.error('Error fetching categorii:', error)
      }
    },
    async addCategorie(reminderId, nume, culoare) {
      try {
        const response = await axios.post('http://localhost:3003/reminder/add-categorie', {
          reminderId, nume, culoare
        }, {
          headers: { Authorization: `Bearer ${useAuth().token}` }
        })
        this.categorii.push(response.data)
      } catch (error) {
        console.error('Error adding categorie:', error)
      }
    }
  }
})
