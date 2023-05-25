import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/CartView',
      name: 'CartView',
      component: () => import('../views/CartView.vue')
    },
    {
      path: '/LogIn',
      name: 'LogIn',
      component: () => import('../views/LogIn.vue')
    },
    {
      path: '/SignUp',
      name: 'SignUp',
      component: () => import('../views/SignUp.vue')
    },
  ]
})

export default router