<script setup lang="ts">
import { computed, ref } from 'vue'
import { useGlobalState } from '@/stores/store.js'
import { RouterLink } from 'vue-router'
import Search from '@/components/PizzaSearch/PizzaSearch.vue'
import UiButton from '@/components/UiButton/UiButton.vue'

const cart = useGlobalState()

const isOverlayVisible = ref(false)

const close = () => {
  isOverlayVisible.value = false
}

const totalPrice = computed(() => {
  return cart.value.reduce((acc, item) => acc + item.price * item.count, 0)
})

</script>

<template>
  <div class="header">
    <div class="header-wrapper">
      <RouterLink to="/" class="logo">
        <img src="../assets/icons/pizza-logo.svg" width="38" height="38" alt="Logo" />
        <div class="logo-wrapper">
          <p class="logo-title">VUE PIZZA</p>
          <p class="logo-description">вкусней уже точно некуда</p>
        </div>
      </RouterLink>
      <Search :isOverlayVisible="isOverlayVisible" @toggle-overlay="isOverlayVisible = !isOverlayVisible" :close="close"/>
      <RouterLink to="/cart">
        <UiButton option="button">
          <p class="cart-price">{{ totalPrice }} ₽</p>
          <img src="../assets/icons/cart.svg" alt="Cart" />
        </UiButton>
      </RouterLink>
    </div>
    <div v-if="isOverlayVisible" class="overlay" @click.self="close"></div>
  </div>
</template>

<style scoped>
.cart-price {
  padding-right: 10px;
  border-right: 1px solid rgba(255, 255, 255, 0.25);
}

.header {
  padding: 45px;
  border-bottom: 1px solid rgba(95, 90, 90, 0.25);
}

.header-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 17px;
}
.logo-title {
  font-family: var(--font-family);
  font-weight: 800;
  font-size: 24px;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  color: #181818;
}
.logo-description {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 16px;
  color: #7b7b7b;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

</style>
