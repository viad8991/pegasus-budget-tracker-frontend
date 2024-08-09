<script lang="ts" setup>
import {computed, ref} from 'vue';
import {useRouter} from 'vue-router';
import {useAuthStore} from "../../store/auth/authStore";
import {headerTabs} from "./static/headerTabs";

const router = useRouter();
const authStore = useAuthStore();

const tabs = ref(headerTabs)
const isAuth = computed(() => authStore.token !== null);
const isAdmin = computed(() => authStore.user?.isAdmin || false);
const username = computed(() => authStore.user?.username);

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

      <!--   TODO можно вынести в отдельный файл со статическими данными и использовать v-for.
      Схема примерно такая {name, isAdmin, link, isDisabled}   -->
      <BNavbarNav>
        <BNavItem
            v-for="tab in tabs"
            :key="tab.label"
            :href="tab.href"
            :disabled="tab.requiresAdmin "
        >
          <!-- v-if="(tab.requiresAdmin && isAdmin)" -->
          {{ tab.label }}
        </BNavItem>
      </BNavbarNav>

      <BNavbarNav class="ms-auto mb-2 mb-lg-0">
        <!-- TODO тоже самое. если статика, то в отдельный файл. Иначе получаем с бэка и v-for
              Пока не уверен, что это реализация будет, save
        -->
        <BNavItemDropdown text="Langs" right>
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
