<script setup>
defineProps({
  textButton: String,
})
const emit = defineEmits(['click'])
</script>

<template>
  <button @click="emit('click')" class="buton-principal">
    {{ textButton }}
  </button>
</template>

<style>
.buton-principal {
  background-color: beige;
  border: 2px solid black;
  cursor: pointer;
}
</style>