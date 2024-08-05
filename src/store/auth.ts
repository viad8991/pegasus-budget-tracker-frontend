import {defineStore} from "pinia";
import {LoginUser, User} from "../api/api.js";
import axios from "axios";

// вижу, что ты тут хранить данные пользователя
// обычно за данные пользователя отвечает пользовательский стор UserStore
// а за данные по авторизации AuthStore, там хранят username, password из формы

// типы выносятся в отдельный файл, чтобы не засорять данные, в котором итак много логики будет помимо типов
// структура обычно такая:
// auth
//      store
//          authStore.ts
//          authStore.test.ts
//      types
//          authStoreTypes.ts
interface IStore {
    user: User | null;
    isAuth: boolean;
    token: string;
}

// именование файлов для сторов принято вести с приставкой authStore
// хз почему так, но много где видел

export const useAuthStore = defineStore({
    id: "auth",
    state: (): IStore => ({
        isAuth: JSON.parse(localStorage.getItem("isAuth") || "false") ?? false,
        token: localStorage.getItem("token") ?? "",
        user: JSON.parse(localStorage.getItem("user") ?? "{}") ?? {},
    }),
    getters: {
        id: (state: IStore) => state.user?.id ?? "",
        username: (state: IStore) => state.user?.username ?? "User",
        email: (state: IStore) => state.user?.email ?? "",
        isAdmin: (state: IStore) => state.user?.isAdmin ?? false,
        hasFamily: (state: IStore) => state.user?.hasFamily ?? false,
    },
    actions: {
        async auth(username: string, password: string) {
            try {
                // стор не должен ничего знать про бизнес логику
                const loginUser = await AuthService.login(username, password);

                // обычно мы полагаем, если что в ответе пришло (статус 200), то с данными все хорошо и они все пришли
                // поэтому проверять отдельно смысла нет
                if (loginUser.user && loginUser.token) {
                    this.isAuth = true;
                    this.token = loginUser.token;
                    this.user = loginUser.user;

                    // хранить данные user-a в LS не безопасно, любая XSS атака и данные скомпроментированы
                    //
                    // тут поле token уже отвечает за то авторизован пользовать или нет, зачем isAuth не знаю
                    localStorage.setItem("isAuth", "true");
                    localStorage.setItem("token", loginUser.token);
                    localStorage.setItem("user", JSON.stringify(loginUser.user));
                }

                return response;
            } catch (e) {
                console.log(e); // throw new Error(e);
            }
            return null;
        },
        async logout() {
            // ты reset-ить стор, зачем еще раз false присваиваешь? У тебя в default значениях итак false
            this.isAuth = false;
            localStorage.removeItem("isAuth");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            this.$reset();

            return this.isAuth;
        },
    },
});
