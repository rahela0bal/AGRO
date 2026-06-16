import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/stores/auth'
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
import SignIn from '@/components/sign/SignIn.vue'
import FirstView from '@/components/landingPage/FirstView.vue'
import ReminderList from '@/components/reminders/ReminderList.vue'
import TodoList from '@/components/todo/TodoList.vue'
import ProprietateLista from '@/components/fermaApi/ProprietateLista.vue'
import ProprietateDetaliiLista from '@/components/fermaApi/ProprietateDetaliiLista.vue'
import CulturaLista from '@/components/fermaApi/CulturaLista.vue'
import DepozitLista from '@/components/fermaApi/DepozitLista.vue'
import LotSeminteLista from '@/components/fermaApi/LotSeminteLista.vue'
import TaskList from '@/components/task/TaskList.vue'
import FermierLista from '@/components/ferma/FermierLista.vue'
import CategorieLista from '@/components/reminders/CategorieLista.vue'

const routes = [
  { path: '/', component: FermaMea, meta: { requiresAuth: true } },
  { path: '/fermaMea', component: FermaMea, meta: { requiresAuth: true } },
  { path: '/conversatii', component: Conversatii, meta: { requiresAuth: true } },
  { path: '/inteligentaArtificiala', component: AI, meta: { requiresAuth: true } },
  { path: '/IoT', component: Senzori, meta: { requiresAuth: true } },
  { path: '/meteo', component: Meteo, meta: { requiresAuth: true } },
  { path: '/vanzare', component: Vanzare, meta: { requiresAuth: true } },
  { path: '/cumparare', component: Cumparare, meta: { requiresAuth: true } },
  { path: '/contulMeu', component: ContulMeu, meta: { requiresAuth: true } },
  { path: '/despreNoi', component: DespreNoi, meta: { requiresAuth: true } },
  { path: '/setariCont', component: SetariCont, meta: { requiresAuth: true } },
  { path: '/firstView', component: FirstView },
  { path: '/animaleleMele', component: AnimaleleMele, meta: { requiresAuth: true } },
  { path: '/proprietatileMele', component: ProprietatileMele, meta: { requiresAuth: true } },
  { path: '/postarileMele', component: PostarileMele, meta: { requiresAuth: true } },
  { path: '/calendarulMeu', component: CalendarulMeu, meta: { requiresAuth: true } },
  { path: '/furnizoriiMei', component: FurnizoriiMei, meta: { requiresAuth: true } },
  { path: '/signIn', component: SignIn },
  { path: '/reminders', component: ReminderList, meta: { requiresAuth: true } },
  { path: '/todo', component: TodoList, meta: { requiresAuth: true } },
  { path: '/proprietati-api', component: ProprietateLista, meta: { requiresAuth: true } },
  { path: '/proprietate-detalii-api', component: ProprietateDetaliiLista, meta: { requiresAuth: true } },
  { path: '/culturi-api', component: CulturaLista, meta: { requiresAuth: true } },
  { path: '/depozite-api', component: DepozitLista, meta: { requiresAuth: true } },
  { path: '/loturi-seminte-api', component: LotSeminteLista, meta: { requiresAuth: true } },
  { path: '/tasks', component: TaskList, meta: { requiresAuth: true } },
  { path: '/fermieri', component: FermierLista, meta: { requiresAuth: true } },
  { path: '/categorii', component: CategorieLista, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory('/AGRO/'),
  routes,
  linkActiveClass: 'btn-primary'
})

router.beforeEach((to, from, next) => {
  const auth = useAuth()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next('/signIn')
  }

  if (to.path === '/signIn' && auth.isAuthenticated) {
    return next('/')
  }

  next()
})

export default router
