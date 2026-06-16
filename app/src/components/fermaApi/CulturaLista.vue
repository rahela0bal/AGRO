<script setup>
import { onMounted, ref } from 'vue'
import { useCulturaDb } from '@/stores/culturaDb'
import { useProprietateDb } from '@/stores/proprietateDb'

const culturaStore = useCulturaDb()
const proprietateStore = useProprietateDb()

const nume = ref('')
const anPlantare = ref(new Date().getFullYear())
const ProprietateId = ref('')
const isAdding = ref(false)

onMounted(async () => {
  await proprietateStore.getProprietati()
  await culturaStore.getCulturi()
})

const add = async () => {
  if (!nume.value || ProprietateId.value === '') return
  await culturaStore.addCultura(nume.value, Number(anPlantare.value), Number(ProprietateId.value))
  nume.value = ''
  isAdding.value = false
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-2xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-green-800">
          Culturi (API)
        </h1>
        <button
          class="bg-green-700 text-white px-4 py-2 rounded-lg"
          @click="isAdding = !isAdding"
        >
          + Cultura
        </button>
      </div>

      <div
        v-if="isAdding"
        class="bg-white rounded-xl shadow p-6 mb-6 border border-green-100"
      >
        <select
          v-model="ProprietateId"
          class="w-full border rounded-lg p-3 mb-3 text-gray-900"
        >
          <option value="" disabled>
            Proprietate (FK)
          </option>
          <option
            v-for="pr in proprietateStore.proprietati"
            :key="pr.id"
            :value="pr.id"
          >
            {{ pr.nume }}
          </option>
        </select>
        <input
          v-model="nume"
          type="text"
          placeholder="Cultura (ex. grau)"
          class="w-full border rounded-lg p-3 mb-3 text-gray-900"
        >
        <input
          v-model.number="anPlantare"
          type="number"
          class="w-full border rounded-lg p-3 mb-3 text-gray-900"
        >
        <button
          class="w-full bg-green-700 text-white py-2 rounded-lg"
          @click="add"
        >
          Salveaza
        </button>
      </div>

      <div class="space-y-3">
        <div
          v-for="c in culturaStore.culturi"
          :key="c.id"
          class="bg-white rounded-xl border p-4 space-y-2"
        >
          <p class="text-xs text-gray-500">
            Pe proprietatea: {{ c.proprietateNume }}
          </p>
          <input
            :value="c.nume"
            type="text"
            class="w-full border rounded p-2 text-gray-900"
            @change="culturaStore.updateNume(c.id, $event.target.value)"
          >
          <input
            :value="c.anPlantare"
            type="number"
            class="w-full border rounded p-2 text-gray-900"
            @change="culturaStore.updateAnPlantare(c.id, Number($event.target.value))"
          >
          <label class="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              :checked="c.recoltata"
              class="accent-green-600 text-gray-900"
              @change="culturaStore.toggleRecoltata(c.id)"
            >
            Recoltata
          </label>
          <button
            class="text-red-500 text-sm"
            @click="culturaStore.removeCultura(c.id)"
          >
            Sterge
          </button>
        </div>
      </div>

      <div
        v-if="culturaStore.culturi.length === 0"
        class="text-center mt-12 text-gray-400"
      >
        Nu exista culturi.
      </div>
    </div>
  </div>
</template>
