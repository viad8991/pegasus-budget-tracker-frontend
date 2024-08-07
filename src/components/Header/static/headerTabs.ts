interface HeaderTabs {
    key: string;
    href: string;
    label: string;
    disable: boolean;
    requiresAdmin: boolean;
}

export const headerTabs: HeaderTabs[] = [
    {
        key: "transaction",
        label: "Транзакции",
        href: "/transaction",
        requiresAdmin: false,
        disable: false,
    },
    {
        key: "family",
        label: "Семья",
        href: "/family",
        requiresAdmin: false,
        disable: false,
    },
    {
        key: "user",
        label: "Пользователи",
        href: "/user",
        requiresAdmin: false,
        disable: false,
    },
    {
        key: "category",
        label: "Категории",
        href: "/category",
        requiresAdmin: false,
        disable: false,
    },
];
