import {createRouter, createWebHistory} from "vue-router";

import HomeView from "../views/HomeView.vue";
import CategoryView from "../views/CategoryView.vue";
import FamilyView from "../views/FamilyView.vue";
import AuthView from "../views/AuthView.vue";
import ProfileView from "../views/ProfileView.vue";
import UserList from "../components/UserList/UserList.vue";
import TransactionView from "../views/TransactionView.vue";
import {useAuthStore} from "../store/auth/authStore";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: "/", name: "Главная", component: HomeView},
        {path: "/user", name: "Пользователи", component: UserList},
        {path: "/category", name: "Категории", component: CategoryView},
        {path: "/family", name: "Семья", component: FamilyView},
        {path: "/profile/:id?", name: "Профиль", component: ProfileView, props: true},
        {path: "/auth", name: "Авторизация", component: AuthView},
        {path: "/transaction", name: "Операции", component: TransactionView},
    ],
});

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();
    console.log(authStore.user)
    if (authStore.token && authStore.user === null) {
        console.log(authStore.token && !authStore.user, "|",  authStore.token, "|", authStore?.user, "|", authStore.user === null)
        await authStore.fetchCurrentUserDate()
    }

    next();
});

export default router;
