<template>
  <h1>Личный кабинет</h1>

  <BForm @submit="onSubmit">

    <p>ID: {{ userId }}</p>

    <BFormGroup label="Имя:" label-for="name-input">
      <BFormInput id="name-input" v-model="form.name" type="text" placeholder="Имя"></BFormInput>
    </BFormGroup>

    <BFormGroup label="E-Mail:" label-for="input-email">
      <BFormInput id="email-input" v-model="form.email" type="email" placeholder="Email" required></BFormInput>
    </BFormGroup>

    <BFormCheckbox id="has-family" v-model="form.hasFamily" :disabled="true">
      Состоит в семье
    </BFormCheckbox>

    <BFormCheckbox id="verified" v-model="form.verified" :disabled="true">
      Верифицирован
    </BFormCheckbox>

    <BButton submit="submit" class="mt-3">Сохранить</BButton>

  </BForm>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, computed} from "vue";
import {useRoute} from 'vue-router'
import {useAuthStore} from "../store/auth";
import UserService from "../services/UserService";

export default defineComponent({
  props: {
    userId: {type: String, required: false},
  },
  setup(props) {
    const userId = ref<string | null>(null);
    const form = ref({
      name: '',
      email: '',
      hasFamily: false,
      verified: false,
    });

    const fetchUserData = async (uid: string) => {
      try {
        const user = await UserService.find(uid);
        console.log(user)
        if (user) {
          userId.value = user.id || "";
          form.value.name = user.username || "";
          form.value.email = user.email || "";
          form.value.hasFamily = user.hasFamily || false;
          form.value.verified = user.verified || false;
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных пользователя:', error);
      }
    };

    const onSubmit = async (event: Event) => {
      event.preventDefault();
      try {
        alert(JSON.stringify(form.value));
        await UserService.update(userId.value, form.value);
        alert('Данные успешно обновлены!');
      } catch (error) {
        console.error('Ошибка при обновлении данных:', error);
      }
    };

    onMounted(() => {
      // Попытка получить ID пользователя из URL параметров или из хранилища
      const urlParams = new URLSearchParams(window.location.search);
      const urlUserId = urlParams.get('userId');

      if (urlUserId) {
        userId.value = urlUserId;
      } else {
        const authStore = useAuthStore();
        userId.value = authStore.id;
      }

      if (userId.value !== null) {
        fetchUserData(userId.value);
      } else {
        console.error('Не удалось определить ID пользователя');
      }
    });

    return {userId, form, onSubmit};
  }
});
</script>

<style scoped>
/* Добавьте стили при необходимости */
</style>
