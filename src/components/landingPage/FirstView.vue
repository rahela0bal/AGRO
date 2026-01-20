<script setup>
import landingImage from '@/assets/images/landing-image.jpg';
import Button from '../generalFeatures/Button.vue';
import Logo from '../generalFeatures/Logo.vue';

const linkSpreSignIn = () => {
  // click hendreaza(nu stu daca exista) la pagina de sign in
    window.location.href = '/signIn';
};
</script>

<template>
  <!-- fundal -->
  <div 
    class="landing-background relative flex flex-col items-center justify-center text-center text-white"
    :style="{ backgroundImage: `url(${landingImage})` }"
  >
    <!-- buton din dreapta  -->
    <div class="absolute top-4 right-4">
      <Button 
        textButton="Sign in" 
        @click="linkSpreSignIn"
        class="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
      />
    </div>
    <div class="absolute top-4 left-4">
        <Logo />
    </div>

    <div class="text-center">
      <h1 class="text-4xl font-bold text-green-800 mb-4">Welcome to FarmHub</h1>
      <p class="text-lg text-gray-700">Your trusted partner in modern agriculture.</p>
    </div>

  </div>

  
</template>

<style>
.landing-background {
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
}
</style>
