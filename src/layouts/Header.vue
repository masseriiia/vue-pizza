<script setup lang="ts">
import Button from '@/components/Button/Button.vue'
import { RouterLink } from 'vue-router';

</script>

<template>
  <div class="header">
    <div class="header-wrapper">
        <RouterLink to="/" class="logo">
        <img src="../assets/icons/pizza-logo.svg" width="38" height="38">
        <div class="logo-wrapper">
          <p class="logo-title">VUE PIZZA</p>
          <p class="logo-description">самая вкусная пицца во вселенной</p>
        </div>
      </RouterLink>
      <RouterLink to="/cart">
        <Button>
          <p class="cart-price">{{ 0 }} ₽</p>
          <img src="../assets/icons/cart.svg">
        </Button>
      </RouterLink>
    </div>
  </div>
</template>

<style>
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
</style>
