import axios from "../utils/axios";
import {CreateFamilyResponse, MemberTransaction} from "../store/family/familyTypes";

class FamilyService {

    async create() {
        return axios.post<CreateFamilyResponse>("/api/v1/family/", {})
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

    async members() {
        return axios.get<MemberTransaction[]>("/api/v1/family/members")
            .then(response => {
                return response.data
            })
    }

    async transaction() {
        return axios.get<MemberTransaction[]>("/api/v1/family/transactions")
            .then(response => {
                return response.data
            })
    }

}

export default new FamilyService();
