import { createRouter, createWebHistory } from 'vue-router'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import Profile from './views/Profile.vue'
import Preference from './views/Preference.vue'
import DestinationList from './views/DestinationList.vue'
import DestinationDetail from './views/DestinationDetail.vue'
import ItineraryList from './views/ItineraryList.vue'
import ItineraryDetail from './views/ItineraryDetail.vue'
import ItineraryEdit from './views/ItineraryEdit.vue'
import { getCurrentUser } from './utils/user'

const routes = [
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/profile', component: Profile },
  { path: '/preference', component: Preference },
  { path: '/destination', component: DestinationList },
  { path: '/destination/:id', component: DestinationDetail },
  { path: '/itinerary', component: ItineraryList },
  { path: '/itinerary/edit/:id?', component: ItineraryEdit },
  { path: '/itinerary/:id', component: ItineraryDetail }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const user = getCurrentUser()
  const publicPages = ['/login', '/register']
  if (!user && !publicPages.includes(to.path)) {
    next('/login')
  } else {
    next()
  }
})

export default router 