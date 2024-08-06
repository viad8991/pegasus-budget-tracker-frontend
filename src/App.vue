<script lang="ts">
import Header from './components/Header.vue';
import {defineComponent} from "vue";
import {useAuthStore} from "./store/auth/store/authStore";

// TODO
// сделать файл настройек для http-client-a, можно взять пример у Arttek-a axios.js
// сделать HtppService пример у Arttek-a
// изолировать сторы от прямой работы с бизнес логиков (запросов на сервер), это должно быть в серсивах, а сторы вызывают методы сервисов

const authStore = useAuthStore();

authStore.authenticate();
</script>

<template>
  <Header/>
  <div class="container">
    <router-view></router-view>
  </div>
</template>
