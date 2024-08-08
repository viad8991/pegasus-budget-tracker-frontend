<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {Transaction} from "../../store/transaction/types/transactionTypes";
import TransactionService from "../../services/TransactionService";
import {tableRow} from "./static/lastTransactionTableFields";
import {formatDate} from "../../utils/dateTime";

const fields = ref(tableRow)
const items = ref<Transaction[]>([]);

const onRowClicked = async (row: Transaction) => {
  console.log("trans", row)
}

const fetchUsers = async () => {
  const transactions = await TransactionService.list();
  if (transactions) {
    console.log(transactions[0])
    items.value = transactions;
  } else {
    console.error('Не удалось загрузить список пользователей');
  }
};

onMounted(fetchUsers);
</script>

<template>
  <h3 class="text-center">Последние операции</h3>
  <BTable
      :fields="fields"
      :items="items"
      @row-clicked="onRowClicked"
      mode="single"
      :sort-by="[{key:'date', order: 'desc'}]"
  >
    <template #cell(date)="date">
      {{ formatDate(date.value) }}
    </template>

    <template #cell(category)="data">
      {{ data.value.name }} - {{ data.value.type }}
    </template>
  </BTable>
</template>

<style scoped>

</style>