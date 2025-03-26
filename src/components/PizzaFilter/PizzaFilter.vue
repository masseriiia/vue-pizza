<script setup lang="ts">
import UiButton from '@/components/UiButton/UiButton.vue'

interface Filters {
  pizzaNewBoolean: boolean
  formDataPrice: {
    priceFrom: number | null
    priceTo: number | null
  }
}

const props = defineProps<{ filters: Filters }>()

const emit = defineEmits<{
  (event: 'emit-new', value: boolean): void
  (event: 'emit-price'): void
  (event: 'emit-reset'): void
}>()

function toggleNewPizzas(value: boolean) {
  emit('emit-new', !value)
}
function applyPriceFilter() {
  emit('emit-price')
}
function resetFilters() {
  emit('emit-reset')
}

</script>

<template>
  <div class="filter">
    <h2 class="filter-title">Фильтрация</h2>

    <div class="filter-content">
      <form class="form">
        <fieldset class="form-fieldset">
          <label class="container">Новинки
            <input class="main-checkbox" type="checkbox" v-model="filters.pizzaNewBoolean" @change="toggleNewPizzas(filters.pizzaNewBoolean)" id="new-pizzas" name="new">
            <span class="checkmark"></span>
          </label>
        </fieldset>
      </form>
    </div>
    <div class="filter-content">
      <form class="form">
        <fieldset class="form-fieldset">
          <legend class="form-legend">Цена от и до:</legend>
          <div class="form-inputs">
            <div class="input-wrapper">
              <input class="input" type="number" v-model="filters.formDataPrice.priceFrom" name="priceFrom">
              <span class="input-symbol">₽</span>
            </div>
            <div class="input-wrapper">
              <input class="input" type="number" v-model="filters.formDataPrice.priceTo" name="priceTo">
              <span class="input-symbol">₽</span>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
    <button class="button-price-reset" @click="resetFilters">сбросить</button>
    <UiButton option="button" @click="applyPriceFilter">Применить</UiButton>
  </div>
</template>

<style scoped>

.filter-title {
  margin-bottom: 30px;
  font-family: var(--font-family);
  font-weight: 700;
  font-size: 22px;
  color: var(--color-black-secondary);
}

.filter-content {
  margin-bottom: 15px;
}

.form-fieldset {
  border: none;
}

.button-price-reset {
  margin-right: auto;
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  color: #ccc;
  cursor: pointer;
}

.form-legend {
  margin-bottom: 15px;
  font-family: var(--font-family);
  font-weight: 700;
  font-size: 16px;
  color: var(--color-black-secondary);
}

.form-inputs {
  display: flex;
  gap: 15px;
  width: 100%;
}

.input-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
}

.input {
  padding-top: 11px;
  padding-left: 12px;
  padding-right: 24px;
  padding-bottom: 11px;
  flex: 1;
  max-width: 90px;

  font-family: var(--font-family);
  font-weight: 400;
  font-size: 14px;
  color: var(--color-black-secondary);

  border: 1px solid #f6f6f6;
  border-radius: 10px;
}

.input-symbol {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #BBB;
}

.container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 16px;
  color: #333;
  user-select: none;
}

.container .main-checkbox {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: var(--color-gray);
  border-radius: 5px;
  transition: all 0.3s ease;
}

.container .main-checkbox:checked ~ .checkmark {
  background-color: var(--color-orange);
  border-color: var(--color-orange);
}

.checkmark::after {
  content: "";
  position: absolute;
  display: none;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.container .main-checkbox:checked ~ .checkmark::after {
  display: block;
}

.container .main-checkbox:active ~ .checkmark {
  transform: scale(0.9);
}

.container .main-checkbox:disabled ~ .checkmark {
  background-color: #e0e0e0;
  border-color: #ccc;
  cursor: not-allowed;
}

.container .main-checkbox:disabled ~ .checkmark::after {
  border-color: #ccc;
}
</style>
