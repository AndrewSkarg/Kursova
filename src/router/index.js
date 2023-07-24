import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegistrationView from '../views/RegistrationView.vue'
import LoginView from '../views/LoginView.vue'
import DayInfoView from '../views/DayInfoView.vue'
import ProfileView from '../views/ProfileView.vue'
import DishInfoView from '../views/DishInfoView.vue'
import DishesView from '../views/DishesView.vue'
import DrinkInfoView from '../views/DrinkInfoView'
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
          console.error(error);
          next('/register');
        });


    }
  },

  {
    path: '/dish-info/:dishId',
  name: 'dishInfo',
  component: DishInfoView
  },
{
    path: '/drink-info/:drinkId',
  name: 'drinkInfo',
  component: DrinkInfoView,
  },
  
  {
    path: '/dishes-menu/',
  name: 'dishesMenu',
  component: DishesView,
  },








]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



export default router
