<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import PizzaItem from '@/components/CartItem/PizzaItem.vue'
import Sort from '@/components/Sort/Sort.vue'

const cart = ref(JSON.parse(localStorage.getItem('pizzas')))
const items = ref([])

const sortBy = ref('rating')

const onChangeSelect = value => {
  sortBy.value = value;
  fetchItems()
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: sortBy.value
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

onMounted(async () => {
  await fetchItems()
})

</script>

<template>
  <div class="home">
    <div class="home-wrapper">
      <div class="home-filter">
        <div></div>
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
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 60px;
  }

</style>
