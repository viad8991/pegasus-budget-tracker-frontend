import {User} from "../user/userTypes";
import {Transaction} from "../transaction/transactionTypes";

export interface CreateFamilyResponse {
    id: string | null;
}

export interface MemberTransaction {
    user: User;
    transaction: Transaction
}
