<script lang="ts" setup>

import LastFamilyTransaction from "../LastFamilyTransaction/LastFamilyTransaction.vue";
import FamilyList from "../FamilyList/FamilyList.vue";
import FamilyChat from "../FamilyChat/FamilyChat.vue";

</script>

<template>

  <BContainer>
    <BRow>
      <BCol>
        <FamilyList/>
      </BCol>
      <BCol>
        <FamilyChat/>
      </BCol>
    </BRow>
    <BRow>
      <BCol>
        <LastFamilyTransaction/>
      </BCol>
    </BRow>
    <BRow>
      <BCol>
        <!-- <LastFamilyTransaction/> -->
      </BCol>
      <BCol>
        <!-- <FamilyList/> -->
      </BCol>
    </BRow>
  </BContainer>

</template>

<style scoped>
/* Добавьте стили при необходимости */
</style>
