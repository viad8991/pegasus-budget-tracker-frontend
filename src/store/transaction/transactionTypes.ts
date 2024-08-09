import {Category} from "../category/categoryTypes";

export interface Transaction {
    id: string;
    amount: number;
    date: string;
    category: Category;
}
