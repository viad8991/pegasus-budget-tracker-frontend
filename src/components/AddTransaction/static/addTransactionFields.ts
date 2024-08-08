import {Category} from "../../../store/category/types/categoryTypes";
import {reactive, ref} from "vue";

export const categoriesType = ref<{ text: string, value: Category, disabled: boolean }[]>([])

export const transactionTypes = [
    {text: "Приход", value: "INCOME"},
    {text: "Расход", value: "EXPENSE"}
];

export const selectedType = ref("INCOME");

export const form = reactive({
    type: "INCOME",
    amount: 0,
    category: {} as Category,
})
