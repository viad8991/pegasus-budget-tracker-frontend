import {defineStore} from "pinia";
import {LoginUser, User} from "../api/api.js";
import axios from "axios";

interface IStore {
    user: User | null;
    isAuth: boolean;
    token: string;
}

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
                const response = await axios.post(
                    "http://localhost:8080/api/v1/user/login",
                    {username, password}
                )
                const loginUser = await response.data as LoginUser;

                if (loginUser.user && loginUser.token) {
                    this.isAuth = true;
                    this.token = loginUser.token;
                    this.user = loginUser.user;

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
            this.isAuth = false;
            localStorage.removeItem("isAuth");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            this.$reset();

            return this.isAuth;
        },
    },
});
