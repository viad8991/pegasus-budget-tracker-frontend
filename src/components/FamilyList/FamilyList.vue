<script lang="ts" setup>
import {tableFields} from "./staticFamilyList";
import {onMounted, ref} from "vue";
import {MemberTransaction} from "../../store/family/familyTypes";
import FamilyService from "../../services/FamilyService";
import {formatDate} from "../../utils/dateTime";

const items = ref<MemberTransaction[]>([]);

onMounted(async () => {
  items.value = await FamilyService.members();
})
</script>

<template>
  <h3 class="text-center">Список пользователей</h3>

  <BTable
      :fields="tableFields"
      :items="items"
      :sort-by="[{key:'transaction.category.created', order: 'desc'}]"
  >
    <template #cell(transaction.category.created)="date">
      {{ formatDate(date.value) }}
    </template>
  </BTable>
</template>

<style scoped>

</style>
