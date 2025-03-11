import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import CartPage from '@/pages/CartPage.vue'

const routes = [
  {
    path: '/',
    component: HomePage,
    name: 'home'
  },
  {
    path: '/cart',
    component: CartPage,
    name: 'cart'
  }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
