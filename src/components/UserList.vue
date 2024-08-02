<template>
  <div class="container">
    <h1>Список пользователей</h1>
    <BTable
      :fields="fields"
      :items="items"
      @row-clicked="onRowClicked"
      mode="single"
      >
      <template #cell(name)="data">
        {{ data.value.first }} {{ data.value.last }}
      </template>
    </BTable>
  </div>
</template>

<script lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const router = useRouter();

      const fields = ref([
        { key: 'name', label: 'Full Name' }, 
        'age', 
        'sex'
      ]);
      
      const items = ref([
          { id: 1, name: { first: 'Jane', last: 'Doe' }, sex: 'Female', age: 36 },
          { id: 2, name: { first: 'Rubin', last: 'Kincade' }, sex: 'Male', age: 73 },
          { id: 3, name: { first: 'Shirley', last: 'Partridge' }, sex: 'Female', age: 62 }
      ]);
      const onRowClicked = (row) => {
          console.log('1 Selected row:', row);
          router.push({ name: 'Профиль', params: { id: row.id }})
          // this.$router.push({ name: 'ProfileView', :  });
        };

      return {fields, items, onRowClicked}
    }
  };
</script>

<style scoped>
/* Добавьте стили при необходимости */
</style>
