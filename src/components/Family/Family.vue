<script lang="ts" setup>

import LastFamilyTransaction from "../LastFamilyTransaction/LastFamilyTransaction.vue";
import FamilyList from "../FamilyList/FamilyList.vue";

</script>

<template>

  <BContainer>
    <BRow>
      <BCol>
        <LastFamilyTransaction/>
      </BCol>
      <BCol>
        <FamilyList/>
      </BCol>
    </BRow>
  </BContainer>

</template>

<style scoped>
/* Добавьте стили при необходимости */
</style>
