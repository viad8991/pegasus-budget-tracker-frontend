<script lang="ts" setup>
import CategoryService from "../services/CategoryService";
import {BButton, useModal} from "bootstrap-vue-next";
import {onMounted, ref} from "vue";
import {Category} from "../store/category/types/categoryTypes";
import {formatDate} from "../utils/dateTime";
import {selectedType, transactionTypes} from "../components/AddTransaction/static/addTransactionFields";

const modal = useModal("category-modal-id");
const form = ref<Category>({id: "", name: "", type: "", description: null});
const incomingItems = ref<Category[]>();
const expenseItems = ref<Category[]>();

const fields = [
  {key: 'id', label: 'ID', type: "text"},
  {key: 'name', label: 'Название', type: "text"},
  {key: 'description', label: 'Описание', type: "text"},
  {key: 'update', label: 'Обновление', type: "datetime"},
  {key: 'created', label: 'Создание', type: "datetime"},
];

onMounted(async () => {
  await fetchCategories()
});

const fetchCategories = async () => {
  incomingItems.value = await CategoryService.getByType("INCOME")
  expenseItems.value = await CategoryService.getByType("EXPENSE")
};

const openCreateModal = async () => {
  // TODO
  // данные для формы в отдельный стор, форму в отдельный компонент
  form.value = {id: "", type: "", name: "", description: null};
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

  <h3>Список Категорий 'Приход'</h3>

  <BTable
      :fields="fields"
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

  <h3>Список Категорий 'Списания'</h3>

  <BTable
      :fields="fields"
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
        <BFormSelect id="type-input" v-model="selectedType" :options="transactionTypes" required/>
      </BFormGroup>

      <BFormGroup label="Описание" label-for="category-description">
        <BFormTextarea
            id="category-description"
            v-model="form.description"
            placeholder="Введите описание"
        />
      </BFormGroup>
    </BForm>
  </BModal>

</template>

<style scoped>
/* Добавьте стили при необходимости */
</style>
