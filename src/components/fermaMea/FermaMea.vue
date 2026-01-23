<script setup>
import Button from '../generalFeatures/Button.vue'
import Titlul from '../generalFeatures/Titlul.vue'
import ClickToLink from '../generalFeatures/ClickToLink.vue'
</script>

<template>
  <div class="p-8">
    <Titlul text="Ferma mea" />
    <ClickToLink text-button="Animalele Mele" link-path="/animaleleMele" />
    <ClickToLink text-button="Proprietatile Mele" link-path="/proprietatileMele" />
    <ClickToLink text-button="Postarile Mele" link-path="/postarileMele" />
    <ClickToLink text-button="Calendarul Meu" link-path="/calendarulMeu" />
    <ClickToLink text-button="Furnizorii Mei" link-path="/furnizoriiMei" />
    <ClickToLink text-button="Sign In" link-path="/signIn" />
  </div>
</template>
