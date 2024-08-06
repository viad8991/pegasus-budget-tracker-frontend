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
import {Category} from "../api/api";
import CategoryService from "../services/CategoryService";
import {BButton} from "bootstrap-vue-next";
import dayjs from 'dayjs';

export default {
  components: {BButton},
  data() {
    return {
      // TODO
      // статика в отдельный файл
      fields: [
        {key: 'id', label: 'ID', type: "text"},
        {key: 'name', label: 'Название', type: "text"},
        {key: 'description', label: 'Описание', type: "text"},
        {key: 'update', label: 'Обновление', type: "datetime"},
        {key: 'created', label: 'Создание', type: "datetime"},
      ],
      items: [] as Category[],
      form: {id: null, name: "", description: null} as Category,
    }
  },
  methods: {
    async fetchCategories() {
      this.items = await CategoryService.all()
    },
    openCreateModal() {
      // TODO
      // данные для формы в отдельный стор, форму в отдельный компонент
      this.form = {id: null, name: '', description: null};
      (this.$refs["category-modal-ref"] as any).show()
    },
    onRowClicked(row: Category) {
      this.form = {...row};
      (this.$refs["category-modal-ref"] as any).show()
    },
    async onSave() {
      if (this.form.id) {
        await CategoryService.update(this.form);
      } else {
        await CategoryService.create(this.form);
      }
      await this.fetchCategories();
    },
    formatDate(isoString: string) {
      return dayjs(isoString).format('YYYY.MM.DD HH:mm:ss');
    }
  },
  mounted() {
    this.fetchCategories()
  },
};
</script>

<style scoped>
/* Добавьте стили при необходимости */
</style>
