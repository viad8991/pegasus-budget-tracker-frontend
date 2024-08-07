<script lang="ts" setup>
import {onMounted} from "vue";
import TransactionService from "../../services/TransactionService";
import CategoryService from "../../services/CategoryService";
import {categoriesType, form, transactionType} from './static/addTransactionFields';
import {Category} from "../../store/category/types/categoryTypes";

const onSubmit = async () => {
  await TransactionService.create(form.type, form.amount, form.category)
}

onMounted(async () => {
  const categoriesFromServer = await CategoryService.all();
  categoriesType.value = [
    {text: '...', value: {} as Category, disabled: true},
    ...categoriesFromServer.map(category => ({
      text: category.name,
      value: category,
      disabled: false
    }))
  ];
});
</script>

<template>
  <h3 class="text-center">Добавить операцию</h3>
  <BForm @submit="onSubmit">

    <BFormGroup id="amount-input-group" label="Сумма:" label-for="amount-input">
      <BFormInput id="amount-input" v-model="form.amount" type="number" placeholder="Сумма" required/>
    </BFormGroup>

    <BFormGroup id="type-input-group" label="Тип:" label-for="type-input">
      <BFormSelect id="type-input" v-model="form.type" :options="transactionType" required/>
    </BFormGroup>

    <BFormGroup id="transaction-type-input-group" label="Категория:" label-for="transaction-type-input">
      <BFormSelect id="transaction-type-input" v-model="form.category" :options="categoriesType" required/>
    </BFormGroup>

    <BButton type="submit" variant="dark" class="w-100 my-3">Сохранить</BButton>

  </BForm>
</template>

<style scoped>

</style>