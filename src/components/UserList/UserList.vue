<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';
import {User} from "../../api/api";
import UserService from "../../services/UserService";

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
  <div class="container">
    <h1>Список пользователей</h1>
    <BTable
        :fields="fields"
        :items="items"
        @row-clicked="onRowClicked"
        mode="single"
    >
    </BTable>
  </div>
</template>

<style scoped>
/* Добавьте стили при необходимости */
</style>
