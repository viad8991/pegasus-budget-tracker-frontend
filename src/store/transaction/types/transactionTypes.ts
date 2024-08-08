import {Category} from "../../category/types/categoryTypes";

export interface Transaction {
    id: string;
    amount: number;
    date: string;
    category: Category;
}
