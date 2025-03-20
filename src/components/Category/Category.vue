<script setup lang="ts">

defineProps({
  activeCategory: Number
})

const emit = defineEmits("onClickCategory")

const category = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрыте"]

const onChange = (id) => {
  emit("onClickCategory", id)
}

</script>
<template>
  <div class="category">
    <ul class="category-items">
      <li
        class="category-item"
        :class="{active: activeCategory === index }"
        v-for="(item, index) in category"
        @click="onChange(index)"
        :key="index"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<style>
.category-items {
  padding: 5px;
  display: flex;
  gap: 5px;
  border-radius: 15px;
  background-color: var(--color-gray);
}

.category-item {
  padding: 10px 15px;
  font-family: var(--font-family);
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  color: #202020;
  list-style-type: none;
  border-radius: 15px;
}

.category-item.active {
  background-color: #fff;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.05);
}
</style>
