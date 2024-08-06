import axios from "axios";
import {useAuthStore} from "../store/auth/store/authStore";
import {Category} from "../api/api";

class CategoryService {
    private _serverBaseUrl: string = "http://localhost:8080/api/v1/category";

    async all() {
        return axios.get<Category[]>(this._serverBaseUrl, {headers: {"Authorization": useAuthStore().token}})
            .then(response => {
                return response.data
            }).catch(reason => {
                console.log(reason)
                const stub: Category[] = [
                    {
                        id: "id-1",
                        name: "Супермаркеты",
                        description: null
                    },
                    {
                        id: "id-2",
                        name: "Транспорт",
                        description: null
                    }
                ]
                return stub;
            })
    }

    async update(category: any) {
        return axios.post<Category>(this._serverBaseUrl + "/" + category.id, category, {headers: {"Authorization": useAuthStore().token}})
            .then(response => {
                return response.data
            }).catch(reason => {
                console.log(reason)
                return null;
            })
    }


    async create(category: any) {
        delete category["id"];
        return axios.post<Category>(this._serverBaseUrl, category, {headers: {"Authorization": useAuthStore().token}})
            .then(response => {
                return response.data
            }).catch(reason => {
                console.log(reason)
                return null;
            })
    }

}

export default new CategoryService();
