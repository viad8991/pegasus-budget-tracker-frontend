export interface User {
    id: string;
    username: string;
    email?: string;
    isAdmin: boolean;
    hasFamily: boolean;
    verified: boolean;
}
