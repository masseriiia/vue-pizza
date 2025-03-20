<script setup lang="ts">
const props = defineProps({
  currentPage: Number,
  totalPages: Number
})

const emit = defineEmits(['emit-paginate'])

function getPagination(page) {
  emit('emit-paginate', page)
}

</script>

<template>
  <div class="pagination">
    <button
      @click="getPagination(currentPage - 1)"
      :disabled="currentPage === 1"
    >
      Предыдущая
    </button>
    <div v-for="pageNumber in totalPages" :key="pageNumber">
      <button
        @click="getPagination(pageNumber)"
        :class="{ active: pageNumber === currentPage }"
      >
        {{ pageNumber }}
      </button>
    </div>
    <button
      @click="getPagination(currentPage + 1)"
      :disabled="currentPage === totalPages"
    >
      Следующая
    </button>
    <span> {{ currentPage }} из {{ totalPages }}</span>
  </div>
</template>

<style>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 30px;
  padding: 10px 0;
}

.pagination button {
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.pagination button:hover:not(:disabled) {
  background-color: #e9ecef;
  border-color: #ccc;
}

.pagination button:disabled {
  color: #999;
  background-color: #f8f9fa;
  border-color: #ddd;
  cursor: not-allowed;
}

.pagination span {
  font-size: 14px;
  color: #555;
  padding: 0 10px;
}

.pagination button.active {
  background-color: var(--color-orange);
  color: #fff;
  border-color: var(--color-orange);
}
</style>
