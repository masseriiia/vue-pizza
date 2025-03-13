<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import axios from 'axios'
import PizzaItem from '@/components/CartItem/PizzaItem.vue'
import Sort from '@/components/Sort/Sort.vue'
import Category from '@/components/Category/Category.vue'

const cart = ref(JSON.parse(localStorage.getItem('pizzas')))
const items = ref([])

const filters = reactive({
  sortBy: 'rating',
  category: -1
})

const onChangeSelect = value => {
  filters.sortBy = value;
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }
    if (filters.category >= 0) {
      params.category = filters.category
    }
    const { data } = await axios.get('https://49a3806d839655dd.mokky.dev/items', {
      params
    })
    items.value = data.map(item => ({
      ...item,
      activeType: 0,
      activeSize: 0,
      count: 1
    }))
  } catch (e) {
    console.log('Ошибка', e)
  }
}

const onClickCategory = (id) => {
  filters.category = id === 0 ? -1 : id
}

onMounted(async () => {
  await fetchItems()
})

watch(filters, fetchItems, { deep: true })


</script>

<template>
  <div class="home">
    <div class="home-wrapper">
      <div class="home-filter">
        <Category @onClickCategory="onClickCategory" :filters="filters"/>
        <Sort @onChangeSelect="onChangeSelect"/>
      </div>
      <h1 class="home-title">Все пиццы</h1>
      <div class="home-items">
        <PizzaItem :items="items" :cart="cart"/>
      </div>
    </div>
  </div>
</template>

<style>

  .home {
    padding-top: 30px;
    padding-bottom: 30px;
  }

  .home-filter {
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
  }

  .home-title {
    margin-bottom: 35px;
    font-family: var(--font-family);
    font-weight: 700;
    font-size: 32px;
    letter-spacing: 0.01em;
    color: #000;
  }

  .home-items {
    display: flex;
    flex-wrap: wrap;
    gap: 60px;
  }

</style>
