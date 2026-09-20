import { categories, menuItems } from '../data/menu'

export const ADMIN_CODE = 'SOPHIE-ADMIN'
export const CURRENCY = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 })
export const ORDER_KEY = 'naija_table_admin_orders'
export const MENU_KEY = 'naija_table_admin_menu'
export const ADMIN_SESSION_KEY = 'naija_table_admin_session'

export function readStorage(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) || fallback } catch { return fallback }
}

export function initialMenu() {
  const storedMenu = readStorage(MENU_KEY, null)
  return Array.isArray(storedMenu) ? storedMenu : menuItems.slice(0, 8).map(({ id, name, category, price, popular }) => ({ id, name, category, price, popular }))
}

export { categories }
