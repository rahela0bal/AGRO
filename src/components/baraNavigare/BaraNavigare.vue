<script setup> 
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>

<header>
  <h1 class="text-3xl font-bold underline"></h1>
        <nav>
            <RouterLink to="/fermaMea">Ferma Mea</RouterLink>
            <RouterLink to="/conversatii">Conversatii</RouterLink>
            <RouterLink to="/inteligentaArtificiala">AI</RouterLink>
            <RouterLink to="/IoT">Senzori</RouterLink>
            <RouterLink to="/meteo">Meteo</RouterLink>
            <RouterLink to="/vanzare">Vanzare</RouterLink>
            <RouterLink to="/cumparare">Cumparare</RouterLink>
            <RouterLink to="/contulMeu">Contul Meu</RouterLink>
            <RouterLink to="/despreNoi">Despre Noi</RouterLink>
            <RouterLink to="/setariCont">Setari Cont</RouterLink>

        </nav>
    </header>
    
</template>

<style>
@import "tailwindcss";

.btn-primary{
  background-color: #ace0ad; 
}
nav{
  display: flex; /* pune link-urile unul lângă altul */
  gap: 20px;
  text-decoration: underline;
  margin-left: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
}
nav a:hover{ /*inca nu merge*/
  color: #093320;
}

</style>