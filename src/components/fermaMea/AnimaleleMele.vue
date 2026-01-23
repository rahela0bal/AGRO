<script setup>
import { ref, computed, watch } from 'vue'
import { useAnimaleStore } from '@/stores/animale'
import AddButton from '@/components/common/AddButton.vue'
import StatCard from '@/components/common/StatCard.vue'
import AddAnimalForm from './animale/AddAnimalForm.vue'
import AnimaleList from './animale/AnimaleList.vue'

const animaleStore = useAnimaleStore()

const showAddForm = ref(false)
const selectedCategorie = ref('')
const newAnimal = ref({
  categorie: '',
  cantitate: 0,
  obiectiv: ''
})

const totalAnimale = computed(() => animaleStore.totalAnimale)
const numarCategorii = computed(() => animaleStore.categorii.length)
const categorii = computed(() => animaleStore.categorii)
const animaleFiltrate = computed(() => {
  if (!selectedCategorie.value) return animaleStore.animale
  return animaleStore.animale.filter((a) => a.categorie === selectedCategorie.value)
})

watch(selectedCategorie, (newCat, oldCat) => {
  console.log(`Categorie changed from "${oldCat}" to "${newCat}"`)
  console.log(`Filtered animals: ${animaleFiltrate.value.length}`)
})

watch(showAddForm, (isOpen) => {
  console.log(`Add form is now: ${isOpen ? 'OPEN' : 'CLOSED'}`)
  if (isOpen) {
    newAnimal.value = { categorie: '', cantitate: 0, obiectiv: '' }
  }
})

function addAnimal(animalData) {
  if (!animalData.categorie || animalData.cantitate <= 0) {
    alert('Completează toate câmpurile!')
    return
  }

  animaleStore.addAnimal(animalData)
  showAddForm.value = false
  alert('Animal adăugat cu succes!')
}
</script>

<template>
  <div class="animale-container">
    <div class="header">
      <h1>Animalele Mele</h1>
      <AddButton
        :text="showAddForm ? '✕ Închide' : '+ Adaugă Animal'"
        @click="showAddForm = !showAddForm"
      />
    </div>

    <div class="stats">
      <StatCard
        title="Total Animale"
        :value="totalAnimale"
        gradient="linear-gradient(135deg, #11998e 0%, #38ef7d 100%)"
      />
      <StatCard
        title="Categorii"
        :value="numarCategorii"
        gradient="linear-gradient(135deg, #11998e 0%, #38ef7d 100%)"
      />
    </div>

    <AddAnimalForm v-if="showAddForm" :new-animal="newAnimal" @save="addAnimal" />

    <div class="filter-box">
      <label>Filtrează după categorie:</label>
      <select v-model="selectedCategorie" class="select">
        <option value="">Toate</option>
        <option v-for="cat in categorii" :key="cat" :value="cat">
          {{ cat }}
        </option>
      </select>
    </div>

    <AnimaleList :animale="animaleFiltrate" />
  </div>
</template>

<style scoped>
.animale-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 2rem;
  color: #2c3e50;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.filter-box {
  margin-bottom: 20px;
}

.filter-box label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
}

.select {
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
}
</style>
