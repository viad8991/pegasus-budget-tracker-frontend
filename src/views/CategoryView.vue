<template>

  <h1>Список Категорий</h1>

  <BTable
      :fields="fields"
      :items="items"
      @row-clicked="onRowClicked"
      mode="single"
  >
  </BTable>

  <BButton
      @click="openCreateModal"
      v-b-modal="'category-modal'"
      variant="dark" class="mt-3"
  >
    Добавить категорию
  </BButton>

  <BModal
      ref="category-modal-ref"
      id="category-modal-id"
      :title="isEditing ? 'Редактировать категорию' : 'Создать категорию'"
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

<script lang="ts">
import {onMounted, ref} from "vue";
import {Category} from "../api/api";
import CategoryService from "../services/CategoryService";
import {useModalController, vBModal} from "bootstrap-vue-next";

export default {
  setup() {
    const fields = ref([
      {key: 'id', label: 'ID'},
      {key: 'name', label: 'Название'},
      {key: 'description', label: 'Описание'},
      {key: 'created', label: 'Создание'},
      {key: 'update', label: 'Обновление'},
    ]);

    const form = ref(
        {id: null, name: '', description: null}
    );
    const isEditing = ref(false);

    const items = ref<Category[]>([]);
    const {show} = useModalController()

    const fetchCategories = async () => {
      const categories = await CategoryService.all();
      if (categories) {
        items.value = categories;
      } else {
        console.error('Не удалось загрузить список категорий');
        items.value = [
          {id: "e2f7f98e-ac7d-4cce-8668-977664762195", name: "Супермаркеты", description: "null"},
          {id: "bfa59f21-b7af-4db1-9287-b5974e3e6481", name: "Кафе и рестораны", description: "null"}
        ]
      }
    };

    onMounted(fetchCategories);

    const onRowClicked = (row: Category) => {
      console.log('Selected row:', row);
      form.value = {...row};
      isEditing.value = true;

    };

    const openCreateModal = () => {
      form.value = {id: null, name: '', description: null};
      isEditing.value = false;
    };

    const onSave = async () => {
      if (isEditing.value) {
        await CategoryService.update(form.value);
      } else {
        await CategoryService.create(form.value);
      }
      await fetchCategories();
    };

    return {fields, items, form, isEditing, onRowClicked, openCreateModal, onSave}
  }
};
</script>

<style scoped>
/* Добавьте стили при необходимости */
</style>
