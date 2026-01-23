<script setup>
import StatCard from '@/components/common/StatCard.vue'

defineProps({
  totalProprietati: { type: Number, required: true },
  suprafataTotala: { type: String, required: true },
  numarCuCamera: { type: Number, required: true }
})
</script>

<template>
  <div class="stats">
    <StatCard
      title="Total Proprietăți"
      :value="totalProprietati"
      gradient="linear-gradient(135deg, #11998e 0%, #38ef7d 100%)"
    />
    <StatCard
      title="Suprafață Totală"
      :value="suprafataTotala"
      gradient="linear-gradient(135deg, #11998e 0%, #38ef7d 100%)"
    />
    <StatCard
      title="Cu Cameră"
      :value="numarCuCamera"
      gradient="linear-gradient(135deg, #11998e 0%, #38ef7d 100%)"
    />
  </div>
</template>

<style scoped>
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}
</style>
