<script lang="ts">
import {useAuthStore} from "../auth/store/authStore";

import Family from '../components/Family/Family.vue';
import CreateFamily from '../components/CreateFamily/CreateFamily.vue';

export default {
  name: "FamilyView",
  components: {Family, CreateFamily},
  setup() {
    const authStore = useAuthStore();
    return {authStore};
  },
};
</script>

<template>
  <h1>Семья</h1>

  <Family v-if="authStore.hasFamily"/>
  <CreateFamily v-else/>

</template>

<style scoped>
/* Добавьте стили при необходимости */
</style>
