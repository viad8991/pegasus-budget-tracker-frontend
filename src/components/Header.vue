<template>
  <BNavbar toggleable="lg" variant="dark" v-b-color-mode="'dark'">
    <BNavbarBrand href="/">Pegasus BT</BNavbarBrand>
    <BNavbarToggle target="nav-collapse"/>
    <BCollapse id="nav-collapse" is-nav>

      <!--   TODO можно вынести в отдельный файл со статическими данными и использовать v-for. Схема примерно такая {name, isAdmin, link, isDisabled}   -->
      <BNavbarNav>
        <BNavItem v-if="isAdmin" href="/user">Пользователи</BNavItem>
        <BNavItem v-if="isAdmin" href="/category">Категории</BNavItem>

        <BNavItem href="/family">Семья</BNavItem>

        <BNavItem href="#" disabled>Disabled</BNavItem>
      </BNavbarNav>

      <BNavbarNav class="ms-auto mb-2 mb-lg-0">
        <!--    TODO тоже самое. если статика, то в отдельный файл. Иначе получаем с бэка и v-for    -->
        <BNavItemDropdown text="Lang" right>
          <BDropdownItem href="#">EN</BDropdownItem>
          <BDropdownItem href="#">ES</BDropdownItem>
          <BDropdownItem href="#">RU</BDropdownItem>
          <BDropdownItem href="#">FA</BDropdownItem>
        </BNavItemDropdown>

        <BNavItemDropdown v-if="isAuth" right>
          <template #button-content>
            <em>{{ username }}</em>
          </template>
          <BDropdownItem href="/profile">Профиль</BDropdownItem>
          <BDropdownItem @click="handleLogout">Sign Out</BDropdownItem>
        </BNavItemDropdown>
        <BButton v-else variant="dark" @click="goToAuth">Sign In</BButton>

      </BNavbarNav>
    </BCollapse>
  </BNavbar>
</template>

<script lang="ts">
import {computed} from 'vue';
import {useRouter} from 'vue-router';
import {useAuthStore} from "../auth/store/authStore";

const router = useRouter();
const authStore = useAuthStore();

// TODO
// В сторе есть getters, они отвечают за реактивность и можно это получать оттуда (из getter-a)
const isAuth = computed(() => authStore.token);
const isAdmin = computed(() => {
  return authStore.isAdmin
});

export default {
  name: "Header",
  // getters: {},
  data() {
      return {
        username:  authStore.username
      }
  },
  methods: {
    async handleLogout() {
      await authStore.logout();
      await router.push('/');
    },
    async goToAuth() {
      await router.push('/auth');
    }
  }
};
</script>

<style scoped>

</style>
