import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProprietatiStore = defineStore('proprietati', () => {
  
  const proprietati = ref([
    {
      id: 1,
      denumire: 'Lot Principal',
      judet: 'Bihor',
      localitate: 'Oradea',
      suprafata: 15.5,
      hasCamera: true
    },
    {
      id: 2,
      denumire: 'Lot Secundar',
      judet: 'Bihor',
      localitate: 'Salonta',
      suprafata: 8.2,
      hasCamera: false
    }
  ])

  //const loading = ref(false)

  const totalProprietati = computed(() => proprietati.value.length)

  const totalSuprafata = computed(() => {
    return proprietati.value.reduce((sum, p) => sum + p.suprafata, 0)
  })

  const proprietatiCuCamera = computed(() => {
    return proprietati.value.filter((p) => p.hasCamera)
  })

  // ACTIONS 
  function addProprietate(proprietate) {
    const newProp = {
      id: Date.now(),
      ...proprietate
    }
    proprietati.value.push(newProp)
  }

  function deleteProprietate(id) {
    proprietati.value = proprietati.value.filter((p) => p.id !== id)
  }

  // accesibil
  return {
    // State
    proprietati,
    loading,
    // Getters
    totalProprietati,
    totalSuprafata,
    proprietatiCuCamera,
    // Actions
    addProprietate,
    deleteProprietate
  }
})
