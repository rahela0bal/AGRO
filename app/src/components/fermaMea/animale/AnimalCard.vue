<script setup>
defineProps({
  animal: { type: Object, required: true }
})
</script>

<template>
  <div class="animal-card">
    <div class="card-icon">
      <i class="bi bi-box-seam" />
    </div>
    <h3>{{ animal.categorie }}</h3>
    <p><strong>Cantitate:</strong> {{ animal.cantitate }}</p>
    <p><strong>Obiectiv:</strong> {{ animal.obiectiv }}</p>
  </div>
</template>

<style scoped>
.animal-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.animal-card:hover {
  transform: translateY(-4px);
}

.card-icon {
  margin-bottom: 10px;
}

.card-icon i {
  font-size: 3rem;
  color: #11998e;
}

.animal-card h3 {
  color: #2c3e50;
  margin: 10px 0;
}

.animal-card p {
  margin: 5px 0;
  color: #555;
}
</style>
