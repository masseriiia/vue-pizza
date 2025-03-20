<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import PizzaItem from '@/components/CartItem/PizzaItem.vue'
import Sort from '@/components/Sort/Sort.vue'
import Category from '@/components/Category/Category.vue'
import {
  fetchPizzas, fetchPizzasWithFilters
} from '@/services/pizzaService.ts'

import Filter from '@/components/Filter/Filter.vue'
import Pagination from '@/components/Pagination/Pagination.vue'

const cart = ref(JSON.parse(localStorage.getItem('pizzas')) || '[]')
const pizzas = ref([])

const currentPage = ref(1)
const totalPages = ref(3)
const perPage = 8

const filters = reactive({
  activeCategory: 0,
  activeSort: 'title',
  pizzaNewBoolean: false,
  formDataPrice: reactive({
    priceFrom: 0,
    priceTo: 0,
  })
})

const getPagination = async (page = currentPage.value) => {
  const { data, total } = await fetchPizzasWithFilters(filters, page, perPage);
  pizzas.value = data
  totalPages.value = Math.ceil(total / perPage)
  currentPage.value = page
}

const onChangeSort = async (value) => {
  filters.activeSort = value
  await getPagination(1)
}

const onChangeCategory = async (id) => {
  filters.activeCategory = id
  await getPagination(1)
}

const onChangeNewPizza = async (value) => {
  filters.pizzaNewBoolean = !value
  await getPagination(1)
}

const onChangePrice = async () => {
  await getPagination(1)
}

const onClickResetPrice = async () => {
  filters.pizzaNewBoolean = false
  filters.formDataPrice.priceFrom = 0
  filters.formDataPrice.priceTo = 0
  await getPagination(1)
}

onMounted(async () => {
  await getPagination()
})

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
      <Pagination @emit-paginate="getPagination" :currentPage="currentPage" :totalPages="totalPages"/>
    </div>
  </div>
</template>

<style>

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
  margin-bottom: 40px;
  display: flex;
  gap: 62px;
}

.home-items {
  height: 1000px;
  display: flex;
  flex-wrap: wrap;
  gap: 60px;
}

</style>
