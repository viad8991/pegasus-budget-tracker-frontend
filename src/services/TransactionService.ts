import axios from "../axios";
import {Transaction} from "../store/transaction/types/transactionTypes";
import {Category} from "../store/category/types/categoryTypes";

/* TODO temp */
interface CreateFamilyResponse {
    id: string | null;
}

/* TODO end temp */

class TransactionService {

    async list() {
        return axios.get<Transaction[]>("/api/v1/transaction")
            .then(response => {
                return response.data
            }).catch(reason => {
                console.log(reason)
                const category: Category = {
                    id: "stub",
                    name: "Stub",
                    description: null
                };
                const stub: Transaction[] = [
                    {
                        id: "stub-transaction-id-1",
                        amount: 100.00,
                        date: "2024-08-07T11:22:53.530837484Z",
                        type: "INCOME",
                        category: category
                    },
                    {
                        id: "stub-transaction-id-2",
                        amount: 110.00,
                        date: "2024-08-08T11:22:53.530837484Z",
                        type: "INCOME",
                        category: category
                    },
                ]
                return stub;
            })
    }

    async create(type: string, amount: number, category: Category) {
        console.log({type, amount, category})
        return axios.post<CreateFamilyResponse>("/api/v1/transaction", {type, amount, category})
            .then(response => {
                return response.data
            }).catch(reason => {
                console.log(reason)
                const stub: CreateFamilyResponse = {
                    id: "stub-id"
                }
                return stub;
            })
    }

}

export default new TransactionService();
