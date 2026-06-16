<script setup>
import { RouterLink } from 'vue-router'
import { ref, computed } from 'vue'
import { useWsStore } from '@/stores/wsStore'

const deschis = ref(null)
const wsStore = useWsStore()

const alertaSenzori = computed(() =>
  Object.values(wsStore.senzori).some((s) => s.active)
)

function setDeschis(id) {
  deschis.value = deschis.value === id ? null : id
}

function inchide() {
  deschis.value = null
}
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b border-emerald-200/80 bg-white/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/80"
  >
    <div class="relative z-50 mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-3 md:gap-3">
      <RouterLink
        to="/fermaMea"
        class="mr-1 shrink-0 rounded-lg bg-gradient-to-r from-emerald-700 to-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:from-emerald-800 hover:to-green-800"
        @click="inchide"
      >
        Ferma mea
      </RouterLink>

      <div class="relative">
        <button
          type="button"
          class="flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50/80 px-3 py-2 text-sm font-medium text-emerald-900 transition hover:bg-emerald-100"
          :class="{ 'ring-2 ring-emerald-300': deschis === 'comert' }"
          @click="setDeschis('comert')"
        >
          Comerț
          <span class="text-xs opacity-70">{{ deschis === 'comert' ? '▴' : '▾' }}</span>
        </button>
        <div
          v-if="deschis === 'comert'"
          class="absolute left-0 top-full z-50 mt-1 min-w-[11rem] rounded-lg border border-emerald-100 bg-white py-1 shadow-lg"
        >
          <RouterLink
            to="/vanzare"
            class="block px-4 py-2 text-sm text-gray-800 hover:bg-emerald-50"
            @click="inchide"
          >
            Vânzare
          </RouterLink>
          <RouterLink
            to="/cumparare"
            class="block px-4 py-2 text-sm text-gray-800 hover:bg-emerald-50"
            @click="inchide"
          >
            Cumpărare
          </RouterLink>
        </div>
      </div>

      <div class="relative">
        <button
          type="button"
          class="flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50/80 px-3 py-2 text-sm font-medium text-emerald-900 transition hover:bg-emerald-100"
          :class="{ 'ring-2 ring-emerald-300': deschis === 'digital' }"
          @click="setDeschis('digital')"
        >
          Digital
          <span v-if="alertaSenzori" class="indicator-alerta"></span>
          <span class="text-xs opacity-70">{{ deschis === 'digital' ? '▴' : '▾' }}</span>
        </button>
        <div
          v-if="deschis === 'digital'"
          class="absolute left-0 top-full z-50 mt-1 min-w-[11rem] rounded-lg border border-emerald-100 bg-white py-1 shadow-lg"
        >
          <RouterLink
            to="/conversatii"
            class="block px-4 py-2 text-sm text-gray-800 hover:bg-emerald-50"
            @click="inchide"
          >
            Conversații
          </RouterLink>
          <RouterLink
            to="/inteligentaArtificiala"
            class="block px-4 py-2 text-sm text-gray-800 hover:bg-emerald-50"
            @click="inchide"
          >
            AI
          </RouterLink>
          <RouterLink
            to="/IoT"
            class="block px-4 py-2 text-sm text-gray-800 hover:bg-emerald-50"
            @click="inchide"
          >
            Senzori
          </RouterLink>
          <RouterLink
            to="/meteo"
            class="block px-4 py-2 text-sm text-gray-800 hover:bg-emerald-50"
            @click="inchide"
          >
            Meteo
          </RouterLink>
        </div>
      </div>

      <div class="relative">
        <button
          type="button"
          class="flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50/80 px-3 py-2 text-sm font-medium text-emerald-900 transition hover:bg-emerald-100"
          :class="{ 'ring-2 ring-emerald-300': deschis === 'planificare' }"
          @click="setDeschis('planificare')"
        >
          Planificare
          <span class="text-xs opacity-70">{{ deschis === 'planificare' ? '▴' : '▾' }}</span>
        </button>
        <div
          v-if="deschis === 'planificare'"
          class="absolute left-0 top-full z-50 mt-1 min-w-[11rem] rounded-lg border border-emerald-100 bg-white py-1 shadow-lg"
        >
          <RouterLink
            to="/todo"
            class="block px-4 py-2 text-sm text-gray-800 hover:bg-emerald-50"
            @click="inchide"
          >
            📋 To Do
          </RouterLink>
          <RouterLink
            to="/tasks"
            class="block px-4 py-2 text-sm text-gray-800 hover:bg-emerald-50"
            @click="inchide"
          >
            ⚡ Tasks
          </RouterLink>
          <RouterLink
            to="/reminders"
            class="block px-4 py-2 text-sm text-gray-800 hover:bg-emerald-50"
            @click="inchide"
          >
            🔔 Reminders
          </RouterLink>
          <RouterLink
            to="/categorii"
            class="block px-4 py-2 text-sm text-gray-800 hover:bg-emerald-50"
            @click="inchide"
          >
            🏷️ Categorii
          </RouterLink>
        </div>
      </div>

      <RouterLink
        to="/fermieri"
        class="flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50/80 px-3 py-2 text-sm font-medium text-emerald-900 transition hover:bg-emerald-100"
        @click="inchide"
      >
        🌾 Fermieri
      </RouterLink>

      <div class="relative">
        <button
          type="button"
          class="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-100"
          :class="{ 'ring-2 ring-slate-300': deschis === 'cont' }"
          @click="setDeschis('cont')"
        >
          Cont
          <span class="text-xs opacity-70">{{ deschis === 'cont' ? '▴' : '▾' }}</span>
        </button>
        <div
          v-if="deschis === 'cont'"
          class="absolute right-0 top-full z-50 mt-1 min-w-[12rem] rounded-lg border border-slate-100 bg-white py-1 shadow-lg md:left-0 md:right-auto"
        >
          <RouterLink
            to="/contulMeu"
            class="block px-4 py-2 text-sm text-gray-800 hover:bg-slate-50"
            @click="inchide"
          >
            Contul meu
          </RouterLink>
          <RouterLink
            to="/setariCont"
            class="block px-4 py-2 text-sm text-gray-800 hover:bg-slate-50"
            @click="inchide"
          >
            Setări cont
          </RouterLink>
          <RouterLink
            to="/despreNoi"
            class="block px-4 py-2 text-sm text-gray-800 hover:bg-slate-50"
            @click="inchide"
          >
            Despre noi
          </RouterLink>
          <RouterLink
            to="/signIn"
            class="block px-4 py-2 text-sm text-gray-800 hover:bg-slate-50"
            @click="inchide"
          >
            Sign in
          </RouterLink>
        </div>
      </div>

      <RouterLink
        to="/firstView"
        class="ml-auto hidden rounded-lg px-2 py-1.5 text-xs text-emerald-700 underline decoration-emerald-300 underline-offset-2 sm:block"
        @click="inchide"
      >
        Landing
      </RouterLink>
    </div>

    <div
      v-if="deschis"
      class="fixed inset-0 z-30 bg-black/10 md:hidden"
      aria-hidden="true"
      @click="inchide"
    />
  </header>
</template>

<style scoped>
.btn-primary {
  background-color: #ace0ad;
}

.indicator-alerta {
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: #dc2626;
  border-radius: 50%;
  margin-left: 4px;
  vertical-align: middle;
  animation: pulse 1.2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.3); }
}
</style>
