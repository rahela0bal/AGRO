<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  newAnimal: { type: Object, required: true }
})

const emit = defineEmits(['save'])

// Creăm o copie locală pentru a evita mutarea prop-ului
const localAnimal = ref({ ...props.newAnimal })

// Sincronizăm când se schimbă prop-ul din exterior
watch(
  () => props.newAnimal,
  (newVal) => {
    localAnimal.value = { ...newVal }
  },
  { deep: true }
)

function handleSave() {
  emit('save', localAnimal.value)
}
</script>

<template>
  <div class="add-form">
    <h2>Adaugă Animal Nou</h2>
    <input v-model="localAnimal.categorie" placeholder="Categorie (ex: Vaci)" class="input" />
    <input
      v-model.number="localAnimal.cantitate"
      type="number"
      placeholder="Cantitate"
      class="input"
    />
    <input v-model="localAnimal.obiectiv" placeholder="Obiectiv (ex: Lapte)" class="input" />
    <button class="btn-save" @click="handleSave"><i class="bi bi-check-circle" /> Salvează</button>
  </div>
</template>

<style scoped>
.add-form {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 30px;
}

.add-form h2 {
  margin-top: 0;
}

.input {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
}

.btn-save {
  background: #4caf50;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
</style>
