import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegistrationView from '../views/RegistrationView.vue'
import LoginView from '../views/LoginView.vue'
import DayInfoView from '../views/DayInfoView.vue'
import ProfileView from '../views/ProfileView.vue'
import DishInfoView from '../views/DishInfoView.vue'
import axios from 'axios';


const routes = [


  {
    path: '/',
    name: 'home',
    component: HomeView,

  },




  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },

  {
    path: '/register',
    name: 'register',
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

  {
    path: '/logout',
    name: 'logout',
    beforeEnter: (to, from, next) => {
      axios.get('/api/users/logout').then(response => {
        console.log(response.data.msg);
        next('/login');
      })
        .catch(error => {
          // Обробка помилки, якщо Axios-запит не вдається
          console.error(error);
          next('/register');
        });


    }
  },

  {
    path: '/dish-info/:dishId',
  name: 'dishInfo',
  component: DishInfoView
  }






]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
