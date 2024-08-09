<script lang="ts" setup>
import {tableFields} from "./staticLastFamilyTransaction";
import {onMounted, ref} from "vue";
import {MemberTransaction} from "../../store/family/familyTypes";
import FamilyService from "../../services/FamilyService";
import {formatDate} from "../../utils/dateTime";

const items = ref<MemberTransaction[]>([]);

onMounted(async () => {
  items.value = await FamilyService.transaction();
})
</script>

<template>
  <h3 class="text-center">Последние транзакции</h3>

  <BTable
      :fields="tableFields"
      :items="items"
      :sort-by="[{key:'transaction.created', order: 'desc'}]"
  >
    <template #cell(transaction.created)="date">
      {{ formatDate(date.value) }}
    </template>
  </BTable>
</template>

<style scoped>

</style>
