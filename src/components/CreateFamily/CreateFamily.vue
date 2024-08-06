<script lang="ts" setup>
import FamilyService from "../../services/FamilyService";
import {useRouter} from "vue-router";
import {useAuthStore} from "../../store/auth/store/authStore";
  
async function handleCreateFamily() {
  const router = useRouter();
  const response = await FamilyService.create();
  const authStore = useAuthStore();
  
  if (response.susses) {
    
    router.push(router.currentRoute.value.path);
  } else {

  }
}
</script>

<template>
  <h3>Создание группы "Семья"</h3>

  <p>Вы можете создать "Семью", чтобы отслеживать траты своих родственников</p>
  <p>Следите куда тратит деньги вам ребенок, планируйте покупки, и просто расчитывайте свой доход</p>

  <BButton @click="handleCreateFamily" type="submit" class="btn btn-primary">Создать</BButton>
</template>
