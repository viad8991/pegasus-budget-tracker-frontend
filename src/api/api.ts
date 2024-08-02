export interface User {
    id?: string;
    token?: string;
    username?: string;
    email?: string;
    isActive?: boolean;
    verified?: boolean;
    isAdmin?: boolean;
    hasFamily?: boolean;
}
