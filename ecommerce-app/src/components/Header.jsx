import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useOrderType } from '../context/OrderTypeContext'

const ORDER_TYPES = [
  { value: 'pickup', label: 'Pickup' },
  { value: 'delivery', label: 'Delivery' },
  { value: 'dine-in', label: 'Dine-in' },
]

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
]

function OrderTypeSwitcher() {
  const { orderType, setOrderType } = useOrderType()
  const [open, setOpen] = useState(false)
  const [tableInput, setTableInput] = useState(orderType.tableNumber || '')

  const currentLabel = ORDER_TYPES.find((o) => o.value === orderType.type)?.label || 'Order type'

  function selectType(value) {
    setOrderType({ type: value })
    if (value !== 'dine-in') setOpen(false)
  }

  function confirmTable(e) {
    e.preventDefault()
    setOrderType({ tableNumber: tableInput })
    setOpen(false)
  }

  return (
    <div className="relative shrink-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="rounded-full border border-accent/60 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-accent hover:bg-accent hover:text-ink transition-colors"
      >
        {currentLabel}
        {orderType.type === 'dine-in' && orderType.tableNumber ? ` · Table ${orderType.tableNumber}` : ''}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-30 mt-2 w-56 rounded-xl border border-border bg-surface p-3 shadow-lg">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">Order type</p>
          <div className="flex flex-col gap-1">
            {ORDER_TYPES.map((opt) => (
              <button
                key={opt.value}
                onClick={() => selectType(opt.value)}
                className={`rounded-full px-3 py-2 text-left text-sm transition-colors ${
                  orderType.type === opt.value
                    ? 'bg-accent text-ink'
                    : 'text-ink hover:bg-bg'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {orderType.type === 'dine-in' && (
            <form onSubmit={confirmTable} className="mt-3 flex gap-2">
              <input
                type="text"
                placeholder="Table number"
                value={tableInput}
                onChange={(e) => setTableInput(e.target.value)}
                className="flex-1 rounded-full border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none focus:border-accent"
              />
              <button type="submit" className="rounded-full bg-accent px-3 py-1.5 text-sm font-medium text-ink hover:bg-accent-dark transition-colors">
                Set
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  )
}

export default function Header() {
  const { count } = useCart()

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-bg/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-4 md:px-6">
        <Link to="/" className="font-display text-xl italic font-semibold shrink-0 text-ink">
          Naija Table
        </Link>

        <nav className="ml-2 hidden flex-1 items-center gap-8 text-xs font-semibold uppercase tracking-wide md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `border-b-2 pb-1 transition-colors ${
                  isActive ? 'border-accent text-ink' : 'border-transparent text-ink-muted hover:text-ink'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <OrderTypeSwitcher />
          <Link to="/cart" className="relative shrink-0 rounded-full border border-border p-2 text-ink hover:border-accent hover:text-accent transition-colors" aria-label="View order">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-ink">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}
