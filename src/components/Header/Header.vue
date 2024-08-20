<script lang="ts" setup>
import {computed, onMounted, onUnmounted, ref} from 'vue';
import {useRouter} from 'vue-router';
import {useAuthStore} from "../../store/auth/authStore";
import {headerTabs} from "./static/headerTabs";
import rSocketClient, {RSocketWebSocket} from "../../utils/rSocket";

const router = useRouter();
const authStore = useAuthStore();

const tabs = ref(headerTabs)
const isAuth = computed(() => authStore.token !== null);
const isAdmin = computed(() => authStore.user?.isAdmin || false);
const username = computed(() => authStore.user?.username);

const notifications = ref<string[]>([]);

const handleLogout = async () => {
  await authStore.logout();
  await router.push('/');
};
const handleSigIn = async () => {
  await router.push('/auth');
}

onMounted(async () => {
  if (isAuth.value) {
    const socket = new RSocketWebSocket()
    await socket.connect()
    socket.onNotification(msg => notifications.value.push(msg));
  }
});

</script>

<template>
  <BNavbar toggleable="lg" variant="dark" v-b-color-mode="'dark'">
    <BNavbarBrand href="/">Pegasus BT</BNavbarBrand>
    <BNavbarToggle target="nav-collapse"/>
    <BCollapse id="nav-collapse" is-nav>
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
        <p style="color: white">Notice: {{ notifications.length }}</p>
        <BCollapse id="notice" right>
          <ul v-if="notifications.length > 0">
            <li v-for="(notice, idx) in notifications" :key="idx">{{ notice }}</li>
          </ul>
          <p v-else>No Notice</p>
        </BCollapse>

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
