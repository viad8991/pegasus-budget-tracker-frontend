// TODO
// Типы разбиваем на отдельные файлы и не храним в одной папке
// храним по месту их использования, обычно они все внутри store

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
