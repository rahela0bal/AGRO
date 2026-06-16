<script setup>
import { onMounted, ref } from 'vue'
import { useFermierDb } from '@/stores/fermierDb'

const store = useFermierDb()

const newNume = ref('')
const newEmail = ref('')
const isAdding = ref(false)

const animalNume = ref('')
const animalSpecie = ref('')
const animalVarsta = ref(0)
const addingAnimalForId = ref(null)

onMounted(async () => {
  await store.getFermieri()
})

const addFermier = async () => {
  if (!newNume.value) return
  await store.addFermier(newNume.value, newEmail.value)
  newNume.value = ''
  newEmail.value = ''
  isAdding.value = false
}

const addAnimal = async (fermierId) => {
  if (!animalNume.value) return
  await store.addAnimal(fermierId, animalNume.value, animalSpecie.value, Number(animalVarsta.value))
  animalNume.value = ''
  animalSpecie.value = ''
  animalVarsta.value = 0
  addingAnimalForId.value = null
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-2xl mx-auto">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-green-800">
            🌾 Fermieri & Animale
          </h1>
          <p class="text-gray-500 mt-1">
            {{ store.fermieri.length }} fermieri
          </p>
        </div>
        <button
          class="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg transition"
          @click="isAdding = !isAdding"
        >
          + Fermier
        </button>
      </div>

      <!-- Formular adăugare fermier -->
      <div
        v-if="isAdding"
        class="bg-white rounded-xl shadow p-6 mb-6 border border-green-100"
      >
        <input
          v-model="newNume"
          type="text"
          placeholder="Nume fermier"
          class="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:border-green-500 text-gray-900"
          @keyup.enter="addFermier"
        >
        <input
          v-model="newEmail"
          type="email"
          placeholder="Email (opțional)"
          class="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:border-green-500 text-gray-900"
        >
        <div class="flex gap-2">
          <button
            class="flex-1 bg-green-700 text-white py-2 rounded-lg transition hover:bg-green-800"
            @click="addFermier"
          >
            Salvează
          </button>
          <button
            class="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg transition hover:bg-gray-300"
            @click="isAdding = false"
          >
            Anulează
          </button>
        </div>
      </div>

      <!-- Lista fermieri -->
      <div class="space-y-4">
        <div
          v-for="f in store.fermieri"
          :key="f.id"
          class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition"
        >
          <!-- Date fermier -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1 space-y-2 mr-3">
              <input
                :value="f.nume"
                type="text"
                class="w-full border border-gray-200 rounded-lg p-2 font-semibold text-gray-800 focus:outline-none focus:border-green-500 text-gray-900"
                @change="store.updateNume(f.id, $event.target.value)"
              >
              <input
                :value="f.email || ''"
                type="email"
                placeholder="Email"
                class="w-full border border-gray-200 rounded-lg p-2 text-sm text-gray-500 focus:outline-none focus:border-green-500 text-gray-900"
                @change="store.updateEmail(f.id, $event.target.value)"
              >
            </div>
            <button
              class="text-gray-300 hover:text-red-500 text-xl transition flex-shrink-0"
              @click="store.removeFermier(f.id)"
            >
              ✕
            </button>
          </div>

          <!-- Animale -->
          <div class="border-t border-gray-100 pt-3">
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              Animale ({{ (f.Animals || []).length }})
            </p>

            <div class="space-y-1 mb-3">
              <div
                v-for="a in (f.Animals || [])"
                :key="a.id"
                class="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-1.5"
              >
                <span>🐾</span>
                <span class="font-medium">{{ a.nume }}</span>
                <span class="text-gray-400">—</span>
                <span class="text-gray-500">{{ a.specie }}</span>
                <span
                  v-if="a.varsta"
                  class="text-gray-400 text-xs ml-auto"
                >{{ a.varsta }} ani</span>
              </div>
              <p
                v-if="!f.Animals || f.Animals.length === 0"
                class="text-xs text-gray-400 italic px-1"
              >
                Niciun animal adăugat.
              </p>
            </div>

            <!-- Toggle formular animal -->
            <button
              class="text-sm text-green-700 hover:text-green-900 font-medium transition"
              @click="addingAnimalForId = addingAnimalForId === f.id ? null : f.id"
            >
              {{ addingAnimalForId === f.id ? '− Anulează' : '+ Adaugă animal' }}
            </button>

            <!-- Formular adăugare animal -->
            <div
              v-if="addingAnimalForId === f.id"
              class="mt-3 space-y-2 border-t border-green-100 pt-3"
            >
              <input
                v-model="animalNume"
                type="text"
                placeholder="Nume animal"
                class="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:border-green-500 text-gray-900"
              >
              <input
                v-model="animalSpecie"
                type="text"
                placeholder="Specie (ex. Bovine)"
                class="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:border-green-500 text-gray-900"
              >
              <input
                v-model.number="animalVarsta"
                type="number"
                min="0"
                placeholder="Vârstă (ani)"
                class="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:border-green-500 text-gray-900"
              >
              <button
                class="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg text-sm transition"
                @click="addAnimal(f.id)"
              >
                Salvează animal
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Gol -->
      <div
        v-if="store.fermieri.length === 0"
        class="text-center mt-16 text-gray-400"
      >
        <p class="text-5xl mb-4">
          🌾
        </p>
        <p class="text-lg">
          Nu există fermieri. Adaugă unul!
        </p>
      </div>
    </div>
  </div>
</template>
