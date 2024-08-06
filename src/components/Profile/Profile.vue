<script lang="ts">
import {ref} from 'vue'
import {useAuthStore} from "../../auth/store/authStore";
import {useRoute, useRouter} from "vue-router";
import UserService from "../../services/UserService";

export default {
  name: "Profile",
  data() {
    return {
      userId: ref<string | null>(useAuthStore().id),
      form: ref({
        name: '',
        email: '',
        hasFamily: false,
        verified: false,
      })
    }
  },
  mounted() {
    const router = useRouter()
    const route = useRoute()
    const routeUserId = route.params.id[0]

    if (routeUserId) {
      this.userId = routeUserId;
    }

    if (this.userId) {
      this.fetchUserData(this.userId);
    } else {
      router.push({path: "/auth"})
    }
  },
  methods: {
    async fetchUserData(uid: string) {
      try {
        const user = await UserService.find(uid);
        if (user) {
          this.userId = user.id || "";
          this.form.name = user.username || "";
          this.form.email = user.email || "";
          this.form.hasFamily = user.hasFamily || false;
          this.form.verified = user.verified || false;
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных пользователя:', error);
      }
    },
    async onSubmit(event: Event) {
      event.preventDefault();
      try {
        await UserService.update(this.userId, this.form);
        alert('Данные успешно обновлены!');
      } catch (error) {
        console.error('Ошибка при обновлении данных:', error);
      }
    }
  }
};
</script>

<template>
  <BForm @submit="onSubmit">

    <p>ID: {{ userId }}</p>

    <BFormGroup label="Имя:" label-for="name-input">
      <BFormInput id="name-input" v-model="form.name" type="text" placeholder="Имя"></BFormInput>
    </BFormGroup>

    <BFormGroup label="E-Mail:" label-for="input-email">
      <BFormInput id="email-input" v-model="form.email" type="email" placeholder="Email" required></BFormInput>
    </BFormGroup>

    <BFormCheckbox id="has-family" v-model="form.hasFamily" :disabled="true">
      Состоит в семье
    </BFormCheckbox>

    <BFormCheckbox id="verified" v-model="form.verified" :disabled="true">
      Верифицирован
    </BFormCheckbox>

    <BButton submit="submit" class="mt-3">Сохранить</BButton>

  </BForm>
</template>

<style scoped>

</style>
