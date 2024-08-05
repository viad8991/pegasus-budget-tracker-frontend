<template>
  <h1>Семья</h1>
  
  <Family v-if="authStore.hasFamily" /> <CreateFamily v-else />

</template>

<script lang="ts">
  import Family from '../components/Family/Family.vue';
  import CreateFamily  from '../components/Family/CreateFamily.vue';
  
  import { defineComponent } from 'vue';
  import { useAuthStore } from "../store/auth";

  export default defineComponent({
    components: { Family, CreateFamily },
    
    setup() {
      const authStore = useAuthStore();

      return { authStore };
    },
  });
</script>

<style scoped>
/* Добавьте стили при необходимости */
</style>
