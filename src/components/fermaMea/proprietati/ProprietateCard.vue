<script setup>
defineProps({
  proprietate: { type: Object, required: true }
})

const emit = defineEmits(['delete'])
</script>

<template>
  <div class="prop-card">
    <div class="card-header">
      <h3>{{ proprietate.denumire }}</h3>
      <i v-if="proprietate.hasCamera" class="bi bi-camera-video-fill icon-camera" />
    </div>
    <div class="card-body">
      <p>
        <i class="bi bi-geo-alt-fill" />
        <strong>Locație:</strong> {{ proprietate.localitate }}, {{ proprietate.judet }}
      </p>
      <p>
        <i class="bi bi-rulers" />
        <strong>Suprafață:</strong> {{ proprietate.suprafata }} ha
      </p>
    </div>
    <div class="card-actions">
      <button class="btn-delete" @click="emit('delete', proprietate.id)">
        <i class="bi bi-trash" /> Șterge
      </button>
    </div>
  </div>
</template>

<style scoped>
.prop-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.prop-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.card-header h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.3rem;
}

.icon-camera {
  font-size: 1.5rem;
  color: #4caf50;
}

.card-body p {
  margin: 8px 0;
  color: #555;
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-body i {
  color: #667eea;
}

.card-actions {
  margin-top: 15px;
}

.btn-delete {
  background: #f44336;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
  transition: background 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-delete:hover {
  background: #da190b;
}
</style>
