<script lang="ts" setup>
import {useAuthStore} from "../../store/auth/authStore";
import {useRouter} from "vue-router";
import {ref} from "vue";

const authStore = useAuthStore();
const router = useRouter();

const username = ref("");
const password = ref("");
const errorMessage = ref("");

async function handleLogin() {
  errorMessage.value = '';
  const user = await authStore.auth(username.value, password.value)

  if (user) {
    await router.push('/');
  } else {
    errorMessage.value = "Ошибка авторизации";
  }
}
</script>

<template>
  <BForm @submit="handleLogin">

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

<style scoped>

</style>