<script setup>
import Button from '../generalFeatures/Button.vue';
import Titlul from '../generalFeatures/Titlul.vue';
import ClickToLink from '../generalFeatures/ClickToLink.vue';


</script>

<template>
<div class="p-8">
<Titlul text="Ferma mea" />
<ClickToLink textButton="Animalele Mele" linkPath="/animaleleMele" />
<ClickToLink textButton="Proprietatile Mele" linkPath="/proprietatileMele" />
<ClickToLink textButton="Postarile Mele" linkPath="/posarileMele" />
<ClickToLink textButton="Calendarul Meu" linkPath="/calendarulMeu" />
<ClickToLink textButton="Furnizorii Mei" linkPath="/furnizoriiMei" />

</div>
</template>