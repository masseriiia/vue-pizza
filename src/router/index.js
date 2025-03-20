import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import CartPage from '@/pages/CartPage.vue'
import PizzaItemPage from '@/pages/PizzaItemPage.vue'

const routes = [
  {
    path: '/',
    component: HomePage,
    name: 'home'
  },
  {
    path: '/pizza/:id',
    component: PizzaItemPage,
    name: 'pizza'
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
