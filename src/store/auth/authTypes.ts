import {User} from "../user/userTypes";

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}

export interface LoginResponse {
    token: string;
    user: User;
}

export interface AuthState {
    // id: string | null;
    // username: string;
    token: string | null;
    user: User | null;
    // hasFamily: boolean;
    // isAdmin: boolean;
}
