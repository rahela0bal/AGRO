import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useEvenimenteStore = defineStore('evenimente', () => {
  const evenimente = ref([
    { id: 1, tip: 'Control', descriere: 'Verificare animale', data: '2026-01-25' },
    { id: 2, tip: 'Aprovizionare', descriere: 'Cumpărare furaje', data: '2026-01-28' }
  ])

  // Getters
  const totalEvenimente = computed(() => evenimente.value.length)

  const evenimenteViitoare = computed(() => {
    const acum = new Date().toISOString().split('T')[0]
    return evenimente.value.filter((e) => e.data >= acum)
  })

  // Actions
  function addEveniment(eveniment) {
    evenimente.value.push({ id: Date.now(), ...eveniment })
  }

  return { evenimente, totalEvenimente, evenimenteViitoare, addEveniment }
})
