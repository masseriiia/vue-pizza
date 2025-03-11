<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<style scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px;
  width: 30px;
  height: 30px;

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
<script setup lang="ts">
</script>
