<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { computed, ref } from 'vue'

import Button from '@/components/Button/Button.vue'
import OutlinedButton from '@/components/OutlinedButton/OutlinedButton.vue'

const items = ref(JSON.parse(localStorage.getItem('pizzas')))

const cartClear = async () => {
  items.value = []
  localStorage.setItem('pizzas', JSON.stringify([]))
}

const onMinusPizza = (item) => {
  if (item.count <= 1) {
    return 1
  }
  item.count--
  localStorage.setItem('pizzas', JSON.stringify(items.value))
}

const onPlusPizza = (item) => {
  if (item.count === 10) {
    return 10
  }
  item.count++
  localStorage.setItem('pizzas', JSON.stringify(items.value))
}

const onDeletePizza = (id) => {
  items.value = items.value.filter(pizza => pizza.id !== id)
  localStorage.setItem('pizzas', JSON.stringify(items.value))
}

const totalPrice = computed(() => {
  return items.value.reduce((acc, item) => acc + item.price * item.count, 0)
})

</script>

<template >
  <div v-if="items.length > 0" class="cart">
    <div class="cart-wrapper">
      <div class="cart-description">
        <h2 class="cart-title">Корзина</h2>
        <button class="button-clear" @click="cartClear">
          <img src="@/assets/icons/trash.svg" alt="Очистить"/>
          Очистить корзину
        </button>
      </div>
      <div class="cart-items">
        <div v-for="item in items" class="cart-item" :key="item.id">
          <img class="cart-item-image" :src="item.imageUrl" >
          <div class="cart-item-description">
            <p class="cart-item-name">{{ item.title }}</p>
            <p class="cart-item-info">{{ item.type }} тесто, {{ item.size }} см.</p>
          </div>
          <div class="cart-item-quantity">
            <OutlinedButton @click="onMinusPizza(item)">-</OutlinedButton>
              {{ item.count }}
            <OutlinedButton @click="onPlusPizza(item)">+</OutlinedButton>
          </div>
          <p class="cart-item-price">
            {{ item.price * item.count }} ₽
          </p>
          <button class="cart-item-delete" @click="onDeletePizza(item.id)">
            Удалить
          </button>
        </div>
      </div>
      <div class="cart-summary">
        <p class="cart-total-pizza">Всего пицц: {{ items.length }} </p>
        <p class="cart-total-price">Сумма заказа: <span>{{ totalPrice }} ₽</span> </p>
      </div>
      <div class="cart-actions">
        <RouterLink to="/">
          <button class="button-back">
            <img src="@/assets/icons/grey-arrow-left.svg" />
            Вернуться назад
          </button>
        </RouterLink>
        <Button>Оплатить</Button>
      </div>
    </div>
  </div>

  <div v-else class="cart">
    <div class="cart-wrapper-empty">
      <h2 class="cart-title-empty ">Корзина пустая 😕</h2>
      <p class="cart-description-empty">
        Вероятней всего, вы не заказывали ещё пиццу.
        Для того, чтобы заказать пиццу, перейди на главную страницу.
      </p>
      <img class="cart-image-empty" src="@/assets/images/empty-cart.png">
      <RouterLink to="/">
        <Button>Вернуться назад</Button>
      </RouterLink>
    </div>
  </div>
</template>

<style>
.cart {
  display: flex;
  justify-content: center;
}

.cart-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 800px;
}

.cart-item-quantity {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cart-title {
  font-family: var(--font-family);
  font-weight: 700;
  font-size: 32px;
  letter-spacing: 0.01em;
  color: #000;
}

.button-clear {
  display: flex;
  align-items: center;
  gap: 7px;

  font-family: var(--font-family);
  font-weight: 400;
  font-size: 16px;
  color: #b6b6b6;

  background: none;
  border: none;
  cursor: pointer;
}

.cart-items {
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 50px;
}

.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cart-item-image {
  margin-right: 15px;
  width: 110px;
  height: 110px;
}

.cart-item-description {
  width: 100%;
  max-width: 300px;
}

.cart-item-name {
  font-family: var(--font-family);
  font-weight: 700;
  font-size: 22px;
  letter-spacing: 0.01em;
  color: #000;
}

.cart-description {
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.cart-item-info {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 18px;
  letter-spacing: 0.01em;
  color: #8d8d8d;
}

.cart-item-price {
  font-family: var(--font-family);
  font-weight: 700;
  font-size: 22px;
  letter-spacing: 0.01em;
  color: #000;
}

.cart-item-delete {
  font-size: 16px;
  cursor: pointer;
}

.cart-summary {
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cart-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cart-total-pizza {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 22px;
  letter-spacing: 0.01em;
  color: #000;
}

.cart-total-price {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 22px;
  letter-spacing: 0.01em;
  color: #000;

  span {
    font-weight: 700;
    color: #fe5f1e;;
  }
}

.button-back {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 18px 30px;
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 16px;
  text-align: center;
  color: #cacaca;
  border: 1px solid #cacaca;
  border-radius: 30px;
  cursor: pointer;
}

.button-back:hover {
  color: #a4a4a4;
  border: 1px solid #b8b8b8;
  transition: color 0.3s ease-in-out;
}

.cart-wrapper-empty {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 547px;
}

.cart-title-empty {
  margin-bottom: 10px;
  font-family: var(--font-family);
  font-weight: 700;
  font-size: 32px;
  letter-spacing: 0.01em;
  color: #000;
}
.cart-description-empty {
  margin-bottom: 50px;
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 18px;
  line-height: 145%;
  text-align: center;
  color: #777;
}
.cart-image-empty {
  margin-bottom: 74px;
  width: 300px;
  height: 255px;
}

</style>
