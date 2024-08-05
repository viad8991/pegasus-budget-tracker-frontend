export interface LoginUser {
    token: string;
    user: User;
}

export interface User {
    id: string;
    username: string;
    email?: string;
    isActive: boolean;
    verified: boolean;
    isAdmin: boolean;
    hasFamily: boolean;
}

export interface Category {
    id: string | null;
    name: string;
    description: string | null;
    // created: string;
    // update: string;
}
