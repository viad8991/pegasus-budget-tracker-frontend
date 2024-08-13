import { Transaction } from "../store/transaction/transactionTypes";
import { Category } from "../store/category/categoryTypes";
import axios from "../utils/axios";

/* TODO temp */
interface CreateFamilyResponse {
    id: string | null;
}

/* TODO end temp */

class TransactionService {
    private _categoryStub: Category = {
        id: "stub",
        name: "Stub",
        type: "INCOMING",
        description: null,
    };
    private _stubTransaction: Transaction[] = [
        {
            id: "stub-transaction-id-1",
            amount: 100.0,
            date: "2024-08-07T11:22:53.530837484Z",
            category: this._categoryStub,
        },
        {
            id: "stub-transaction-id-2",
            amount: 110.0,
            date: "2024-08-08T11:22:53.530837484Z",
            category: this._categoryStub,
        },
    ];

    async list() {
        return axios
            .get<Transaction[]>("/api/v1/transactions/")
            .then((response) => {
                return response.data;
            })
            .catch((reason) => {
                console.log(reason);
                return this._stubTransaction;
            });
    }

    async create(amount: number, category: Category) {
        return axios
            .post<CreateFamilyResponse>("/api/v1/transactions/", {amount, category})
            .then((response) => {
                return response.data;
            })
            .catch((reason) => {
                console.log(reason);
                const stub: CreateFamilyResponse = {
                    id: "stub-id",
                };
                return stub;
            });
    }
}

export default new TransactionService();
