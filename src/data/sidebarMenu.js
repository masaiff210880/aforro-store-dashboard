export const PAGE_TITLES = {
  '/dashboard': 'Dashboard',
  '/leaderboard': 'Leaderboard',
  '/user': 'User',
  '/order': 'Order',
  '/products': 'Products',
  '/sales-report': 'Sales Report',
  '/messages': 'Messages',
  '/settings': 'Settings',
}

export function getPageTitle(pathname) {
  return PAGE_TITLES[pathname] || 'Dashboard'
}

const SIDEBAR_MENU = [
  { path: '/dashboard', name: 'Dashboard', icon: 'dashboard' },
  { path: '/leaderboard', name: 'Leaderboard', icon: 'leaderboard' },
  { path: '/user', name: 'User', icon: 'user' },
  { path: '/order', name: 'Order', icon: 'order' },
  { path: '/products', name: 'Products', icon: 'products' },
  { path: '/sales-report', name: 'Sales Report', icon: 'sales-report' },
  { path: '/messages', name: 'Messages', icon: 'messages' },
  { path: '/settings', name: 'Settings', icon: 'settings' },
]

export function getSidebarMenu() {
  return SIDEBAR_MENU
}
