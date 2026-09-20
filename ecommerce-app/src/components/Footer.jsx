import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 md:grid-cols-4 md:px-6">
        <div>
          <p className="font-display text-xl italic font-semibold text-ink">Naija Table</p>
          <p className="mt-2 text-sm text-ink-muted">
            Elevating taste, crafting memories. Experience Nigerian dining like never before.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Quick Links</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-ink-muted">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <Link to="/menu" className="hover:text-accent transition-colors">Menu</Link>
            <Link to="/about" className="hover:text-accent transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-accent transition-colors">Contact</Link>
            <Link to="/admin" className="hover:text-accent transition-colors">Admin</Link>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Contact Us</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-ink-muted">
            <p>14 Admiralty Way, Lekki Phase 1, Lagos</p>
            <p>+234 901 084 8063</p>
            <p>hello@naijatable.com</p>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Newsletter</p>
          <p className="mt-3 text-sm text-ink-muted">Stay updated with our latest offers and specials.</p>
          <form className="mt-3 flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email"
              className="w-full min-w-0 rounded-full border border-border bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-accent"
            />
            <button type="submit" className="shrink-0 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-ink hover:bg-accent-dark transition-colors">
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-border py-4 text-center text-xs text-ink-muted">
        © {new Date().getFullYear()} Naija Table. All rights reserved.
      </div>
    </footer>
  )
}
