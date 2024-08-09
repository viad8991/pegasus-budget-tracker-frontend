<script lang="ts" setup>
import FamilyService from "../../services/FamilyService";

async function handleCreateFamily() {
  const response = await FamilyService.create();
  if (response.id) {
    location.reload()
  } else {
    // TODO show family  is not created
  }
}
</script>

<template>
  <h3>Создание группы "Семья"</h3>

  <p>Вы можете создать "Семью", чтобы отслеживать траты своих родственников</p>
  <p>Следите куда тратит деньги вам ребенок, планируйте покупки, и просто расчитывайте свой доход</p>

  <BButton @click="handleCreateFamily" type="submit" class="btn btn-primary">Создать</BButton>
</template>
