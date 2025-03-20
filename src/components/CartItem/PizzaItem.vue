<script setup lang="ts">
  import Button from '@/components/Button/Button.vue'
  import { toRef } from 'vue'
  import SecondaryButton from '@/components/SecondaryButton/SecondaryButton.vue'

  const props = defineProps({
    items: Array,
    cart: Object
  })

  const cart = toRef(props, 'cart')

  const typesNames = ['тонкое', 'традиционное']

  const onAddCart = async (item) => {
    const pizza = {
      ...item,
      type: typesNames[item.activeType],
      size: item.sizes[item.activeSize],
      count: 1
    };

    const existingPizza = cart.value.find(p => p.id === pizza.id && p.type === pizza.type && p.size === pizza.size)

    if (existingPizza) {
      if (existingPizza.count >= 10) {
       return 10
      }
      existingPizza.count++
    } else {
      cart.value.push(pizza)
    }

    localStorage.setItem('pizzas', JSON.stringify(cart.value))
  }

  const getPizzaCount = (item) => {
    const pizza = {
      ...item,
      type: typesNames[item.activeType],
      size: item.sizes[item.activeSize]
    }

    const existingPizza = cart.value.find(p => p.id === pizza.id && p.type === pizza.type && p.size === pizza.size)

    return existingPizza ? existingPizza.count : 0
  }

</script>

<template>
  <div v-for="item of items" class="pizza-item" :key="item.id" @click="onClickPizzaItem(item.id)">
    <RouterLink :to="{ name: 'pizza', params: {id: item.id }}">
      <img class="pizza-item-image" :src="item.image_url" width="260" height="260" alt="Pizza">
      <p class="pizza-item-name">{{ item.title }}</p>
      <p class="item-description">{{ item.description }}</p>
    </RouterLink>
    <div>
      <div class="pizza-item-bottom">
        <p class="pizza-item-price">{{ item.price }} ₽</p>
        <SecondaryButton v-if="getPizzaCount(item) > 0" @click="() => onAddCart(item)">
          + Добавить <span class="pizza-item-count">{{ getPizzaCount(item) > 0 ? getPizzaCount(item) : '' }}</span>
        </SecondaryButton>
        <Button v-else @click="() => onAddCart(item)">
         + Добавить
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>

.pizza-item {
  width: 260px;
}

.pizza-item-name {
  margin-bottom: 22px;
  font-family: var(--font-family);
  font-weight: 800;
  font-size: 20px;
  letter-spacing: 0.01em;
  text-align: center;
  color: var(--color-black-secondary);
}

.item-description {
  margin-bottom: 10px;
  font-family: var(--font-family);
  height: 95px;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: #b1b1b1;
}

.pizza-item-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pizza-item-price {
  font-family: var(--font-family);
  font-weight: 700;
  font-size: 22px;
  letter-spacing: 0.01em;
  color: var(--color-black-secondary);
}

.pizza-item-count {
  padding: 3px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;

  font-family: var(--font-family);
  font-weight: 700;
  font-size: 13px;

  color: var(--color-white);
  background: var(--color-orange);
  border-radius: 50px;
}
</style>

