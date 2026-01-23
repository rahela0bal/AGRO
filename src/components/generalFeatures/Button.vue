<script setup>
defineProps({
  textButton: String
})
const emit = defineEmits(['click'])
</script>

<template>
  <button class="buton-principal" @click="emit('click')">
    {{ textButton }}
  </button>
</template>

<style scoped>
.buton-principal {
  background-color: rgb(21, 113, 18);
  border: 2px solid rgb(73, 48, 6);
  color: white;
  cursor: pointer;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  margin: 10px 5px;
  display: inline-block;
}

.buton-principal:hover {
  background-color: rgb(34, 153, 36);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
</style>
