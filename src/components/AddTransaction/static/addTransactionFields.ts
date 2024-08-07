import {Category} from "../../../store/category/types/categoryTypes";
import {reactive, ref} from "vue";

export const categoriesType = ref<{ text: string, value: Category, disabled: boolean }[]>([])

export const transactionType = [
    {text: "...", value: "", disabled: true},
    {text: "Приход", value: "INCOME"},
    {text: "Расход", value: "EXPENSE"}
]

export const form = reactive({
    type: "",
    amount: 0,
    category: {} as Category,
})
