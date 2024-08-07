import { useAuthStore } from "../store/auth/store/authStore";
import { Category } from "../store/category/types/categoryTypes";
import axios from "../axios";

class CategoryService {
    private _stub: Category[] = [
        {
            id: "id-1",
            name: "Супермаркеты",
            description: null,
        },
        {
            id: "id-2",
            name: "Транспорт",
            description: null,
        },
    ];

    async all() {
        return axios
            .get<Category[]>("/api/v1/category")
            .then((response) => {
                return response.data;
            })
            .catch((reason) => {
                console.log(reason);
                return this._stub;
            });
    }

    async update(category: any) {
        return axios
            .post<Category>("/api/v1/category/" + category.id, category)
            .then((response) => {
                return response.data;
            })
            .catch((reason) => {
                console.log(reason);
                return null;
            });
    }

    async create(category: any) {
        delete category["id"];
        return axios
            .post<Category>("/api/v1/category", category)
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
