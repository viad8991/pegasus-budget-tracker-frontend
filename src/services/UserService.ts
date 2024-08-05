import {User} from "../api/api";
import {useAuthStore} from "../store/auth";
import axios from "axios";

class UserService {
    private _serverBaseUrl: string = "http://localhost:8080/api/v1/user";

    async all() {
        return axios.get(this._serverBaseUrl, {headers: {"Authorization": useAuthStore().token}})
            .then(response => {
                console.log(response)
                return response.data as User[]
            }).catch(reason => {
                console.log(reason)
                return [];
            })
    }

    async find(id: string) {
        return axios.get(
            this._serverBaseUrl + "/" + id, {headers: {"Authorization": useAuthStore().token}})
            .then(response => {
                if (response.status === 200) {
                    return response.data as User
                } else {
                    console.log("status is not 200", response)
                    return null
                }
            })
            .catch(reason => {
                console.log(reason)
                return null
            })
    }

    async update(id: string | null, value: any) {
        console.log(JSON.stringify({id, value}))
    }

}

export default new UserService();
