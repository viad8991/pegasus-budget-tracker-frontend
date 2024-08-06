<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import {useAuthStore} from "../../store/auth/store/authStore";
import {useRoute, useRouter} from "vue-router";
import UserService from "../../services/UserService";
import {storeToRefs} from "pinia";

const authStore = useAuthStore()
const {id} = storeToRefs(authStore);

const userId = ref(id);
const form = ref({
  name: '',
  email: '',
  hasFamily: false,
  verified: false,
})

onMounted(() => {
  const route = useRoute()
  const routeUserId = route.params.id[0]

  if (routeUserId) {
    userId.value = routeUserId;
  }

  if (userId.value) {
    fetchUserData(userId.value);
  } else {
    const router = useRouter()
    router.push({path: "/auth"})
  }
});

async function fetchUserData(uid: string) {
  try {
    const user = await UserService.find(uid);
    if (user) {
      userId.value = user.id || "";
      form.value.name = user.username || "";
      form.value.email = user.email || "";
      form.value.hasFamily = user.hasFamily || false;
      form.value.verified = user.verified || false;
    }
  } catch (error) {
    console.error('Ошибка при загрузке данных пользователя:', error);
  }
}

async function onSubmit(event: Event) {
  event.preventDefault();
  await UserService.update(userId.value, form.value);
}
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
