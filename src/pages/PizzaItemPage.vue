<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { onMounted, ref, watch } from 'vue'
  import { fetchGetPizzaById, fetchPizzasPopular } from '@/services/pizzaService.ts'
  import Button from '@/components/Button/Button.vue'
  import SecondaryButton from '@/components/SecondaryButton/SecondaryButton.vue'
  import PizzaItem from '@/components/CartItem/PizzaItem.vue'

  const router = useRouter()
  const currentId = ref(Number(router.currentRoute.value.params.id))
  const pizza = ref([])
  const populars = ref([])
  const isLoading = ref(false)

  const cart = ref(JSON.parse(localStorage.getItem('pizzas')) || []);

  const typesNames = ['тонкое', 'традиционное']


  const getPopularPizzas = async () => {
    populars.value = await fetchPizzasPopular()
  }

  const onClickType = (index) => {
    pizza.value.activeType = index
  }

  const onClickSize = (index) => {
    pizza.value.activeSize = index
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
    if (!item || !item.sizes) return 0

    const pizza = {
      ...item,
      type: typesNames[item.activeType],
      size: item.sizes[item.activeSize]
    }

    const existingPizza = cart.value.find(p => p.id === pizza.id && p.type === pizza.type && p.size === pizza.size)

    return existingPizza ? existingPizza.count : 0
  }

  const getPizza = async () => {
    isLoading.value = true

    try {
      pizza.value = await fetchGetPizzaById(currentId.value)
    } catch (e) {
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    getPizza()
    getPopularPizzas()
  })

  watch(() => router.currentRoute.value.params.id, (pizza) => {
    currentId.value = Number(pizza)
    getPizza()
  })

</script>

<template>
  <div class="pizza">
    <div v-if="isLoading" class="loading">
      Загрузка...
    </div>
    <div v-else class="pizza-wrapper">
      <p class="pizza-location">Главная  /  Пиццы   /  <span>{{ pizza.title }}</span> </p>
      <div  class="pizza-content">
        <img :src="pizza.image_url" width="400" height="400" alt="Pizza" />
        <div class="pizza-info">
          <h2 class="pizza-title">{{ pizza.title }}</h2>
          <p class="pizza-description">{{ pizza.description }}</p>
          <div class="pizza-item-info">
            <ul>
              <li v-for="(type, index) of pizza.types" :key="index"
                  @click="onClickType(index)"
                  :class="{active: pizza.activeType === index}">
                {{ typesNames[type] }}
              </li>
            </ul>
            <ul>
              <li v-for="(size, index) of pizza.sizes" :key="index"
                  @click="onClickSize(index)"
                  :class="{active: pizza.activeSize === index}">
                {{ size }} см.
              </li>
            </ul>
          </div>
          <div class="pizza-bottom">
            <p class="pizza-price">{{ pizza.price }} ₽</p>
            <SecondaryButton v-if="getPizzaCount(pizza) > 0" @click="() => onAddCart(pizza)">
              + Добавить <span class="pizza-item-count">{{ getPizzaCount(pizza) > 0 ? getPizzaCount(pizza) : '' }}</span>
            </SecondaryButton>
            <Button v-else @click="() => onAddCart(pizza)">
              + Добавить
            </Button>
          </div>
        </div>
      </div>
      <div class="populars">
        <h3 class="populars-title">Рекомендации</h3>
        <div class="populars-items">
          <PizzaItem :items="populars" :cart="cart"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.pizza {
  padding-bottom: 30px;
}

.pizza-location {
  margin-bottom: 40px;
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 14px;
  line-height: 143%;
  color: #373737;

  span {
    color: rgba(55, 55, 55, 0.6);
  };
}

.pizza-content {
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
  gap: 50px;
}

.pizza-info {
  width: 500px;
}

.pizza-description {
  margin-bottom: 20px;
}

.pizza-title {
  margin-bottom: 20px;
  font-family: var(--font-family);
  font-weight: 800;
  font-size: 34px;
  color: #373737;
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
  list-style-type: none;
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

.pizza-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pizza-price {
  font-family: var(--font-family);
  font-weight: 700;
  font-size: 22px;
  letter-spacing: 0.01em;
  color: #000;
}

.populars-title {

  margin-bottom: 28px;
  font-family: var(--font-family);
  font-weight: 700;
  font-size: 28px;
  color: #373737;
}

.populars-items {
  display: flex;
  justify-content: space-between;

}

</style>
