import { defineStore } from "pinia";
import { User } from "../api/api.js";

interface IStore {
    user: User;
    isAuth: boolean | undefined;
}

export const useAuthStore = defineStore({
    id: "auth",
    state: (): IStore => ({
        user: JSON.parse(localStorage.getItem("user") ?? "{}") ?? {},
        isAuth: JSON.parse(localStorage.getItem("isAuth") ?? "{}") || false,
    }),
    getters: {
        id: (state: IStore) => state.user.id ?? "",
        username: (state: IStore) => state.user.username ?? "User",
        email: (state: IStore) => state.user.email ?? "",
        isAdmin: (state: IStore) => state.user.isAdmin ?? false,
        userId: (state: IStore) => state.user.id ?? null,
        hasFamily: (state: IStore) => state.user.hasFamily ?? false,
    },
    actions: {
        async auth(username: string, password: string) {
            try {
                const response = await fetch(
                    "http://localhost:8080/api/v1/user/login",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ username, password }),
                    },
                ).then((response) => {
                    return response.json() as Promise<User>;
                });

                if (response.id && response.token) {
                    this.user = response;
                    this.isAuth = true;
                    localStorage.setItem("isAuth", "true");
                    localStorage.setItem("user", JSON.stringify(response));
                }

                return response;
            } catch (e) {
                console.log(e); // throw new Error(e);
            }
            return null;
        },
        async logout() {
            try {
                this.isAuth = false;
                localStorage.removeItem("isAuth");
                localStorage.removeItem("user");

                this.$reset();
            } catch (e) {
                this.isAuth = false;
                localStorage.removeItem("isAuth");
                localStorage.removeItem("user");

                this.$reset();
            }
            return true;
        },
    },
});
