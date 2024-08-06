import {User} from "./userTypes";

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}

export interface AuthState {
    id: string | null;
    username: string;
    token: string | null;
    hasFamily: boolean;
    isAdmin: boolean;
}
