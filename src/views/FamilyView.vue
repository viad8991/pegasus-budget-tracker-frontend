<script lang="ts" setup>
import {useAuthStore} from "../store/auth/store/authStore";

import Family from '../components/Family/Family.vue';
import CreateFamily from '../components/CreateFamily/CreateFamily.vue';

const {hasFamily} = useAuthStore();

</script>

<template>
  <h1>Семья</h1>

  <Family v-if="hasFamily"/>
  <CreateFamily v-else/>

</template>

<style scoped>
/* Добавьте стили при необходимости */
</style>
