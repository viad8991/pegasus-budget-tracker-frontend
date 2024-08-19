<script lang="ts" setup>
import {ref} from "vue";

// Набросок использования
interface Message {
  username: string,
  text: string
}

const messages = ref<Message[]>()
const message = ref<String>()

messages.value = [
  {username: "You", text: "Добрый день"},
  {username: "Bar", text: "Добрый"},
  {username: "You", text: "Где описании задачи?"},
  {username: "Bar", text: "Ну... пук, среньк?"},
  {username: "You", text: "Вышел и зашел нормально"}
]
</script>

<template>
  <h3 class="text-center">Семейный Чат</h3>
  <hr>
  <div>
    <div class="shadow bg-body rounded px-3 py-1 my-1" v-for="mes in messages">
      {{ mes.username }}: {{ mes.text }}
    </div>
    <div class="shadow bg-body rounded px-3 py-1 my-1">You: {{ message }}</div>
    <BInputGroup class="py-1 my-1">
      <BFormInput type="text" v-model="message" placeholder="Текст"/>
      <BButton>Отправить</BButton>
    </BInputGroup>
  </div>
</template>

<style scoped>

</style>