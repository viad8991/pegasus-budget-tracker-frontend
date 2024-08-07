<script lang="ts" setup>
import LastTransactions from "../components/LastTransactions/LastTransactions.vue";
import AddTransaction from "../components/AddTransaction/AddTransaction.vue";
</script>

<template>
  <BContainer>
    <BRow>
      <BCol>
        <LastTransactions/>
      </BCol>
      <BCol>
        <AddTransaction/>
      </BCol>
    </BRow>
  </BContainer>
</template>

<style scoped>

</style>
