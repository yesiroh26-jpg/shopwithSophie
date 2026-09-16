import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import MenuGrid from '../components/MenuGrid'
import { menuItems, categories } from '../data/menu'

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams()
  const urlQuery = searchParams.get('q') || ''
  const activeCategory = searchParams.get('category') || ''
  const [searchInput, setSearchInput] = useState(urlQuery)

  function setCategory(cat) {
    const next = new URLSearchParams(searchParams)
    if (cat) next.set('category', cat)
    else next.delete('category')
    setSearchParams(next)
  }

  function handleSearch(e) {
    e.preventDefault()
    const next = new URLSearchParams(searchParams)
    if (searchInput.trim()) next.set('q', searchInput.trim())
    else next.delete('q')
    setSearchParams(next)
  }

  const filtered = useMemo(() => {
    let list = menuItems
    if (urlQuery) {
      const q = urlQuery.toLowerCase()
      list = list.filter((m) => m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q))
    }
    if (activeCategory) {
      list = list.filter((m) => m.category === activeCategory)
    }
    return list
  }, [urlQuery, activeCategory])

  return (
    <div>
      {/* Hero banner */}
      <section className="bg-olive py-16 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">Chef's Favorites</p>
        <h1 className="mt-1 font-display text-4xl text-ink">Our Menu</h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">
          Nigerian classics from across the country — pick a category or search for something specific.
        </p>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        {/* Search */}
        <form onSubmit={handleSearch} className="mx-auto flex max-w-md gap-2">
          <input
            type="text"
            placeholder="Search the menu"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-1 rounded-full border-2 border-accent bg-surface px-4 py-2 text-sm text-ink outline-none"
          />
          <button type="submit" className="rounded-full bg-accent px-6 py-2 text-sm font-semibold text-ink hover:bg-accent-dark transition-colors">
            Go
          </button>
        </form>

        {/* Category tabs */}
        <div className="mt-8 flex flex-wrap justify-center gap-2 border-b border-border pb-4">
          <button
            onClick={() => setCategory('')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === '' ? 'bg-accent text-ink' : 'text-ink-muted hover:text-accent'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === cat ? 'bg-accent text-ink' : 'text-ink-muted hover:text-accent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <p className="mt-4 text-sm text-ink-muted">{filtered.length} items</p>

        {/* Item grid */}
        <div className="mt-4">
          <MenuGrid items={filtered} />
        </div>
      </div>
    </div>
  )
}
