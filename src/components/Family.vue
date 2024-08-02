<template>
  <div class="container">
    <h1>Список пользователей</h1>
    <BTable :fields="fields" :items>
      <template #cell(name)="data">
        {{ data.value.first }} {{ data.value.last }}
      </template>
    </BTable>
  </div>
</template>

<script lang="ts">
  export default {
    data() {
      return {
        fields: [
          // A column that needs custom formatting
          { key: 'name', label: 'Full Name' },
          // A regular column
          'age',
          // A regular column
          'sex'
        ],
        items: [
          { name: { first: 'John', last: 'Doe' }, sex: 'Male', age: 42 },
          { name: { first: 'Jane', last: 'Doe' }, sex: 'Female', age: 36 },
          { name: { first: 'Rubin', last: 'Kincade' }, sex: 'Male', age: 73 },
          { name: { first: 'Shirley', last: 'Partridge' }, sex: 'Female', age: 62 }
        ]
      }
    }
  }
</script>

<style scoped>
/* Добавьте стили при необходимости */
</style>
