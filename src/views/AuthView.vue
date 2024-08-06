<template>
<!--  TODO весь блок BForm до 15 строки здесь это отдельный компонент, надо выносить -->
  <BForm @submit.prevent="handleLogin">

    <BFormFloatingLabel label="Login" label-for="floatingEmail" class="my-2">
      <BFormInput v-model="username" id="username" type="text" placeholder="Login"/>
    </BFormFloatingLabel>

    <BFormFloatingLabel label="Password" label-for="floatingPassword" class="my-2">
      <BFormInput v-model="password" id="password" type="password" placeholder="Password"/>
    </BFormFloatingLabel>

    <BButton @click="handleLogin" type="submit" variant="dark" class="w-100 my-3">Войти</BButton>

  </BForm>

  <BAlert variant="danger" show v-if="errorMessage">{{ errorMessage }}</BAlert>

</template>

<script lang="ts" setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {useAuthStore} from "../store/auth/store/authStore";

const authStore = useAuthStore();
const router = useRouter();

// TODO
// Данные для вынесения в отдельный стор AuthStore/AuthFormStore
const username = ref('');
const password = ref('');
const errorMessage = ref('');

const handleLogin = async () => {
  errorMessage.value = '';

  // TODO
  // Тут try catch, внутри authStore.auth try catch это bad practise
  // Позови как-нибудь, я расскажу как правильно организовать структуру обработки ошибок
  try {
    const user = await authStore.auth(username.value, password.value)

    if (user) {
      await router.push('/');
    } else {
      console.log("Ошибка авторизации")
      errorMessage.value = "Ошибка авторизации";
    }


  } catch (error) {
    console.error('Ошибка:', error);
    errorMessage.value = "Ошибка авторизации" ;
  }
};
</script>
