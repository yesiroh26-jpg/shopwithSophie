import { useState } from 'react'
import { Link } from 'react-router-dom'
import { menuItems } from '../data/menu'
import { useOrderType } from '../context/OrderTypeContext'
import { useReviews } from '../context/ReviewsContext'
import MenuGrid from '../components/MenuGrid'
import HeroIllustration from '../components/HeroIllustration'

const ORDER_TYPES = [
  { value: 'pickup', label: 'Pickup' },
  { value: 'delivery', label: 'Delivery' },
  { value: 'dine-in', label: 'Dine-in' },
]

const FEATURES = [
  { label: 'Fresh Ingredients', sub: 'Sourced Daily' },
  { label: 'Award Winning', sub: 'Culinary Excellence' },
  { label: 'Expertly Crafted', sub: 'By Passionate Chefs' },
]

const STATS = [
  { value: '5+', label: 'Years of Excellence' },
  { value: '77+', label: 'Menu Items' },
  { value: '2k+', label: 'Happy Guests' },
]

function initials(name) {
  return name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
}

export default function Home() {
  const { orderType, setOrderType } = useOrderType()
  const { getReviews } = useReviews()
  const [tableInput, setTableInput] = useState(orderType.tableNumber || '')

  const popular = menuItems.filter((m) => m.popular)
  const signature = popular.slice(0, 4)
  const collageItems = popular.slice(4, 7)

  const testimonialSources = popular.slice(1, 4)
  const testimonials = testimonialSources
    .map((item) => ({ item, review: getReviews(item.id)[0] }))
    .filter((t) => t.review)

  function selectType(value) {
    setOrderType({ type: value })
  }

  function confirmTable(e) {
    e.preventDefault()
    setOrderType({ tableNumber: tableInput })
  }

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Traditional Cuisine</p>
            <h1 className="mt-3 font-display text-4xl leading-[1.05] text-ink md:text-5xl">
              Taste Crafted to <span className="text-accent">Perfection</span>
            </h1>
            <div className="mt-4 h-px w-24 bg-border" />
            <p className="mt-4 max-w-sm text-sm text-ink-muted">
              Crafting exceptional Nigerian and continental dishes, one plate at a time.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/menu"
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink hover:bg-accent-dark transition-colors"
              >
                Order Now →
              </Link>
              <button
                onClick={() => selectType('dine-in')}
                className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-ink hover:border-accent hover:text-accent transition-colors"
              >
                Reserve Table
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {ORDER_TYPES.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => selectType(opt.value)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium border transition-colors ${
                    orderType.type === opt.value
                      ? 'bg-accent border-accent text-ink'
                      : 'border-border text-ink-muted hover:border-accent hover:text-accent'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {orderType.type === 'dine-in' && (
              <form onSubmit={confirmTable} className="mt-3 flex max-w-xs gap-2">
                <input
                  type="text"
                  placeholder="Table number"
                  value={tableInput}
                  onChange={(e) => setTableInput(e.target.value)}
                  className="flex-1 rounded-full border border-border bg-surface px-4 py-2 text-sm text-ink outline-none focus:border-accent"
                />
                <button type="submit" className="rounded-full bg-olive px-4 py-2 text-sm font-medium text-ink hover:bg-olive-dark transition-colors">
                  Set
                </button>
              </form>
            )}
            {orderType.type === 'dine-in' && orderType.tableNumber && (
              <p className="mt-2 text-sm text-accent">Ordering for table {orderType.tableNumber}</p>
            )}

            <div className="mt-8 flex flex-wrap gap-6 border-t border-border pt-6">
              {FEATURES.map((f) => (
                <div key={f.label}>
                  <p className="text-xs font-semibold text-ink">{f.label}</p>
                  <p className="text-xs text-ink-muted">{f.sub}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-lg">
            <div className="h-full w-full overflow-hidden rounded-full border border-border">
              <img src="/hero-plate.jpeg" alt="signature dish" className='h-full w-full object-cover' />
            </div>
            <div className="font-display absolute bottom-4 right-4 flex h-24 w-24 flex-col items-center justify-center overflow-hidden rounded-full border border-accent/60 bg-bg px-2 text-center leading-tight text-accent font-equise">
             <span className="text-[10px] font-bold uppercase tracking-wide">Est. 2020</span>
              <span className="mt-1 text-[10px] text-ink-muted">Naija Table</span>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Collection */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-accent">Chef's Favorites</p>
        <h2 className="mt-1 text-center font-display text-3xl">
          Signature <span className="text-accent">Collection</span>
        </h2>
        <p className="mx-auto mt-2 max-w-md text-center text-sm text-ink-muted">
          Handpicked favorites from our menu, crafted with passion and designed to leave a lasting impression.
        </p>

        <div className="mt-8">
          <MenuGrid items={signature} />
        </div>

        <div className="mt-8 text-center">
          <Link to="/menu" className="inline-block rounded-full border border-accent px-6 py-3 text-sm font-semibold text-accent hover:bg-accent hover:text-ink transition-colors">
            View Full Menu →
          </Link>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-surface py-12">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:items-center md:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Our Story</p>
            <h2 className="mt-1 font-display text-3xl">
              Passion in <span className="text-accent">Every Plate</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              At Naija Table, we believe great food brings people together. Our menu brings Yoruba,
              Igbo, Hausa, Efik and Edo dishes side by side with pizza, pasta, and grills — so every
              guest finds something that feels like home.
            </p>
            <div className="mt-6 flex gap-8 border-t border-border pt-6">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl text-accent">{s.value}</p>
                  <p className="text-xs text-ink-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {collageItems[0] && (
              <img src={collageItems[0].image} alt={collageItems[0].name} className="col-span-2 aspect-video w-full rounded-xl object-cover" />
            )}
            {collageItems[1] && (
              <img src={collageItems[1].image} alt={collageItems[1].name} className="aspect-square w-full rounded-xl object-cover" />
            )}
            {collageItems[2] && (
              <img src={collageItems[2].image} alt={collageItems[2].name} className="aspect-square w-full rounded-xl object-cover" />
            )}
          </div>
        </div>
      </section>

      {/* Testimonials — pulled from real review data */}
      {testimonials.length > 0 && (
        <section className="py-12">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-accent">What Our Guests Say</p>
            <h2 className="mt-1 text-center font-display text-3xl">
              Unforgettable <span className="text-accent">Experiences</span>
            </h2>

            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {testimonials.map(({ item, review }) => (
                <div key={item.id} className="rounded-xl border border-border bg-surface p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-olive text-xs font-semibold text-ink">
                      {initials(review.name)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{review.name}</p>
                      <p className="text-xs text-sale">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-ink-muted">"{review.comment}"</p>
                  <p className="mt-3 text-xs text-ink-muted">on {item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
