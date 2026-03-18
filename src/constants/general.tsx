import type { MenuItems } from "#/types/general";

export const ACCESS_TOKEN_LIFETIME = 6;
export const REFRESH_TOKEN_LIFETIME = 3;
export const REFRESH_TOKEN_BYTE_SIZE = 64;
export const HASH_PASSWORD_MEMORY_COST = 2 ** 14;
export const HASH_PASSWORD_TIME_COST = 3;
export const HASH_PASSWORD_PARALLELISM = 1;
export const ADMIN_NAME = 'Administrator';
export const ADMIN_USERNAME = 'admin';
export const ADMIN_PASSWORD = 'admin';

export const MENU_ITEMS: MenuItems[] = [
    {
        label: 'Dashboard',
        icon: 'gauge',
        to: '/app',
        isRoot: true,
    },
    {
        label: 'Contacts',
        icon: 'contact',
        to: '/app',
        isRoot: true,
        childMenus: [
            {
                label: 'Customers',
                to: '/app',
            },
            {
                label: 'Vendors',
                to: '/app',
            },
            {
                label: 'Configuration',
                to: '/app',
                childMenus: [
                    {
                        label: 'Township',
                        to: '/app',
                    },
                    {
                        label: 'City',
                        to: '/app',
                    },
                    {
                        label: 'State',
                        to: '/app',
                    },
                    {
                        label: 'Tags',
                        to: '/app',
                    },
                ]
            },
        ]
    },
    {
        label: 'Sales',
        icon: 'badge-dollar-sign',
        to: '/app',
        isRoot: true,
        childMenus: [
            {
                label: 'Orders',
                to: '/app',
            },
            {
                label: 'Shops',
                to: '/app',
            },
            {
                label: 'Price Matrix',
                to: '/app',
            },
            {
                label: 'Promotions',
                to: '/app',
            },
        ]
    },
    {
        label: 'Purchase',
        icon: 'shopping-basket',
        to: '/app',
        isRoot: true,
        childMenus: [
            {
                label: 'Orders',
                to: '/app',
            },
            {
                label: 'Shops',
                to: '/app',
            },
            {
                label: 'Price Matrix',
                to: '/app',
            },
            {
                label: 'Promotions',
                to: '/app',
            },
        ]
    },
    {
        label: 'Inventory',
        icon: 'warehouse',
        to: '/app',
        isRoot: true,
        childMenus: [
            {
                label: 'Products',
                to: '/app',
            },
            {
                label: 'Transfers',
                to: '/app',
                childMenus: [
                    {
                        label: 'Internal Transfers',
                        to: '/app'
                    },
                    {
                        label: 'Deliveries',
                        to: '/app'
                    },
                    {
                        label: 'Receipts',
                        to: '/app'
                    }
                ]
            },
            {
                label: 'Configuration',
                to: '/app',
                childMenus: [
                    {
                        label: 'Product Category',
                        to: '/app'
                    },
                    {
                        label: 'Warehouse',
                        to: '/app'
                    },
                    {
                        label: 'Unit of Measure',
                        to: '/app'
                    }
                ]
            },
        ]
    },
    {
        label: 'Accounting',
        icon: 'notebook-pen',
        to: '/app',
        isRoot: true,
        childMenus: [
            {
                label: 'Journal Entries',
                to: '/app'
            },
            {
                label: 'Journal Items',
                to: '/app'
            },
            {
                label: 'Configuration',
                to: '/app',
                childMenus: [
                    {
                        label: 'Chart of Accounts',
                        to: '/'
                    },
                    {
                        label: 'Taxes',
                        to: '/'
                    },
                    {
                        label: 'Analytic Accounts',
                        to: '/'
                    }
                ]
            }
        ]
    },
    {
        label: 'Settings',
        icon: 'settings',
        to: '/app',
        childMenus: [
            {
                label: 'Users',
                to: '/app',
                childMenus: [
                    {
                        label: 'App Users',
                        to: '/app/app-user/list'
                    }
                ]
            },
            {
                label: 'Companies',
                to: '/app'
            }
        ],
        isRoot: true,
    }
];