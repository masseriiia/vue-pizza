<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import PizzaItem from '@/components/CartItem/PizzaItem.vue'
import Sort from '@/components/Sort/Sort.vue'
import Category from '@/components/Category/Category.vue'
import {
   fetchPizzasWithFilters, fetchPizzas
} from '@/services/pizzaService.ts'
import Filter from '@/components/Filter/Filter.vue'

const cart = ref(JSON.parse(localStorage.getItem('pizzas')) || '[]')
const pizzas = ref([])

const filters = reactive({
  activeCategory: 0,
  activeSort: 'title',
  pizzaNewBoolean: false,
  formDataPrice: reactive({
    priceFrom: 0,
    priceTo: 0,
  })
})

const onChangeSort = async (value) => {
  filters.activeSort = value
  pizzas.value = await fetchPizzasWithFilters(filters)
}

const onChangeCategory = async (id) => {
  filters.activeCategory = id
  pizzas.value = await fetchPizzasWithFilters(filters)
}

const onChangeNewPizza = async (value) => {
  filters.pizzaNewBoolean = !value
  pizzas.value = await fetchPizzasWithFilters(filters)
}

const onChangePrice = async () => {
  pizzas.value = await fetchPizzasWithFilters(filters)
}

const onClickResetPrice = async () => {
  filters.pizzaNewBoolean = false
  filters.formDataPrice.priceFrom = 0
  filters.formDataPrice.priceTo = 0
  pizzas.value = await fetchPizzas()
}

onMounted(async () => pizzas.value = await fetchPizzas())

</script>

<template>
  <div class="home">
    <div class="home-wrapper">
      <h1 class="home-title">Все пиццы</h1>
      <div class="home-choice">
        <Category @onClickCategory="onChangeCategory" :activeCategory="filters.activeCategory"/>
        <Sort @onChangeSelect="onChangeSort"/>
      </div>
      <div class="home-content">
          <Filter :filters="filters" @emit-new="onChangeNewPizza" @emit-price="onChangePrice" @emit-reset="onClickResetPrice"/>
        <div class="home-items">
          <PizzaItem :items="pizzas" :cart="cart"/>
        </div>
      </div>

    </div>
  </div>
</template>

<style>

.home {
  padding-bottom: 30px;
}

.home-title {
  margin-bottom: 20px;
  font-family: var(--font-family);
  font-weight: 700;
  font-size: 32px;
  letter-spacing: 0.01em;
  color: #000;
}

.home-choice {
  margin-bottom: 55px;
  display: flex;
  justify-content: space-between;
}

.home-content {
  display: flex;
  gap: 62px;
}

.home-items {
  display: flex;
  flex-wrap: wrap;
  gap: 60px;
}

</style>
