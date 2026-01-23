<template>
  <button class="btn-add" @click="$emit('click')">
    {{ text }}
  </button>
</template>

<script setup>
defineProps({
  text: { type: String, default: '+ Adaugă' }
})

defineEmits(['click'])
</script>

<style scoped>
.btn-add {
  background: #4caf50;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-add:hover {
  background: #45a049;
}
</style>
