<script setup>
import { onMounted, ref } from 'vue'
import { useProprietateDb } from '@/stores/proprietateDb'

const store = useProprietateDb()

const newNume = ref('')
const newLocalitate = ref('')
const isAdding = ref(false)

const cuDetNume = ref('')
const cuDetLocalitate = ref('')
const cuDetSuprafata = ref(1)
const cuDetIrigata = ref(false)
const cuDetComentariu = ref('')
const isAddingCuDetalii = ref(false)

onMounted(async () => {
  await store.getProprietati()
})

const addSimple = async () => {
  if (!newNume.value || !newLocalitate.value) return
  await store.addProprietate(newNume.value, newLocalitate.value)
  newNume.value = ''
  newLocalitate.value = ''
  isAdding.value = false
}

const addCuDetalii = async () => {
  if (!cuDetNume.value || !cuDetLocalitate.value) return
  await store.addProprietateCuDetalii({
    nume: cuDetNume.value,
    localitate: cuDetLocalitate.value,
    suprafataHa: Number(cuDetSuprafata.value),
    irigata: cuDetIrigata.value,
    comentariu: cuDetComentariu.value
  })
  cuDetNume.value = ''
  cuDetLocalitate.value = ''
  cuDetSuprafata.value = 1
  cuDetIrigata.value = false
  cuDetComentariu.value = ''
  isAddingCuDetalii.value = false
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-2xl mx-auto">
      <div class="flex flex-wrap gap-2 justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-green-800">
          Proprietati (API)
        </h1>
        <div class="flex gap-2">
          <button
            class="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-lg"
            @click="isAdding = !isAdding"
          >
            + Proprietate
          </button>
          <button
            class="bg-emerald-900 hover:bg-black text-white px-4 py-2 rounded-lg"
            @click="isAddingCuDetalii = !isAddingCuDetalii"
          >
            + Cu detalii (tranzactie)
          </button>
        </div>
      </div>

      <div
        v-if="isAdding"
        class="bg-white rounded-xl shadow p-6 mb-6 border border-green-100"
      >
        <input
          v-model="newNume"
          type="text"
          placeholder="Nume parcela"
          class="w-full border rounded-lg p-3 mb-3 text-gray-900"
        >
        <input
          v-model="newLocalitate"
          type="text"
          placeholder="Localitate"
          class="w-full border rounded-lg p-3 mb-3 text-gray-900"
        >
        <button
          class="w-full bg-green-700 text-white py-2 rounded-lg"
          @click="addSimple"
        >
          Salveaza
        </button>
      </div>

      <div
        v-if="isAddingCuDetalii"
        class="bg-white rounded-xl shadow p-6 mb-6 border border-green-200"
      >
        <p class="text-sm text-gray-600 mb-2">
          POST /proprietate/add-cu-detalii — creeaza Proprietate + ProprietateDetalii in aceeasi tranzactie Sequelize.
        </p>
        <input
          v-model="cuDetNume"
          type="text"
          placeholder="Nume parcela"
          class="w-full border rounded-lg p-3 mb-2 text-gray-900"
        >
        <input
          v-model="cuDetLocalitate"
          type="text"
          placeholder="Localitate"
          class="w-full border rounded-lg p-3 mb-2 text-gray-900"
        >
        <input
          v-model.number="cuDetSuprafata"
          type="number"
          step="0.1"
          min="0"
          class="w-full border rounded-lg p-3 mb-2 text-gray-900"
        >
        <label class="flex items-center gap-2 mb-2">
          <input v-model="cuDetIrigata" type="checkbox" class="text-gray-900">
          Irigata
        </label>
        <input
          v-model="cuDetComentariu"
          type="text"
          placeholder="Comentariu (detalii)"
          class="w-full border rounded-lg p-3 mb-2 text-gray-900"
        >
        <button
          class="w-full bg-emerald-800 text-white py-2 rounded-lg"
          @click="addCuDetalii"
        >
          Salveaza (tranzactie)
        </button>
      </div>

      <div class="space-y-3">
        <div
          v-for="p in store.proprietati"
          :key="p.id"
          class="bg-white rounded-xl shadow-sm border p-4 flex flex-col gap-2"
        >
          <div class="flex justify-between items-start gap-2">
            <div class="flex-1 space-y-2">
              <input
                :value="p.nume"
                type="text"
                class="w-full border rounded p-2 text-gray-900"
                @change="store.updateNume(p.id, $event.target.value)"
              >
              <input
                :value="p.localitate"
                type="text"
                class="w-full border rounded p-2 text-gray-900"
                @change="store.updateLocalitate(p.id, $event.target.value)"
              >
            </div>
            <button
              class="text-gray-400 hover:text-red-500 text-xl"
              @click="store.removeProprietate(p.id)"
            >
              ✕
            </button>
          </div>
          <label class="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              :checked="p.activ"
              class="accent-green-600 text-gray-900"
              @change="store.toggleActiv(p.id)"
            >
            Activ (PUT /proprietate/update-activ)
          </label>
        </div>
      </div>

      <div
        v-if="store.proprietati.length === 0"
        class="text-center mt-12 text-gray-400"
      >
        Nu exista proprietati. Adauga din API.
      </div>
    </div>
  </div>
</template>
