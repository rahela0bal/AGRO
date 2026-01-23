import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAnimaleStore = defineStore('animale', () => {
  const animale = ref([
    { id: 1, categorie: 'Vaci', cantitate: 15, obiectiv: 'Lapte' },
    { id: 2, categorie: 'Găini', cantitate: 50, obiectiv: 'Ouă' }
  ])

  // Getters
  const totalAnimale = computed(() => {
    return animale.value.reduce((sum, a) => sum + a.cantitate, 0)
  })

  const categorii = computed(() => {
    return [...new Set(animale.value.map((a) => a.categorie))]
  })

  // Actions
  function addAnimal(animal) {
    animale.value.push({ id: Date.now(), ...animal })
  }

  return { animale, totalAnimale, categorii, addAnimal }
})
