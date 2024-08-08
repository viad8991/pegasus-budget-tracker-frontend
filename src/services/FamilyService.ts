import axios from "../utils/axios";

/* TODO temp */
interface CreateFamilyResponse {
    id: string | null;
}

/* TODO end temp */

class FamilyService {

    async create() {
        return axios.post<CreateFamilyResponse>("/api/v1/family", {})
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

export default new FamilyService();
