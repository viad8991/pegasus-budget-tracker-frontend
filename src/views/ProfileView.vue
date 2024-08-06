<template>

  <h1>Личный кабинет</h1>

  <Profile/>

</template>

<script lang="ts">
import Profile from "../components/Profile/Profile.vue";

export default {
  name: "ProfileView",
  components: {Profile},
};
</script>

<style scoped>
/* Добавьте стили при необходимости */
</style>
