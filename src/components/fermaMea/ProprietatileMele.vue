<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useProprietatiStore } from '@/stores/proprietati'
import AddButton from '@/components/common/AddButton.vue'
import SearchBox from '@/components/common/SearchBox.vue'
import ProprietatiStats from './proprietati/ProprietatiStats.vue'
import ProprietatiList from './proprietati/ProprietatiList.vue'

const router = useRouter()
const proprietatiStore = useProprietatiStore()

const searchQuery = ref('')

const totalProprietati = computed(() => proprietatiStore.totalProprietati)
const suprafataTotalaFormatata = computed(() => `${proprietatiStore.totalSuprafata.toFixed(1)} ha`)
const numarCuCamera = computed(() => proprietatiStore.proprietatiCuCamera.length)
const proprietatiFiltrate = computed(() => {
  if (!searchQuery.value) return proprietatiStore.proprietati

  const query = searchQuery.value.toLowerCase()
  return proprietatiStore.proprietati.filter(
    (p) =>
      p.denumire.toLowerCase().includes(query) ||
      p.localitate.toLowerCase().includes(query) ||
      p.judet.toLowerCase().includes(query)
  )
})

watch(searchQuery, (newValue) => {
  console.log('Search query changed to:', newValue)
  console.log('Found properties:', proprietatiFiltrate.value.length)
})

function navigateToAdd() {
  router.push('/adaugaProprietate')
}

function handleDelete(id) {
  if (confirm('Sigur vrei să ștergi această proprietate?')) {
    proprietatiStore.deleteProprietate(id)
  }
}
</script>

<template>
  <div class="proprietati-container">
    <div class="header">
      <h1>Proprietățile Mele</h1>
      <AddButton text="+ Adaugă Proprietate" @click="navigateToAdd" />
    </div>

    <ProprietatiStats
      :total-proprietati="totalProprietati"
      :suprafata-totala="suprafataTotalaFormatata"
      :numar-cu-camera="numarCuCamera"
    />

    <SearchBox v-model="searchQuery" placeholder="Caută proprietate..." />

    <ProprietatiList :proprietati="proprietatiFiltrate" @delete="handleDelete" />
  </div>
</template>

<style scoped>
.proprietati-container {
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
  color: #e1e6eb;
}
</style>
