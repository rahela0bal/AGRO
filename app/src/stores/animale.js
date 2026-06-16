import axios from '@/api'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useAuth } from '@/stores/auth'

export const useAnimaleStore = defineStore('animale', () => {
  const fermieri = ref([])

  const animale = computed(() =>
    fermieri.value.flatMap((f) =>
      (f.Animals || []).map((a) => ({ ...a, fermierNume: f.nume }))
    )
  )

  const totalAnimale = computed(() => animale.value.length)

  const categorii = computed(() =>
    [...new Set(animale.value.map((a) => a.specie).filter(Boolean))]
  )

  async function fetchAnimale() {
    try {
      const response = await axios.get('http://localhost:3003/fermier/get-all', {
        headers: { Authorization: `Bearer ${useAuth().token}` }
      })
      fermieri.value = response.data
    } catch (error) {
      console.error('Error fetching animale:', error)
    }
  }

  return { animale, fermieri, totalAnimale, categorii, fetchAnimale }
})
