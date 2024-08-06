<script lang="ts" setup>
import {computed} from 'vue';
import {useRouter} from 'vue-router';
import {useAuthStore} from "../store/auth/store/authStore";

const router = useRouter();
const authStore = useAuthStore();

// TODO
// В сторе есть getters, они отвечают за реактивность и можно это получать оттуда (из getter-a)
const isAuth = computed(() => authStore.token);
const isAdmin = computed(() => authStore.isAdmin);
const username = computed(() => authStore.username);

const handleLogout = async () => {
  await authStore.logout();
  await router.push('/');
};
const handleSigIn = async () => {
  await router.push('/auth');
}

</script>

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
        <BButton v-else variant="dark" @click="handleSigIn">Sign In</BButton>

      </BNavbarNav>
    </BCollapse>
  </BNavbar>
</template>

<style scoped>

</style>
