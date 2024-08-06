import {defineStore} from "pinia";
import AuthService from "../../../services/AuthService";
import {AuthState, LoginCredentials, LoginResponse} from "../types/authTypes";

export const useAuthStore = defineStore({
    id: "authStore",
    state: (): AuthState => ({
        id: localStorage.getItem("id"),
        username: localStorage.getItem("username") || "User",
        token: localStorage.getItem("token"),
        hasFamily: JSON.parse(localStorage.getItem("hasFamily") || "false"),
        isAdmin: JSON.parse(localStorage.getItem("hasFamily") || "false")
    }),
    actions: {
        async auth(username: string, password: string) : Promise<boolean> {

            // стор не должен ничего знать про бизнес логику
            const loginResponse: LoginResponse | null = await AuthService.login(username, password);

            // обычно мы полагаем, если что в ответе пришло (статус 200), то с данными все хорошо и они все пришли
            // поэтому проверять отдельно смысла нет
            if (loginResponse) {
                // хранить данные user-a в LS не безопасно, любая XSS атака и данные скомпроментированы
                //
                // тут поле token уже отвечает за то авторизован пользовать или нет, зачем isAuth не знаю

                localStorage.setItem("id", loginResponse.user.id);
                localStorage.setItem("username", loginResponse.user.username);
                localStorage.setItem("token", loginResponse.token);
                localStorage.setItem("hasFamily", JSON.stringify(loginResponse.user.hasFamily));
                localStorage.setItem("isAdmin", JSON.stringify(loginResponse.user.isAdmin));
            }

            return loginResponse !== null;
        },
        async logout() {
            // ты reset-ить стор, зачем еще раз false присваиваешь? У тебя в default значениях итак false
            localStorage.removeItem("token");
            localStorage.removeItem("hasFamily");
            localStorage.removeItem("isAdmin");
            this.$reset();

            return true;
        },
    },
});
