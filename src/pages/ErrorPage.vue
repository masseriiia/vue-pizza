<script setup lang="ts">

import SecondaryButton from '@/components/SecondaryButton/SecondaryButton.vue'
</script>

<template>
  <div class="error">
    <div class="error-wrapper">
      <div class="error-content">
        <h2 class="error-title">Страница не найдена</h2>
        <p class="error-description">Проверьте корректность введённого адреса или повторите попытку позже</p>
        <RouterLink to="/">
          <SecondaryButton> &larr; На главную </SecondaryButton>
        </RouterLink>
      </div>
      <img src="@/assets/images/error.png" alt="Error">
    </div>
  </div>
</template>

<style>

.error {

}

.error-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 600px;
  gap: 60px;
}

.error-content {
  width: 445px;
}

.error-title {
  margin-bottom: 15px;
  font-family: var(--font-family);
  font-weight: 800;
  font-size: 40px;
  letter-spacing: 0em;
  color: #000;
}

.error-description {
  margin-bottom: 45px;
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 20px;
  letter-spacing: 0em;
  color: #999;
}

</style>
