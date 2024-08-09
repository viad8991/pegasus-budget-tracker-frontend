<script lang="ts" setup>
import {BButton, useModal} from "bootstrap-vue-next";
import {onMounted, ref} from "vue";
import {Category} from "../../store/category/categoryTypes";
import CategoryService from "../../services/CategoryService";
import {TransactionEnum, TransactionTypes, transactionTypesOptions} from "../../consts/TransactionTypes";
import {formatDate} from "../../utils/dateTime";
import {defaultFormFields, tableFields} from "./static/categoriesList";

const modal = useModal("category-modal-id");
const form = ref<Category>(defaultFormFields);
const incomingItems = ref<Category[]>();
const expenseItems = ref<Category[]>();
const selectedType = ref(TransactionTypes[TransactionEnum.INCOME]);

onMounted(async () => {
  await fetchCategories()
});

const fetchCategories = async () => {
  incomingItems.value = await CategoryService.getByType("INCOME")
  expenseItems.value = await CategoryService.getByType("EXPENSE")
};

const openCreateModal = async () => {
  form.value = defaultFormFields;
  modal.show()
};

const onRowClicked = async (row: Category) => {
  form.value = {...row};
  modal.show()
};

const onSave = async () => {
  if (form.value?.id) {
    await CategoryService.update(form.value.id, form.value.name, selectedType.value, form.value.description);
  } else {
    await CategoryService.create(form.value.name, selectedType.value, form.value.description);
  }
  await fetchCategories();
};
</script>

<template>

  <BButton @click="openCreateModal" variant="dark" class="mt-3">
    Добавить категорию
  </BButton>

  <h3>Список Категорий "{{ TransactionTypes[TransactionEnum.INCOME] }}"</h3>

  <BTable
      :fields="tableFields"
      :items="incomingItems"
      @row-clicked="onRowClicked"
      mode="single"
      :sort-by="[{key:'update', order: 'desc'}]"
  >
    <template #cell(update)="date">
      {{ formatDate(date.value) }}
    </template>

    <template #cell(created)="data">
      {{ formatDate(data.value) }}
    </template>
  </BTable>

  <h3>Список Категорий "{{ TransactionTypes[TransactionEnum.EXPENSE] }}"</h3>

  <BTable
      :fields="tableFields"
      :items="expenseItems"
      @row-clicked="onRowClicked"
      mode="single"
      :sort-by="[{key:'update', order: 'desc'}]"
  >
    <template #cell(update)="date">
      {{ formatDate(date.value) }}
    </template>

    <template #cell(created)="data">
      {{ formatDate(data.value) }}
    </template>
  </BTable>

  <BModal
      ref="category-modal-ref"
      id="category-modal-id"
      ok-title="Сохранить"
      cancel-title="Закрыть"
      :title="form.id ? 'Редактировать \'' + form.name + '\'' : 'Создать категорию'"
      @ok="onSave"
  >
    <BForm>
      <BFormGroup label="Название" label-for="category-name">
        <BFormInput
            id="category-name"
            v-model="form.name"
            required
            placeholder="Введите название"
        />
      </BFormGroup>

      <BFormGroup id="type-input-group" label="Тип:" label-for="type-input">
        <BFormSelect id="type-input" v-model="selectedType" :options="transactionTypesOptions" required/>
      </BFormGroup>

      <BFormGroup label="Описание" label-for="category-description">
        <BFormTextarea id="category-description" v-model="form.description" placeholder="Введите описание"/>
      </BFormGroup>
    </BForm>
  </BModal>

</template>

<style scoped>
/* Добавьте стили при необходимости */
</style>
