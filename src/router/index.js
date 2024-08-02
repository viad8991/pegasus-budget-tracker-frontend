import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserList from '../components/UserList.vue';
import Auth from "../components/Auth.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {path: '/', name: 'Главная', component: HomeView},
        {path: '/user/all', name: 'Пользователи', component: UserList},
        {path: '/auth', name: "Авторизация", component: Auth}
    ]
})

export default router
