<script setup lang="ts">
  import UiButton from '@/components/UiButton/UiButton.vue'
  import { useGlobalState } from '@/stores/store'

  interface PizzaItem {
  id: number
  title: string
  description: string
  image_url: string
  price: number
  activeType: number
  activeSize: number
  sizes: number[]
  }

  const props = defineProps<{
    items: PizzaItem[]
  }>()

  const cart = useGlobalState()

  const typesNames = ['тонкое', 'традиционное']

  const onAddCart = async (item: PizzaItem) => {
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
  }

  const getPizzaCount = (item: PizzaItem) => {
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
  <div v-for="item of items" class="pizza-item" :key="item.id">
    <RouterLink :to="{ name: 'pizza', params: {id: item.id }}">
      <img class="pizza-item-image" :src="item.image_url" width="260" height="260" alt="Pizza">
      <p class="pizza-item-name">{{ item.title }}</p>
      <p class="item-description">{{ item.description }}</p>
    </RouterLink>
    <div>
      <div class="pizza-item-bottom">
        <p class="pizza-item-price">{{ item.price }} ₽</p>
        <UiButton option="button-secondary" v-if="getPizzaCount(item) > 0" @click="() => onAddCart(item)">
          + Добавить <span class="pizza-item-count">{{ getPizzaCount(item) > 0 ? getPizzaCount(item) : '' }}</span>
        </UiButton>
        <UiButton option="button" v-else @click="() => onAddCart(item)">
         + Добавить
        </UiButton>
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

