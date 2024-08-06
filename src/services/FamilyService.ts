import axios from "axios";
import {Category} from "../api/api";
import {useAuthStore} from "../store/auth/store/authStore";

/* TODO temp */
interface CreateFamilyResponse {
    susses: boolean;
    error: string | null
}

/* TODO end temp */

class FamilyService {
    private _serverBaseUrl: string = "http://localhost:8080/api/v1/family";

    async create() {
        return axios.post<CreateFamilyResponse>(this._serverBaseUrl, {}, {headers: {"Authorization": useAuthStore().token}})
            .then(response => {
                return response.data
            }).catch(reason => {
                console.log(reason)
                const stub: CreateFamilyResponse = {
                    susses: true,
                    error: null
                }
                return stub;
            })
    }

}

export default new FamilyService();