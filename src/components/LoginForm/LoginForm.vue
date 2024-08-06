<script lang="ts">
import {useAuthStore} from "../../auth/store/authStore";
import {useRouter} from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

export default {
  name: "LoginForm",
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    }
  },
  methods: {
    async handleLogin() {
      this.errorMessage = '';

      // TODO
      // Тут try catch, внутри authStore.auth try catch это bad practise
      // Позови как-нибудь, я расскажу как правильно организовать структуру обработки ошибок
      const user = await authStore.auth(this.username, this.password)

      if (user) {
        await router.push('/');
      } else {
        this.errorMessage = "Ошибка авторизации";
      }
    }
  }
};
</script>

<template>
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

<style scoped>

</style>