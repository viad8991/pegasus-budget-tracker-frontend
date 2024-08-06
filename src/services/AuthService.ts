import axios from "axios";
import {LoginResponse} from "../auth/types/authTypes";

class AuthService {
    private _serverBaseUrl: string = "http://localhost:8080/api/v1/auth";

    async login(username: string, password: string) {
        return await axios
            .post<LoginResponse>(this._serverBaseUrl, {username, password})
            .then((response) => {
                console.log(response);
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
                        verified: true
                    }
                }
                return stub
            });
    }

    async register() {
        // TODO not impl. Realisation on server to not exist
    }
}

export default new AuthService();
