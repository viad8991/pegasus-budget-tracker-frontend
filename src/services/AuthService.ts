import axios from "axios";
import { useAuthStore } from "../store/auth";
import { Category } from "../api/api";

class AuthService {
    private _serverBaseUrl: string = "http://localhost:8080/api/v1/auth";

    async login(username: string, password: string) {
        return await axios
            .get<LoginUser>(this._serverBaseUrl, { username, password })
            .then((response) => {
                console.log(response);
                return response.data;
            })
            .catch((reason) => {
                console.log(reason);
                return null;
            });
    }

    async register() {
        // TODO not impl. Realisation on server to not exist
    }
}

export default new AuthService();
