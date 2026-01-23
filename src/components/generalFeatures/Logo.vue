<script setup>
import logoImage from '@/assets/images/logo.png'
</script>
<template>
  <header class="w-full flex items-center justify-start p-4 bg-white shadow-md">
    <img :src="logoImage" alt="Logo" class="h-10 w-10 mr-2" />
    <span class="text-xl font-bold text-green-800">FarmHub</span>
  </header>
</template>
