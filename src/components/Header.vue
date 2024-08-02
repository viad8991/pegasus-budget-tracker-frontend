<template>
  <BNavbar toggleable="lg" variant="dark" v-b-color-mode="'dark'">
    <BNavbarBrand href="/">Pegasus BT</BNavbarBrand>
    <BNavbarToggle target="nav-collapse"/>
    <BCollapse id="nav-collapse" is-nav>

      <BNavbarNav>
        <BNavItem href="#">Link</BNavItem>
        <BNavItem href="#">Link</BNavItem>
        <BNavItem href="#">Link</BNavItem>
        <BNavItem href="#">Link</BNavItem>
        <BNavItem href="#">Link</BNavItem>
        <BNavItem href="#" disabled>Disabled</BNavItem>
      </BNavbarNav>

      <BNavbarNav class="ms-auto mb-2 mb-lg-0">
        <BNavItemDropdown text="Lang" right>
          <BDropdownItem href="#">EN</BDropdownItem>
          <BDropdownItem href="#">ES</BDropdownItem>
          <BDropdownItem href="#">RU</BDropdownItem>
          <BDropdownItem href="#">FA</BDropdownItem>
        </BNavItemDropdown>

        <BNavItemDropdown v-if="authStore.isAuth" right>
          <template #button-content>
            <em>{{ useAuthStore }}</em>
          </template>
          <BDropdownItem href="#">Профиль</BDropdownItem>
          <BDropdownItem @click="handleLogout">Sign Out</BDropdownItem>
        </BNavItemDropdown>
        <BButton v-else variant="dark" @click="goToAuth">Sign In</BButton>

      </BNavbarNav>
    </BCollapse>
  </BNavbar>
</template>


<script lang="ts" setup>
import {useRouter} from 'vue-router';
import {
  BNavbar,
  BNavbarBrand,
  BNavbarToggle,
  BCollapse,
  BNavbarNav,
  BNavItem,
  BNavItemDropdown,
  BDropdownItem,
  BButton
} from 'bootstrap-vue-next';
import {useAuthStore} from "../store/auth";

const router = useRouter();
const authStore = useAuthStore();

const handleLogout = () => {
  authStore.logout();
  router.push('/');
};

const goToAuth = () => {
  router.push('/auth');
};
</script>

<style scoped>

</style>
