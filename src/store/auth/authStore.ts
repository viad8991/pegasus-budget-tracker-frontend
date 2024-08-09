import {defineStore} from "pinia";
import AuthService from "../../services/AuthService";
import {AuthState, LoginCredentials, LoginResponse} from "./authTypes";
import UserService from "../../services/UserService";
import {User} from "../user/userTypes";

export const useAuthStore = defineStore({
    id: "authStore",
    state: (): AuthState => ({
        token: localStorage.getItem("token"),
        user: null
    }),
    actions: {
        async fetchCurrentUserDate() {
            const tokenFromStorage = localStorage.getItem("token");
            if (tokenFromStorage) {
                const userData: User | null = await UserService.find(null);
                console.log(userData)
                if (userData) {
                    this.user = userData;
                    return true;
                }
            }
            return false;
        },
        async auth(username: string, password: string): Promise<boolean> {
            const loginResponse: LoginResponse | null = await AuthService.login(username, password);

            console.log("loginResponse", loginResponse.token, loginResponse.user)
            // обычно мы полагаем, если что в ответе пришло (статус 200), то с данными все хорошо и они все пришли
            // поэтому проверять отдельно смысла нет
            if (loginResponse) {
                this.token = loginResponse.token
                this.user = loginResponse.user

                localStorage.setItem("token", loginResponse.token);
            }

            return loginResponse !== null;
        },
        async logout() {
            this.token = null;
            this.user = null;

            localStorage.removeItem("token");

            this.$reset();
        },
    },
});
