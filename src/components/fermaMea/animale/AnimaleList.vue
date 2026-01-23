<script setup>
import AnimalCard from './AnimalCard.vue'

defineProps({
  animale: { type: Array, required: true }
})
</script>

<template>
  <div>
    <div v-if="animale.length > 0" class="animale-grid">
      <AnimalCard v-for="animal in animale" :key="animal.id" :animal="animal" />
    </div>

    <div v-else class="empty-state">
      <i class="bi bi-inbox" />
      <p>Nu există animale în această categorie.</p>
    </div>
  </div>
</template>

<style scoped>
.animale-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 1.2rem;
}

.empty-state i {
  font-size: 3rem;
  color: #ccc;
  display: block;
  margin-bottom: 10px;
}
</style>
