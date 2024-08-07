<script lang="ts" setup>
import Header from './components/Header/Header.vue';

// TODO
// сделать файл настройек для http-client-a, можно взять пример у Arttek-a axios.js
// сделать HtppService пример у Arttek-a
// изолировать сторы от прямой работы с бизнес логиков (запросов на сервер), это должно быть в серсивах, а сторы вызывают методы сервисов

</script>

<template>
  <Header/>
  <div class="container">
    <router-view></router-view>
  </div>
</template>
