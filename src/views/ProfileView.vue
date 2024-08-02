<template>
  <h1>Личный кабинет</h1>
  
  <BForm @submit="onSubmit" @reset="onReset" v-if="show">

    <p>ID: {{ userId }}</p>
    
    <BFormGroup id="input-group-1" label="E-Mail:" label-for="input-email">
      <BFormInput id="email-input" v-model="form.email" type="email" placeholder="Email" required></BFormInput>        
    </BFormGroup>

    <BFormGroup id="input-group-2" label="Имя:" label-for="input-username">
      <BFormInput id="name-inpu" v-model="form.name" type="text" placeholder="Имя"></BFormInput>        
    </BFormGroup>

    <BButton submit="submit" class="pt-2">Сохранить</BButton>

  </BForm>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref, computed } from "vue";
  import { useRoute } from 'vue-router'
  
  export default defineComponent({
    props: {
      userId: { type: Number, required: false },
    },
    setup(props) {
      const route = useRoute()

      const form = ref({
        email: '',
        name: '',
      });
      const show = ref(false)

      const isCurrentUserProfile = computed(() => {
        return !props.userId; // || props.userId === authStore.user.id;
      });

      const fetchUserProfile = () => {
        let user = { email: "asd", username: "asdasd"}; // authStore.user;
        if (props.userId && props.userId !== user.id) {
          user = null;// authStore.getUserById(props.userId);
        }

        if (user) {
          form.value.email = user.email;
          form.value.name = user.username;
        }
      };

      onMounted(() => {
        fetchUserProfile();
      });

      const onSubmit = (event: Event) => {
        event.preventDefault();
        alert(JSON.stringify(form.value));
      };

      return { form, show, isCurrentUserProfile, onSubmit };
    }
  });
</script>

<style scoped>
/* Добавьте стили при необходимости */
</style>
