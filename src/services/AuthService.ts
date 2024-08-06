import { LoginResponse } from "../store/auth/types/authTypes";
import axios from "../axios";

class AuthService {
    async login(username: string, password: string) {
        return await axios
            .post<LoginResponse>("/api/v1/auth", { username, password })
            .then((response) => {
                return response.data;
            })
            .catch((reason) => {
                console.log(reason);
                const stub: LoginResponse = {
                    token: "stub",
                    user: {
                        id: "4cfd7412-eafe-4056-a5ec-343a3a662c3d",
                        hasFamily: false,
                        username: "admin",
                        isAdmin: true,
                        email: "admin@admin.com",
                        verified: true,
                    },
                };
                return stub;
            });
    }

    async register() {
        // TODO not impl. Realisation on server to not exist
    }
}

export default new AuthService();
