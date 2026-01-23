import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFurnizoriStore = defineStore('furnizori', () => {
  const furnizori = ref([
    { id: 1, nume: 'AgroSem', tipProduse: 'Semințe', localitate: 'Oradea' },
    { id: 2, nume: 'FertilPlus', tipProduse: 'Îngrășăminte', localitate: 'Cluj' }
  ])

  // Getters
  const totalFurnizori = computed(() => furnizori.value.length)

  const furnizoriByLocalitate = computed(() => {
    return furnizori.value.reduce((acc, f) => {
      if (!acc[f.localitate]) acc[f.localitate] = []
      acc[f.localitate].push(f)
      return acc
    }, {})
  })

  // Actions
  function addFurnizor(furnizor) {
    furnizori.value.push({ id: Date.now(), ...furnizor })
  }

  return { furnizori, totalFurnizori, furnizoriByLocalitate, addFurnizor }
})
