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
      path: '/LogIn',
      name: 'LogIn',
      component: () => import('../views/LogIn.vue')
    },
    {
      path: '/SignUp',
      name: 'SignUp',
      component: () => import('../views/SignUp.vue')
    },
    {
      path: '/CheckoutView',
      name: 'CheckoutView',
      component: () => import('../views/CheckoutView.vue')
    },
    {
      path: '/Orders',
      name: 'Orders',
      component: () => import('../views/OrdersView.vue')
    }
  ]
})

export default router
