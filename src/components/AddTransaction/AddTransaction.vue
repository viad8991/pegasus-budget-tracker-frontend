<script lang="ts" setup>
import {onMounted, reactive, ref, watch} from "vue";
import TransactionService from "../../services/TransactionService";
import CategoryService from "../../services/CategoryService";
import {CategoryTypes} from './static/addTransactionFields';
import {Category} from "../../store/category/categoryTypes";
import {TransactionEnum, TransactionTypes, transactionTypesOptions} from "../../consts/TransactionTypes";

const categoriesType = ref<CategoryTypes[]>([])
const selectedType = ref(TransactionTypes[TransactionEnum.INCOME]);
const form = reactive({
  type: TransactionTypes[TransactionEnum.INCOME],
  amount: 0,
  category: {} as Category,
})

onMounted(async () => {
  selectedType.value = TransactionEnum.INCOME;
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
      <BFormSelect id="type-input" v-model="selectedType" :options="transactionTypesOptions" required/>
    </BFormGroup>

    <BFormGroup id="category-input-group" label="Категория:" label-for="category-input">
      <BFormSelect id="category-input" v-model="form.category" :options="categoriesType" required/>
    </BFormGroup>

    <BButton type="submit" variant="dark" class="w-100 my-3">Сохранить</BButton>

  </BForm>
</template>

<style scoped>

</style>
