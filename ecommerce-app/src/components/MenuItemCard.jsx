import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatNaira } from '../utils/currency'

export default function MenuItemCard({ item }) {
  const { addItem } = useCart()

  return (
    <div className="rounded-xl border border-border bg-surface p-3">
      <Link to={`/menu/${item.id}`} className="relative block overflow-hidden rounded-lg">
        {item.popular && (
          <span className="absolute left-2 top-2 z-10 whitespace-nowrap rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-ink">
            Popular
          </span>
        )}
        <img
          src={item.image}
          alt={item.name}
          className="aspect-square w-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </Link>

      <Link to={`/menu/${item.id}`} className="mt-3 block text-sm font-semibold text-accent hover:text-accent-dark transition-colors">
        {item.name}
      </Link>

      <p className="mt-1 line-clamp-2 text-xs text-ink-muted">{item.description}</p>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-base font-bold text-ink">{formatNaira(item.price)}</span>
        <button
          onClick={() => addItem(item)}
          aria-label={`Add ${item.name} to order`}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-ink hover:bg-accent-dark transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
