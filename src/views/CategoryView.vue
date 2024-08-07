<template>

  <h1>Список Категорий</h1>

  <BTable
      :fields="fields"
      :items="items"
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

  <BButton @click="openCreateModal" variant="dark" class="mt-3">
    Добавить категорию
  </BButton>

  <BModal
      ref="category-modal-ref"
      id="category-modal-id"
      ok-title="Сохранить"
      cancel-title="Закрыть"
      :title="form.id ? 'Редактировать \'' + form.name + '\'' : 'Создать категорию'"
      @ok="onSave"
  ><!-- v-model="modal" -->
    <BForm>
      <BFormGroup label="Название" label-for="category-name">
        <BFormInput
            id="category-name"
            v-model="form.name"
            required
            placeholder="Введите название"
        />
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

<script lang="ts" setup>
import CategoryService from "../services/CategoryService";
import {BButton, useModal} from "bootstrap-vue-next";
import {onMounted, ref} from "vue";
import {Category} from "../store/category/types/categoryTypes";
import {formatDate} from "../utils/dateTime";

// const {show, hide, modal} = useModal('my-modal'); // (this.$refs["category-modal-ref"] as any).show()
const form = ref<Category>({id: "", name: "", description: null});
const items = ref<Category[]>();
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
  items.value = await CategoryService.all()
};

const openCreateModal = async () => {
  // TODO
  // данные для формы в отдельный стор, форму в отдельный компонент
  form.value = {id: "", name: "", description: null};
  // modal.show()
  // show()
};

const onRowClicked = async (row: Category) => {
  console.log(row)
  form.value = {...row};
  // modal.show()
  // show()
};

const onSave = async () => {
  if (form.value?.id) {
    await CategoryService.update(form.value);
  } else {
    await CategoryService.create(form.value);
  }
  await fetchCategories();
};
</script>

<style scoped>
/* Добавьте стили при необходимости */
</style>
