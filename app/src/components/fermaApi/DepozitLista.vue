<script setup>
import { onMounted, ref } from 'vue'
import { useDepozitDb } from '@/stores/depozitDb'
import { useLotSeminteDb } from '@/stores/lotSeminteDb'

const store = useDepozitDb()
const lotStore = useLotSeminteDb()

const nume = ref('')
const locatie = ref('')
const isAdding = ref(false)

const lotNume = ref('')
const lotLocatie = ref('')
const lotSoi = ref('')
const lotCant = ref(1)
const lotBio = ref(false)
const isAddingCuLot = ref(false)

onMounted(async () => {
  await store.getDepozite()
})

const addSimple = async () => {
  if (!nume.value || !locatie.value) return
  await store.addDepozit(nume.value, locatie.value)
  nume.value = ''
  locatie.value = ''
  isAdding.value = false
}

const addCuLot = async () => {
  if (!lotNume.value || !lotLocatie.value || !lotSoi.value) return
  await store.addDepozitCuLot({
    nume: lotNume.value,
    locatie: lotLocatie.value,
    numeSoi: lotSoi.value,
    cantitateKg: Number(lotCant.value),
    bio: lotBio.value
  })
  await lotStore.getLoturi()
  lotNume.value = ''
  lotLocatie.value = ''
  lotSoi.value = ''
  lotCant.value = 1
  lotBio.value = false
  isAddingCuLot.value = false
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-2xl mx-auto">
      <div class="flex flex-wrap gap-2 justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-green-800">
          Depozite (API)
        </h1>
        <div class="flex gap-2">
          <button
            class="bg-amber-700 text-white px-4 py-2 rounded-lg"
            @click="isAdding = !isAdding"
          >
            + Depozit
          </button>
          <button
            class="bg-amber-900 text-white px-4 py-2 rounded-lg"
            @click="isAddingCuLot = !isAddingCuLot"
          >
            + Depozit cu lot (tranzactie)
          </button>
        </div>
      </div>

      <div
        v-if="isAdding"
        class="bg-white rounded-xl shadow p-6 mb-6 border"
      >
        <input
          v-model="nume"
          type="text"
          placeholder="Nume depozit"
          class="w-full border rounded-lg p-3 mb-3 text-gray-900"
        >
        <input
          v-model="locatie"
          type="text"
          placeholder="Locatie"
          class="w-full border rounded-lg p-3 mb-3 text-gray-900"
        >
        <button
          class="w-full bg-amber-700 text-white py-2 rounded-lg"
          @click="addSimple"
        >
          Salveaza
        </button>
      </div>

      <div
        v-if="isAddingCuLot"
        class="bg-white rounded-xl shadow p-6 mb-6 border border-amber-200"
      >
        <p class="text-sm text-gray-600 mb-2">
          POST /depozit/add-cu-lot — Depozit + LotSeminte in aceeasi tranzactie.
        </p>
        <input
          v-model="lotNume"
          type="text"
          placeholder="Nume depozit"
          class="w-full border rounded-lg p-2 mb-2 text-gray-900"
        >
        <input
          v-model="lotLocatie"
          type="text"
          placeholder="Locatie depozit"
          class="w-full border rounded-lg p-2 mb-2 text-gray-900"
        >
        <input
          v-model="lotSoi"
          type="text"
          placeholder="Soi seminte"
          class="w-full border rounded-lg p-2 mb-2 text-gray-900"
        >
        <input
          v-model.number="lotCant"
          type="number"
          step="0.1"
          min="0"
          class="w-full border rounded-lg p-2 mb-2 text-gray-900"
        >
        <label class="flex items-center gap-2 mb-2">
          <input v-model="lotBio" type="checkbox" class="text-gray-900">
          Bio
        </label>
        <button
          class="w-full bg-amber-900 text-white py-2 rounded-lg"
          @click="addCuLot"
        >
          Salveaza (tranzactie)
        </button>
      </div>

      <div class="space-y-3">
        <div
          v-for="d in store.depozite"
          :key="d.id"
          class="bg-white rounded-xl border p-4 space-y-2"
        >
          <input
            :value="d.nume"
            type="text"
            class="w-full border rounded p-2 text-gray-900"
            @change="store.updateNume(d.id, $event.target.value)"
          >
          <input
            :value="d.locatie"
            type="text"
            class="w-full border rounded p-2 text-gray-900"
            @change="store.updateLocatie(d.id, $event.target.value)"
          >
          <label class="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              :checked="d.inchis"
              class="accent-amber-600 text-gray-900"
              @change="store.toggleInchis(d.id)"
            >
            Inchis
          </label>
          <button
            class="text-red-500 text-sm"
            @click="store.removeDepozit(d.id)"
          >
            Sterge
          </button>
        </div>
      </div>

      <div
        v-if="store.depozite.length === 0"
        class="text-center mt-12 text-gray-400"
      >
        Nu exista depozite.
      </div>
    </div>
  </div>
</template>
