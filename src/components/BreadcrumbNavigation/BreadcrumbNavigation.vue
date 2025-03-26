<script setup lang="ts">
const props = defineProps<{
  title: string
}>()

</script>

<template>
  <ul class="breadcrumb">
    <li><RouterLink class="pizza-location" to="/">Главная</RouterLink></li>
    <li><span class="pizza-location">/</span></li>
    <li><RouterLink class="pizza-location" to="/">Пиццы</RouterLink></li>
    <li><span class="pizza-location">/</span></li>
    <li class="pizza-location"><span>{{ title }}</span></li>
  </ul>
</template>

<style scoped>
.breadcrumb {
  display: flex;
  justify-content: flex-start;
  gap: 5px;

  li {
    flex: none;
  }
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
</style>
