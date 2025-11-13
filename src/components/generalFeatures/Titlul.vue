<script setup>
defineProps({
  text: String
})
</script>

<template>
  <h1 class="text-3xl font-bold text-center">
    {{ text }}
  </h1>
</template>