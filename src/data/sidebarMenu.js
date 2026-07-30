const SIDEBAR_ITEMS = [
    {
        id: 'dashboard',
        name: 'Dashboard',
        icon: 'dashboard',
        path: '/dashboard',
    },
    {
        id: 'inventory',
        name: 'Inventory',
        icon: 'inventory',
        children: [
            { path: '/inventory/my-inventory', name: 'My inventory' },
            { path: '/inventory/purchase', name: 'Purchase' },
            { path: '/inventory/inventory-adjustment', name: 'Inventory adjustment' },
        ],
    },
    {
        id: 'online-store',
        name: 'Online store',
         icon: 'inventory',
        children: [
            { path: '/online-orders', name: 'Online Orders' },
            { path: '/settlement-payout', name: 'Settlement & payout' },
            { path: '/order-history', name: 'Order history' },
            { path: '/credit-notes', name: 'Credit notes' },
            { path: '/return-replacement', name: 'Return & Replacement', badge: 4 },
        ],
    },
    {
        id: 'offline-store',
        name: 'Offline store',
         icon: 'inventory',
        children: [
            { path: '/pos-billing', name: 'POS & Billing' },
            { path: '/transaction-history', name: 'Transaction History' },
            { path: '/offline-credit-notes', name: 'Credit notes' },
            { path: '/return', name: 'Return', badge: 4 },
        ],
    },
    {
        id: 'discrepancies',
        name: 'Discrepancies',
        icon: 'discrepancies',
        path: '/discrepancies',
        badge: 4,
    },
    {
        id: 'settings',
        name: 'Settings',
        icon: 'settings',
        path: '/settings',
    },
];

export function getSidebarItems() {
    return SIDEBAR_ITEMS;
}

export function getPageTitle(pathname) {
    for (const item of SIDEBAR_ITEMS) {
        if (item.path === pathname) {
            return item.name;
        }
        if (item.children) {
            const child = item.children.find((childItem) => childItem.path === pathname);
            if (child) {
                return child.name;
            }
        }
    }
    return 'Dashboard';
}
