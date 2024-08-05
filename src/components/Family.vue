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
// TODO
// не стоит смешивать стили написания
// есть CompositionAPI, а есть OptionAPI, у тебя в разных файлах по разному
// современный стандарт CompositionAPI, почитай
export default {
  data() {
    return {
      fields: [
        {key: 'name', label: 'Full Name'},
        'age',
        'sex'
      ],
      items: [
        {name: {first: 'John', last: 'Doe'}, sex: 'Male', age: 42},
        {name: {first: 'Jane', last: 'Doe'}, sex: 'Female', age: 36},
        {name: {first: 'Rubin', last: 'Kincade'}, sex: 'Male', age: 73},
        {name: {first: 'Shirley', last: 'Partridge'}, sex: 'Female', age: 62}
      ]
    }
  }
}
</script>

<style scoped>
/* Добавьте стили при необходимости */
</style>
