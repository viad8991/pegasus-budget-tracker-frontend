<script lang="ts" setup>
import {onMounted, watch} from "vue";
import TransactionService from "../../services/TransactionService";
import CategoryService from "../../services/CategoryService";
import {categoriesType, form, selectedType, transactionTypes} from './static/addTransactionFields';
import {Category} from "../../store/category/types/categoryTypes";

onMounted(async () => {

});

watch(selectedType, async (newType, _) => {
  const categoriesFromServer = await CategoryService.getByType(newType);
  categoriesType.value = [
    {text: '...', value: {} as Category, disabled: true},
    ...categoriesFromServer.map(category => ({
      text: category.name,
      value: category,
      disabled: false
    }))
  ];
})

const onSubmit = async () => {
  await TransactionService.create(form.amount, form.category)
}
</script>

<template>
  <h3 class="text-center">Добавить операцию</h3>
  <BForm @submit="onSubmit">

    <BFormGroup id="amount-input-group" label="Сумма:" label-for="amount-input">
      <BFormInput id="amount-input" v-model="form.amount" type="number" placeholder="Сумма" required/>
    </BFormGroup>

    <BFormGroup id="type-input-group" label="Тип:" label-for="type-input">
      <BFormSelect id="type-input" v-model="selectedType" :options="transactionTypes" required/>
    </BFormGroup>

    <BFormGroup id="category-input-group" label="Категория:" label-for="category-input">
      <BFormSelect id="category-input" v-model="form.category" :options="categoriesType" required/>
    </BFormGroup>

    <BButton type="submit" variant="dark" class="w-100 my-3">Сохранить</BButton>

  </BForm>
</template>

<style scoped>

</style>