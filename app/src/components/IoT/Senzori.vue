<script setup>
import Titlul from '../generalFeatures/Titlul.vue'
import { useWsStore } from '@/stores/wsStore'

const wsStore = useWsStore()

const config = {
  hranire: {
    mesaj: 'Este timpul să hrănești animalele!'
  },
  adapare: {
    mesaj: 'Este timpul să adăpi animalele!'
  },
  vaccin: {
    mesaj: 'Este timpul pentru vaccinare!'
  },
  test: {
    mesaj: 'Test senzor - funcționează!'
  }
}

function formatTime(ms, showDays = false) {
  if (showDays) {
    const zile = Math.floor(ms / (24 * 60 * 60 * 1000))
    const ore = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
    const minute = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000))
    const secunde = Math.floor((ms % (60 * 1000)) / 1000)
    return `${String(zile).padStart(2, '0')}:${String(ore).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(secunde).padStart(2, '0')}`
  }
  const ore = Math.floor(ms / (60 * 60 * 1000))
  const minute = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000))
  const secunde = Math.floor((ms % (60 * 1000)) / 1000)
  return `${String(ore).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(secunde).padStart(2, '0')}`
}

</script>

<template>
  <div class="senzori-container">
    <div class="header">
      <h1>Dispozitive / Senzori</h1>
    </div>

    <div class="carduri">
      <div
        v-for="(senzor, key) in wsStore.senzori"
        :key="key"
        class="card"
        :class="{ 'card-activ': senzor.active }"
      >
        <h2 class="senzor-label">{{ senzor.label }}</h2>

        <div class="countdown" :class="{ 'countdown-activ': senzor.active }">
          {{ formatTime(senzor.timeLeft, key === 'vaccin') }}
        </div>

        <p v-if="senzor.active" class="mesaj-alerta">
          {{ config[key].mesaj }}
        </p>

        <button
          v-if="senzor.active"
          class="btn-facut"
          @click="wsStore.resetSenzor(key)"
        >
          ✓ Am făcut
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.senzori-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 2rem;
  color: #2c3e50;
}

.carduri {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  transition: background 0.4s, box-shadow 0.4s;
}

.card-activ {
  background: #fff0f0;
  box-shadow: 0 4px 16px rgba(220, 38, 38, 0.2);
  border: 1px solid #fca5a5;
}

.senzor-label {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  text-align: center;
  margin: 0;
}

.countdown {
  font-size: 2.2rem;
  font-weight: bold;
  color: #4CAF50;
  font-variant-numeric: tabular-nums;
  letter-spacing: 2px;
}

.countdown-activ {
  color: #dc2626;
}

.mesaj-alerta {
  font-size: 0.95rem;
  color: #dc2626;
  font-weight: 500;
  text-align: center;
  margin: 0;
}

.btn-facut {
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-facut:hover {
  background: #43A047;
}
</style>
