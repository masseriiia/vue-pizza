<script setup lang="ts">
const props = defineProps<{
  option: string
}>()
</script>

<template>
  <button :class="[option]">
    <slot></slot>
  </button>
</template>

<style scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 15px 23px;
  width: 100%;
  max-width: 180px;

  font-family: var(--font-family);
  font-weight: 700;
  font-size: 16px;
  color: var(--color-white);

  color: var(--color-gray-line);
  border-radius: 30px;
  border: none;
  background-color: var(--color-orange);
  cursor: pointer;
}

.button-secondary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 15px 23px;
  width: 100%;
  max-width: 180px;

  font-family: var(--font-family);
  font-weight: 700;
  font-size: 16px;
  color: var(--color-white);

  color: var(--color-orange);
  border-radius: 30px;
  border: 1px solid var(--color-orange);
  background: none;
  cursor: pointer;
}

.button-outlined {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px;

  font-family: var(--font-family);
  font-weight: 700;
  font-size: 16px;

  border-radius: 10px;
  color: var(--color-orange);
  border: 1px solid var(--color-orange);
  background: none;
  cursor: pointer;
}
</style>
