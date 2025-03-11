<script setup lang="ts">
import Header from '@/layouts/Header.vue'

</script>

<template>
  <div class="wrapper">
    <Header/>
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<style>
  .wrapper {
    width: 90vw;
    height: 100%;
    margin: 50px auto;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 0 15px 20px 0 rgba(0, 0, 0, 0.03);
  }

  .content {
    padding: 40px 60px;
  }
</style>
