<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Titlul from '../generalFeatures/Titlul.vue';
import Button from '../generalFeatures/Button.vue';

const router = useRouter();

const telefon = ref('');
const password = ref('');

function linkSpreSignIn() {
  return router.push('/signIn');
}
</script>

<template>
  <div class="incadrare">
    <Titlul text="Good to see you again" />
    
    <eticheta>Nr de telefon</eticheta>
    <input v-model="telefon" type="number" /> <!-- legatura -->
    
    <eticheta>Password</eticheta>
    <input v-model="password" type="password" />
    
    <Button textButton="Sign in" @click="linkSpreSignIn" />
    
    <a class="forgot">I forgot my password</a>
  </div>
</template>

<style>
.incadrare {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px;
  border: 2px solid black;
}

eticheta {
display: block; /* forteaza linie noua  */
  margin-top: 30px;
  margin-bottom: 8px;
}
input {
  width: 100%;
  padding: 12px;
  border: 2px solid black;
  box-sizing: border-box;
}

.forgot {
  display: block;
  margin-top: 20px;
  color: blue;
  text-decoration: underline;
}
</style>