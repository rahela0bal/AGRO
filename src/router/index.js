import { createRouter, createWebHistory } from 'vue-router'
import FermaMea from '@/components/fermaMea/FermaMea.vue'
import Conversatii from '@/components/conversatii/Conversatii.vue'
import AI from '@/components/inteligentaArtificiala/AI.vue'
import Senzori from '@/components/IoT/Senzori.vue'
import Meteo from '@/components/meteo/Meteo.vue'
import Vanzare from '@/components/vanzare/Vanzare.vue'
import Cumparare from '@/components/cumparare/Cumparare.vue'
import AnimaleleMele from '@/components/fermaMea/AnimaleleMele.vue'
import PostarileMele from '@/components/fermaMea/PostarileMele.vue'
import FurnizoriiMei from '@/components/fermaMea/FurnizoriiMei.vue'
import ProprietatileMele from '@/components/fermaMea/ProprietatileMele.vue'
import CalendarulMeu from '@/components/fermaMea/CalendarulMeu.vue'
import ContulMeu from '@/components/conturi/ContulMeu.vue'
import DespreNoi from '@/components/conturi/DespreNoi.vue'
import SetariCont from '@/components/conturi/SetariCont.vue'

const routes = [
  { path: "/", component: FermaMea },
  { path: "/fermaMea", component: FermaMea },
  { path: "/conversatii", component: Conversatii },
  { path: "/inteligentaArtificiala", component: AI },
  { path: "/IoT", component: Senzori },
  { path: "/meteo", component: Meteo },
  { path: "/vanzare", component: Vanzare },
  { path: "/cumparare", component: Cumparare },
  { path: "/contulMeu", component: ContulMeu },
  { path: "/despreNoi", component: DespreNoi },
  { path: "/setariCont", component: SetariCont },



  {path: "/animaleleMele", component: AnimaleleMele },
  {path: "/proprietaileMele", component: ProprietatileMele },
  {path: "/postarileMele", component: PostarileMele },
  {path: "/calendarulMeu", component: CalendarulMeu },
  {path: "/furnizoriiMei", component: FurnizoriiMei }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'btn-primary'
})

export default router