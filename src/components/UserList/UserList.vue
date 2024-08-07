<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';
import UserService from "../../services/UserService";
import {tableRow} from "./static/userTableFields";
import {User} from "../../store/user/types/userTypes";

const router = useRouter();

// TODO
// статика в отдельный файл рядом с компонентом
const fields = ref(tableRow);

// TODO
// данные для отдельного стора
const items = ref<User[]>([]);

const fetchUsers = async () => {
  const users = await UserService.all();
  if (users) {
    items.value = users;
  } else {
    console.error('Не удалось загрузить список пользователей');
  }
};

const onRowClicked = (row: User) => {
  router.push({name: 'Профиль', params: {id: row.id}})
};

onMounted(fetchUsers);

</script>

<template>
  <h3>Список пользователей</h3>
  <BTable
      :fields="fields"
      :items="items"
      @row-clicked="onRowClicked"
      mode="single"
  >
  </BTable>
</template>

<style scoped>
/* Добавьте стили при необходимости */
</style>
