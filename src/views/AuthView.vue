<template>
  <!--  TODO весь блок BForm до 15 строки здесь это отдельный компонент, надо выносить -->
  <LoginForm/>

  <!-- <BAlert variant="danger" show v-if="errorMessage">{{ errorMessage }}</BAlert>-->

</template>

<script lang="ts" setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {useAuthStore} from "../store/auth/authStore";
import LoginForm from "../components/LoginForm/LoginForm.vue";

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
    errorMessage.value = "Ошибка авторизации";
  }
};
</script>
