import {defineStore} from 'pinia';
import {User} from "../api/api.js";

interface IStore {
    user: User
    isAuth: boolean | undefined,
}

export const useAuthStore = defineStore({
    id: "auth",
    state: (): IStore => ({
        user: JSON.parse(localStorage.getItem("user") ?? '') ?? {},
        isAuth: JSON.parse(localStorage.getItem("isAuth") ?? '') || false,
    }),
    getters: {
        email: (state: IStore) => state.user.email ?? '',
        isAdmin: (state: IStore) => state.user.isAdmin ?? false,
        userId: (state: IStore) => state.user.id ?? null,
    },
    actions: {
        async auth(username: string, password: string) {
            try {
                const response = await fetch('http://localhost:8080/api/v1/user/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({username, password})
                }).then(response => {
                    return response.json() as Promise<User>
                });

                if (response.id && response.token) {
                    this.user = response;
                    this.isAuth = true;
                    localStorage.setItem('isAuth', 'true');
                    localStorage.setItem('user', JSON.stringify(response));
                }

                return response;
            } catch (e) {
                console.log(e) // throw new Error(e);
            }
            return null
        },
        async logout() {
            try {
                this.isAuth = false;
                localStorage.removeItem('isAuth');
                localStorage.removeItem('user');

                this.$reset();
            } catch (e) {
                this.isAuth = false;
                localStorage.removeItem('isAuth');
                localStorage.removeItem('user');

                this.$reset();
            }
            return true;
        },
    },
});
//
// export const useAuthStore = defineStore('auth', () => {
//     const isLoggedIn = ref(false);
//     const username = ref('');
//
//     const login = (token, userName) => {
//         localStorage.setItem('token', token);
//         localStorage.setItem('username', userName);
//
//         isLoggedIn.value = true;
//         username.value = userName;
//     };
//
//     const logout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('username');
//         isLoggedIn.value = false;
//         username.value = '';
//     };
//
//     const checkAuth = () => {
//         const token = localStorage.getItem('token');
//         const storageUsername = localStorage.getItem('username');
//
//         console.log(storageUsername, token)
//
//         if (token) {
//             username.value = storageUsername || 'User';
//             isLoggedIn.value = true;
//         }
//     };
//
//     return {isLoggedIn, username, login, logout, checkAuth};
// });
