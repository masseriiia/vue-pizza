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

  const onClickType = (item, index) => {
    item.activeType = index
  }

  const onClickSize = (item, index) => {
    item.activeSize = index
  }

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


  // const onMinusPizza = (item) => {
  //   if (item.count <= 1) {
  //     return 1
  //   }
  //   item.count--
  //   localStorage.setItem('pizzas', JSON.stringify(items.value))
  // }
  //
  // const onPlusPizza = (item) => {
  //   if (item.count === 10) {
  //     return 10
  //   }
  //   item.count++
  //   localStorage.setItem('pizzas', JSON.stringify(items.value))
  // }

</script>

<template>
  <div v-for="item of items" class="pizza-item" :key="item.id">
    <img class="pizza-item-image" :src="item.image_url" width="260" height="260" alt="Pizza">
    <div>
      <p class="pizza-item-name">{{ item.title }}</p>
      <div class="pizza-item-info">
        <ul>
          <li v-for="(type, index) of item.types" :key="index"
              @click="onClickType(item, index)"
              :class="{active: item.activeType === index}">
            {{ typesNames[type] }}
          </li>
        </ul>
        <ul>
          <li v-for="(size, index) of item.sizes" :key="index"
              @click="onClickSize(item, index)"
              :class="{active: item.activeSize === index}">
            {{ size }} см.
          </li>
        </ul>
      </div>
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

<style>

.pizza-item {
  width: 260px;
}

.pizza-item-image {

}

.pizza-item-name {
  margin-bottom: 22px;
  font-family: var(--font-family);
  font-weight: 800;
  font-size: 20px;
  letter-spacing: 0.01em;
  text-align: center;
  color: #000;
}

.pizza-item-info {
  margin-bottom: 17px;
  padding: 7px;
  flex: 1;
  text-align: center;
  background-color: #f3f3f3;
  border-radius: 10px;
}

ul {
  margin-bottom: 5px;
  display: flex;
  list-style: none;
  justify-content: space-between;
}

ul:last-child {
  margin-bottom: 0;
}

li{
  padding: 7px;
  flex: 1;
  cursor: pointer;
}

li.active {
  background-color: #ffffff;
  border-radius: 5px;
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
  color: #000;
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

  color: #ffffff;
  background: var(--color-orange);
  border-radius: 50px;
}
</style>

