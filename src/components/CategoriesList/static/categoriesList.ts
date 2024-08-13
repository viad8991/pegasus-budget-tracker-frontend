import {TransactionEnum, TransactionTypes} from "../../../consts/TransactionTypes";

export const tableFields = [
    {key: 'id', label: 'ID', type: "text"},
    {key: 'name', label: 'Название', type: "text"},
    {key: 'description', label: 'Описание', type: "text"},
    {key: 'update', label: 'Обновление', type: "datetime"},
    {key: 'created', label: 'Создание', type: "datetime"},
];

export const defaultFormFields = {
    id: "",
    name: "",
    type: TransactionTypes[TransactionEnum.INCOME],
    description: null
};
