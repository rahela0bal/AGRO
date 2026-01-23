<script setup>
import ProprietateCard from './ProprietateCard.vue'

defineProps({
  proprietati: { type: Array, required: true }
})

const emit = defineEmits(['delete'])
</script>

<template>
  <div>
    <div v-if="proprietati.length > 0" class="proprietati-grid">
      <ProprietateCard
        v-for="prop in proprietati"
        :key="prop.id"
        :proprietate="prop"
        @delete="emit('delete', $event)"
      />
    </div>

    <div v-else class="empty-state">
      <i class="bi bi-inbox" style="font-size: 3rem; color: #ccc" />
      <p>Nu s-au găsit proprietăți.</p>
    </div>
  </div>
</template>

<style scoped>
.proprietati-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 1.2rem;
}
</style>
