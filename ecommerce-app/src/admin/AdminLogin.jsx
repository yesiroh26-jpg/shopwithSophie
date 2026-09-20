import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ADMIN_CODE, ADMIN_SESSION_KEY } from './adminData'

export default function AdminLogin({ onLogin }) {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  function submit(event) {
    event.preventDefault()
    if (code.trim().toUpperCase() === ADMIN_CODE) {
      localStorage.setItem(ADMIN_SESSION_KEY, 'active')
      onLogin()
    } else setError('That access code is not recognised.')
  }

  return (
    <div className="min-h-screen bg-bg px-4 py-10 text-ink">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">
        <form onSubmit={submit} className="w-full rounded-2xl border border-border bg-surface p-8 shadow-xl">
          <div className="mb-8 flex items-center justify-between">
            <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Naija Table</p><h1 className="mt-2 font-display text-3xl">Admin access</h1></div>
            <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">Private</span>
          </div>
          <p className="mb-6 text-sm leading-relaxed text-ink-muted">Enter the restaurant access code to manage menus, orders, customers, and daily operations.</p>
          <label className="text-xs font-bold uppercase tracking-wide text-ink-muted">Access code</label>
          <input autoFocus value={code} onChange={(event) => { setCode(event.target.value); setError('') }} placeholder="SOPHIE-ADMIN" className="mt-2 w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm uppercase tracking-widest text-ink outline-none focus:border-accent" />
          {error && <p className="mt-2 text-xs font-semibold text-red-400">{error}</p>}
          <button className="mt-6 w-full rounded-xl bg-accent px-4 py-3 text-sm font-bold text-ink transition hover:bg-accent-dark">Enter dashboard</button>
          <Link to="/" className="mt-5 block text-center text-xs text-ink-muted hover:text-accent">Back to customer website</Link>
        </form>
      </div>
    </div>
  )
}
