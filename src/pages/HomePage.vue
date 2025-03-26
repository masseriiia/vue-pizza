<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import PizzaItem from '@/components/PizzaItem/PizzaItem.vue'
import Sort from '@/components/PizzaSort/PizzaSort.vue'
import Category from '@/components/PizzaCategory/PizzaCategory.vue'
import { fetchPizzasWithFilters } from '@/services/pizzaService'
import Filter from '@/components/PizzaFilter/PizzaFilter.vue'
import Pagination from '@/components/PaginationBar/PaginationBar.vue'

interface Pizza {
  id: number;
  title: string;
  description: string;
  image_url: string;
  price: number;
  types: number[];
  sizes: number[];
  activeType?: number;
  activeSize?: number;
  category?: number;
  count?: number;
  new?: boolean;
  rating?: number;
}

interface FilterOptions {
  activeCategory: number;
  activeSort: string;
  pizzaNewBoolean: boolean;
  formDataPrice: {
    priceFrom: number;
    priceTo: number;
  };
}

const pizzas = ref<Pizza[]>([])
const isLoading = ref(false)

const currentPage = ref(1)
const totalPages = ref(3)
const perPage = 8

const filters = reactive<FilterOptions>({
  activeCategory: 0,
  activeSort: 'title',
  pizzaNewBoolean: false,
  formDataPrice: reactive({
    priceFrom: 0,
    priceTo: 0,
  })
})

const getPagination = async (page = currentPage.value) => {
  isLoading.value = true
  try {
    const { data, total } = await fetchPizzasWithFilters(filters, page, perPage);
    pizzas.value = data
    totalPages.value = Math.ceil((total || 0) / perPage)
    currentPage.value = page
  } catch (e) {
    console.error(e)
  } finally {
    isLoading.value = false
  }
}

const onChangeSort = async (value: string) => {
  filters.activeSort = value
  await getPagination(1)
}

const onChangeCategory = async (id: number) => {
  filters.activeCategory = id
  await getPagination(1)
}

const onChangeNewPizza = async (value: boolean) => {
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
        <div v-if="isLoading" class="loading">
          Загрузка...
        </div>
        <div v-else class="home-items">
          <PizzaItem :items="pizzas"/>
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
  color: var(--color-black-secondary);
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
  min-height: 500px;
  display: flex;
  flex-wrap: wrap;
  gap: 60px;
}

</style>
