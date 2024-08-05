import axios from "axios";
import {useAuthStore} from "../store/auth";
import {Category} from "../api/api";

class CategoryService {
    private _serverBaseUrl: string = "http://localhost:8080/api/v1/category";

    async all() {
        return axios.get(this._serverBaseUrl, {headers: {"Authorization": useAuthStore().token}})
            .then(response => {
                console.log(response)
                return response.data as Category[]
            }).catch(reason => {
                console.log(reason)
                return [];
            })
    }

    async update(category: any) {
        return axios.post(this._serverBaseUrl + "/" + category.id, category, {headers: {"Authorization": useAuthStore().token}})
            .then(response => {
                console.log(response)
                return response.data as Category[]
            }).catch(reason => {
                console.log(reason)
                return [];
            })
    }


    async create(category: any) {
        delete category["id"];
        return axios.post(this._serverBaseUrl, category, {headers: {"Authorization": useAuthStore().token}})
            .then(response => {
                console.log(response)
                return response.data as Category[]
            }).catch(reason => {
                console.log(reason)
                return [];
            })
    }

}

export default new CategoryService();
