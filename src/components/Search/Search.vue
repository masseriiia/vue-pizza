<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fetchPizzas } from '@/services/pizzaService.ts'

defineProps({
  isOverlayVisible: Boolean,
  close: Function
})

const emit = defineEmits(['toggle-overlay'])

const items = ref([])
const search = ref('')

const loadPizzas = async () => {
  items.value = await fetchPizzas()
}

const itemsProducts = computed(() => {
  if (search.value.length > 0) {
    return items.value.filter((pizza) => pizza.title.toLowerCase().indexOf(search.value) !== -1)
  }
})

const onTogglePizza = (e) => {
  e.stopPropagation()
  emit('toggle-overlay')
}

const handleKeyDown = (e) => {
  if (e.key === 'Escape') {
    emit('toggle-overlay')
  }
}

onMounted(() => {
  loadPizzas()
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => document.removeEventListener('keydown', handleKeyDown))
</script>

<template>
  <div class="search">
    <div class="search-content">
      <img class="search-icon" src="../../assets/icons/search.svg" alt="Search" />
      <input @click="onTogglePizza" class="search-input" type="search" v-model="search" placeholder="Поиск пиццы..." />
    </div>
    <ul class="search-items">
      <li class="search-item" :class="{'noActive': !isOverlayVisible}" v-for="item in itemsProducts" :key="item.id">
        <img
          :src="item.image_url"
          width="40"
          alt="Pizza"
        />
        <p>{{ item.title }}</p>
        <p class="search-item-price">{{ item.price }} ₽</p>
      </li>
    </ul>
    <div v-if="isOverlayVisible" class="overlay" @click.self="close"></div>
  </div>
</template>

<style>
.search {
  width: 874px;
  opacity: 1;
  z-index: 99;
}

.search-content {
  position: relative;
  padding: 14px 20px;
  display: flex;
  gap: 12px;
  background-color: #f9f9f9;
  border-radius: 15px;
  width: 100%;
  max-width: 764px;
  z-index: 99;
}

.search-input {
  font-family: var(--font-family);
  width: 100%;
  max-width: 764px;
  font-weight: 400;
  font-size: 16px;
  color: #494949;
  border: none;
  background: none;
  z-index: 99;
}

.search-input:focus {
  z-index: 99;
  outline: none;
}

.search-items {
  margin-top: 10px;
  width: 100%;
  max-width: 784px;
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 10px;
  z-index: 99;
}

.search-item {
  padding: 10px 19px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: background-color 0.3s ease-in-out;
  z-index: 99;
}

.search-item:hover {
  background-color: #fffaf6;
}

.search-item-price {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 14px;
  color: #858585;
}

.noActive {
  display: none;
}
</style>
