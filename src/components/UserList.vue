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

<script lang="ts">
import {onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';
import {User} from "../api/api";
import UserService from "../services/UserService";

export default {
  setup() {
    const router = useRouter();

    const fields = ref([
      {key: 'username', label: 'Имя пользователя'},
      {key: 'email', label: 'E-Mail'},
      {key: 'verified', label: 'Верифицирован'},
      {key: 'hasFamily', label: 'Семья'},
      {key: 'isActive', label: 'Активен'},
    ]);

    const items = ref<User[]>([]);

    const fetchUsers = async () => {
      const users = await UserService.all();
      if (users) {
        items.value = users;
      } else {
        console.error('Не удалось загрузить список пользователей');
      }
    };

    onMounted(fetchUsers);

    const onRowClicked = (row: User) => {
      console.log('1 Selected row:', row);
      router.push({name: 'Профиль', params: {id: row.id}})
    };

    return {fields, items, onRowClicked}
  }
};
</script>

<style scoped>
/* Добавьте стили при необходимости */
</style>
