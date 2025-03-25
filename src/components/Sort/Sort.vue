<script setup lang="ts" >
  const emit = defineEmits<{
    (event: 'onChangeSelect', value: string): void
  }>()

  function onChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    emit('onChangeSelect', target.value)
  }

</script>

<template>
  <div class="sort">
    <img src="@/assets/icons/sort.svg" alt="Сортировка"/>
    <span class="sort-title">Сортировать по:</span>
    <select @change="onChange" class="sort-items">
      <option value="title" class="home-sort-item">названию</option>
      <option value="price" class="home-sort-item">возрастанию</option>
      <option value="-price" class="home-sort-item">убыванию</option>
    </select>
  </div>
</template>

<style>
.sort {
  padding: 16px 22px;
  display: flex;
  align-items: center;
  gap: 5px;
  border: none;
  border-radius: 15px;
  background: #f9fafb;
}

.sort-items {
  font-family: var(--font-family);
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  color: #fe5f00;
  background: none;
  border: none;
}

.sort-title {
  font-family: var(--font-family);
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  color: #202020;
}
</style>
