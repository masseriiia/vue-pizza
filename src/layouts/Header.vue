<script setup lang="ts">
import Button from '@/components/Button/Button.vue'
</script>

<template>
  <div class="header">
    <div class="logo">
      <img src="../asserts/icons/pizza-logo.svg" width="38" height="38">
      <div class="logo-wrapper">
        <p class="logo-title">VUE PIZZA</p>
        <p class="logo-description">самая вкусная пицца во вселенной</p>
      </div>
    </div>
    <Button>
      <p class="cart-price">520 ₽</p>
      <img src="../asserts/icons/cart.svg">
    </Button>
  </div>
</template>

<style>
  .cart-price {
    padding-right: 10px;
    border-right: 1px solid rgba(255, 255, 255, 0.25);
  }

  .header {
    padding: 45px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(95, 90, 90, 0.25);
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
