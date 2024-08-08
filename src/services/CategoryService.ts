import {useAuthStore} from "../store/auth/store/authStore";
import {Category} from "../store/category/types/categoryTypes";
import axios from "../axios";

class CategoryService {
    private _stub: Category[] = [
        {
            id: "id-1",
            type: "INCOME",
            name: "Foo",
            description: null,
        },
        {
            id: "id-2",
            type: "EXPENSE",
            name: "Bar",
            description: null,
        },
    ];

    async getByType(type: string) {
        return axios
            .get<Category[]>("/api/v1/category", {params: {"type": type}})
            .then((response) => {
                return response.data;
            })
            .catch((reason) => {
                console.log(reason);
                return this._stub.filter(value => value.type === type);
            });
    }

    async update(id: string, name: string, type: string, description: string) {
        return axios
            .post<Category>("/api/v1/category/" + id, {name, type, description})
            .then((response) => {
                return response.data;
            })
            .catch((reason) => {
                console.log(reason);
                return null;
            });
    }

    async create(name: string, type: string, description: string) {
        return axios
            .post<Category>("/api/v1/category", {name, type, description})
            .then((response) => {
                return response.data;
            })
            .catch((reason) => {
                console.log(reason);
                return null;
            });
    }
}

export default new CategoryService();
