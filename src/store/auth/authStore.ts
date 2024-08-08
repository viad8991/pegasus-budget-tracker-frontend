import {defineStore} from "pinia";
import AuthService from "../../services/AuthService";
import {AuthState, LoginCredentials, LoginResponse} from "./authTypes";

export const useAuthStore = defineStore({
    id: "authStore",
    state: (): AuthState => ({
        token: localStorage.getItem("token"),
        user: null
    }),
    actions: {
        async fetchMyData(): Promise<boolean> {
            const tokenFromStorage = localStorage.getItem("token");
            const userData: any = await AuthService.fetchUserData(tokenFromStorage);

            if (userData) {
                this.user = userData;
                return true;
            }
            return false;
        },
        async auth(username: string, password: string): Promise<boolean> {
            // стор не должен ничего знать про бизнес логику
            const loginResponse: LoginResponse | null = await AuthService.login(username, password);

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
            // ты reset-ить стор, зачем еще раз false присваиваешь? У тебя в default значениях итак false
            this.token = null;
            this.user = null;

            localStorage.removeItem("token");

            this.$reset();
        },
    },
});
