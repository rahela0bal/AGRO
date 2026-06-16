<script setup>
import { onMounted, ref } from 'vue'
import { useLotSeminteDb } from '@/stores/lotSeminteDb'
import { useDepozitDb } from '@/stores/depozitDb'

const lotStore = useLotSeminteDb()
const depozitStore = useDepozitDb()

const numeSoi = ref('')
const cantitateKg = ref(1)
const DepozitId = ref('')
const isAdding = ref(false)

onMounted(async () => {
  await depozitStore.getDepozite()
  await lotStore.getLoturi()
})

const add = async () => {
  if (!numeSoi.value || DepozitId.value === '') return
  await lotStore.addLot(numeSoi.value, Number(cantitateKg.value), Number(DepozitId.value))
  numeSoi.value = ''
  cantitateKg.value = 1
  isAdding.value = false
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-2xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-green-800">
          Loturi seminte (API)
        </h1>
        <button
          class="bg-green-700 text-white px-4 py-2 rounded-lg"
          @click="isAdding = !isAdding"
        >
          + Lot
        </button>
      </div>

      <div
        v-if="isAdding"
        class="bg-white rounded-xl shadow p-6 mb-6 border border-green-100"
      >
        <select
          v-model="DepozitId"
          class="w-full border rounded-lg p-3 mb-3 text-gray-900"
        >
          <option value="" disabled>
            Depozit (FK)
          </option>
          <option
            v-for="dep in depozitStore.depozite"
            :key="dep.id"
            :value="dep.id"
          >
            {{ dep.nume }} — {{ dep.locatie }}
          </option>
        </select>
        <input
          v-model="numeSoi"
          type="text"
          placeholder="Nume soi"
          class="w-full border rounded-lg p-3 mb-3 text-gray-900"
        >
        <input
          v-model.number="cantitateKg"
          type="number"
          step="0.1"
          min="0"
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
          v-for="l in lotStore.loturi"
          :key="l.id"
          class="bg-white rounded-xl border p-4 space-y-2"
        >
          <p class="text-xs text-gray-500">
            In depozitul: {{ l.depozitNume }}
          </p>
          <input
            :value="l.numeSoi"
            type="text"
            class="w-full border rounded p-2 text-gray-900"
            @change="lotStore.updateNumeSoi(l.id, $event.target.value)"
          >
          <input
            :value="l.cantitateKg"
            type="number"
            step="0.1"
            class="w-full border rounded p-2 text-gray-900"
            @change="lotStore.updateCantitateKg(l.id, Number($event.target.value))"
          >
          <label class="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              :checked="l.bio"
              class="accent-green-600 text-gray-900"
              @change="lotStore.toggleBio(l.id)"
            >
            Bio
          </label>
          <button
            class="text-red-500 text-sm"
            @click="lotStore.removeLot(l.id)"
          >
            Sterge
          </button>
        </div>
      </div>

      <div
        v-if="lotStore.loturi.length === 0"
        class="text-center mt-12 text-gray-400"
      >
        Nu exista loturi.
      </div>
    </div>
  </div>
</template>
