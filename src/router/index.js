import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegistrationView from '../views/RegistrationView.vue'
import LoginView from '../views/LoginView.vue'
import DayInfoView from '../views/DayInfoView.vue'
const routes = [


 {
    path: '/',
    name: 'home',
    component: HomeView
  },


  {
    path: '/registration',
    name: 'registration',
    component: RegistrationView
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: LoginView
  },
{
    path: '/day/:name',
    name: 'day',
    component: DayInfoView
  },



    
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
