<script setup>
import { useRouter } from 'vue-router'
import Button from './Button.vue'

const router = useRouter()

const props = defineProps({
  textButton: String,
  linkPath: String
})

/*
e funstia veche 
function mergiLaAnimale() {
  router.push('/animaleleMele');
}
  */

function navigheaza() {
  router.push(props.linkPath)
}
</script>

<template>
  <!-- <Button textButton="Animalele Mele" @click="mergiLaAnimale" />.    asta era inainte -->

  <Button :text-button="textButton" @click="navigheaza" />
</template>
