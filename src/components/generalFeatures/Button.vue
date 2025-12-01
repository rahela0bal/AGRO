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
.button-principal {
  background-color: rgb(21, 113, 18);      /* main color */
  border: 2px solid rgb(73, 48, 6);       /* border */
  color: white;                            /* text color */
  cursor: pointer;                         /* pointer on hover */
  padding: 0.75rem 1.5rem;                 /* vertical + horizontal padding */
  font-size: 1rem;                         /* readable text */
  font-weight: 600;                        /* slightly bold */
  border-radius: 0.5rem;                   /* rounded corners */
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);  /* subtle shadow */
  transition: all 0.3s ease;               /* smooth hover transition */
}

.button-principal:hover {
  background-color: rgb(34, 153, 36);      /* slightly brighter on hover */
  transform: translateY(-2px);             /* lift effect */
  box-shadow: 0 6px 12px rgba(0,0,0,0.15); /* stronger shadow */
}
</style>