export enum TransactionEnum {
    INCOME = "INCOME",
    EXPENSE = "EXPENSE",
}

export const TransactionTypes = {
    [TransactionEnum.INCOME]: "Приход",
    [TransactionEnum.EXPENSE]: "Расход",
};

export const transactionTypesOptions = [
    {text: TransactionTypes[TransactionEnum.INCOME], value: TransactionEnum.INCOME},
    {text: TransactionTypes[TransactionEnum.EXPENSE], value: TransactionEnum.EXPENSE},
];
