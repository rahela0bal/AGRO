<script setup>
import { onMounted, ref } from 'vue'
import { useProprietateDetaliiDb } from '@/stores/proprietateDetaliiDb'
import { useProprietateDb } from '@/stores/proprietateDb'

const detaliiStore = useProprietateDetaliiDb()
const proprietateStore = useProprietateDb()

const ProprietateId = ref('')
const suprafataHa = ref(1)
const irigata = ref(false)
const comentariu = ref('')
const isAdding = ref(false)

onMounted(async () => {
  await proprietateStore.getProprietati()
  await detaliiStore.getDetalii()
})

const addDetaliu = async () => {
  if (ProprietateId.value === '' || ProprietateId.value == null) return
  await detaliiStore.addDetaliu({
    ProprietateId: Number(ProprietateId.value),
    suprafataHa: Number(suprafataHa.value),
    irigata: irigata.value,
    comentariu: comentariu.value
  })
  suprafataHa.value = 1
  irigata.value = false
  comentariu.value = ''
  isAdding.value = false
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-2xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-green-800">
          Detalii proprietate (API)
        </h1>
        <button
          class="bg-green-700 text-white px-4 py-2 rounded-lg"
          @click="isAdding = !isAdding"
        >
          + Detaliu
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
            Alege proprietatea
          </option>
          <option
            v-for="pr in proprietateStore.proprietati"
            :key="pr.id"
            :value="pr.id"
          >
            {{ pr.nume }} — {{ pr.localitate }}
          </option>
        </select>
        <input
          v-model.number="suprafataHa"
          type="number"
          step="0.1"
          min="0"
          class="w-full border rounded-lg p-3 mb-3 text-gray-900"
        >
        <label class="flex items-center gap-2 mb-3">
          <input v-model="irigata" type="checkbox" class="text-gray-900">
          Irigata
        </label>
        <input
          v-model="comentariu"
          type="text"
          placeholder="Comentariu"
          class="w-full border rounded-lg p-3 mb-3 text-gray-900"
        >
        <button
          class="w-full bg-green-700 text-white py-2 rounded-lg"
          @click="addDetaliu"
        >
          Salveaza (POST /proprietate-detalii/add)
        </button>
      </div>

      <div class="space-y-3">
        <div
          v-for="d in detaliiStore.detalii"
          :key="d.id"
          class="bg-white rounded-xl border p-4 space-y-2"
        >
          <p class="text-sm text-gray-500">
            Proprietate: {{ d.proprietateNume }} (relatie one-to-one: o proprietate — un rand detalii)
          </p>
          <input
            :value="d.suprafataHa"
            type="number"
            step="0.1"
            class="w-full border rounded p-2 text-gray-900"
            @change="detaliiStore.updateSuprafataHa(d.id, Number($event.target.value))"
          >
          <input
            :value="d.comentariu || ''"
            type="text"
            class="w-full border rounded p-2 text-gray-900"
            @change="detaliiStore.updateComentariu(d.id, $event.target.value)"
          >
          <label class="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              :checked="d.irigata"
              class="accent-green-600 text-gray-900"
              @change="detaliiStore.toggleIrigata(d.id)"
            >
            Irigata
          </label>
          <button
            class="text-red-500 text-sm"
            @click="detaliiStore.removeDetaliu(d.id)"
          >
            Sterge
          </button>
        </div>
      </div>

      <div
        v-if="detaliiStore.detalii.length === 0"
        class="text-center mt-12 text-gray-400"
      >
        Nu exista detalii.
      </div>
    </div>
  </div>
</template>
