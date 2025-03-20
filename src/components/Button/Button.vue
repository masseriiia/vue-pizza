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
</style>
