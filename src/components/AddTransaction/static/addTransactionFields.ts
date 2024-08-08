import {Category} from "../../../store/category/types/categoryTypes";
import {reactive, ref} from "vue";
import {TransactionEnum, TransactionTypes} from "../../../consts/TransactionTypes";

interface CategoryTypes { text: string, value: Category, disabled: boolean }

export const categoriesType = ref<CategoryTypes[]>([])

export const transactionTypes = [
    {text: TransactionTypes[TransactionEnum.INCOME], value: TransactionEnum.INCOME},
    {text: "Расход", value: "EXPENSE"}
];

export const selectedType = ref(TransactionEnum.INCOME);

export const form = reactive({
    type: "INCOME",
    amount: 0,
    category: {} as Category,
})
