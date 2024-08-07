import {createRouter, createWebHistory} from "vue-router";

import HomeView from "../views/HomeView.vue";
import CategoryView from "../views/CategoryView.vue";
import FamilyView from "../views/FamilyView.vue";
import AuthView from "../views/AuthView.vue";
import ProfileView from "../views/ProfileView.vue";
import UserList from "../components/UserList/UserList.vue";
import TransactionView from "../views/TransactionView.vue";

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

export default router;
