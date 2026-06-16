<script setup>
import { RouterView, useRoute } from 'vue-router'
import { onMounted } from 'vue'
import BaraNavigare from './components/baraNavigare/BaraNavigare.vue'
import { useWsStore } from '@/stores/wsStore'

const route = useRoute()
const wsStore = useWsStore()

onMounted(() => {
  wsStore.startAll()
})
</script>

<template>
  <BaraNavigare v-if="route.path !== '/firstView'" />
  <RouterView />
</template>

<style>
@import 'tailwindcss';
</style>
