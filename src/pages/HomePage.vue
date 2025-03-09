<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import Button from '@/components/Button/Button.vue'

const items = ref([])
const typesNames = ['тонкое', 'традиционное']

const fetchItems = async () => {
  try {
    const { data } = await axios.get('https://49a3806d839655dd.mokky.dev/items')
    items.value = data.map(item => ({
      ...item,
      activeType: 0,
      activeSize: 0,
      count: 0
    }))
  } catch (e) {
    console.log('Ошибка', e)
  }
}

const onClickType = (item, index) => {
  item.activeType = index
}

const onClickSize = (item, index) => {
  item.activeSize = index
}

onMounted(fetchItems)


</script>

<template>
  <div class="home">
    <div class="home-wrapper">
      <h1 class="home-title">Все пиццы</h1>
      <div class="home-items">
        <div v-for="item of items" class="home-item" :key="item.id">
          <img :src="item.imageUrl" width="260" height="260" alt="Pizza">
          <div>
            <p class="home-item-name">{{ item.title }}</p>
            <div class="home-item-info">
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
            <div class="home-item-bottom">
              <p class="home-item-price">{{ item.price }} ₽</p>
              <Button @click="console.log(item)">+ Добавить</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

  .home {
    padding-top: 30px;
    padding-bottom: 30px;
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

  .home-item {

  }

  .home-item-name {
    margin-bottom: 22px;
    font-family: var(--font-family);
    font-weight: 800;
    font-size: 20px;
    letter-spacing: 0.01em;
    text-align: center;
    color: #000;
  }

  .home-item-info {
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

  .home-item-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .home-item-price {
    font-family: var(--font-family);
    font-weight: 700;
    font-size: 22px;
    letter-spacing: 0.01em;
    color: #000;
  }

</style>
