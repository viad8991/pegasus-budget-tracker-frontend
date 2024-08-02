<template>
  <BForm @submit.prevent="handleLogin">

    <BFormFloatingLabel label="Login" label-for="floatingEmail" class="my-2">
      <BFormInput v-model="username" id="username" type="text" placeholder="Login"/>
    </BFormFloatingLabel>

    <BFormFloatingLabel label="Password" label-for="floatingPassword" class="my-2">
      <BFormInput v-model="password" id="password" type="password" placeholder="Password"/>
    </BFormFloatingLabel>

    <BButton type="submit" variant="dark" class="w-100 my-3">Войти</BButton>

  </BForm>

  <BAlert variant="danger" show v-if="errorMessage">{{ errorMessage }}</BAlert>

</template>

<script lang="ts" setup>
import {ref} from 'vue';
import {BForm, BFormFloatingLabel, BFormInput, BButton} from 'bootstrap-vue-next';
import {useRouter} from 'vue-router';
import {useAuthStore} from "../store/auth";

const authStore = useAuthStore();
const router = useRouter();

const username = ref('');
const password = ref('');
const errorMessage = ref('');

const handleLogin = async () => {
  errorMessage.value = '';

  try {
    const user = authStore.auth(username.value, password.value)

    if (!user) {
      console.log("Ошибка авторизации")
      errorMessage.value = "Ошибка авторизации";
    }

    await router.push('/');
  } catch (error) {
    console.error('Ошибка:', error);
    errorMessage.value = "Ошибка авторизации" ;
  }
};
</script>
