import { useState } from 'react'
import { Link } from 'react-router-dom'
import { readStorage } from './adminData'

export default function CustomerAccess() {
  const [mode, setMode] = useState('code')
  const [code, setCode] = useState('')
  const [entered, setEntered] = useState(false)
  const [account, setAccount] = useState({ name: '', phone: '' })
  const [accountCreated, setAccountCreated] = useState(false)

  function createAccount(event) {
    event.preventDefault()
    if (!account.name.trim() || !account.phone.trim()) return
    const accounts = readStorage('naija_table_customer_accounts', [])
    localStorage.setItem('naija_table_customer_accounts', JSON.stringify([...accounts, { ...account, id: Date.now() }]))
    setAccountCreated(true)
  }

  return (
    <div className="min-h-screen bg-bg px-4 py-10 text-ink"><div className="mx-auto max-w-md text-center">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Naija Table guest access</p><h1 className="mt-3 font-display text-4xl">Order from your table</h1>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted">Scan the QR code on your table, use a table code, or create a quick guest account.</p>
      <div className="mt-8 flex rounded-xl border border-border bg-surface p-1"><button onClick={() => setMode('code')} className={`flex-1 rounded-lg px-3 py-2 text-xs font-bold ${mode === 'code' ? 'bg-accent text-ink' : 'text-ink-muted'}`}>Table access</button><button onClick={() => setMode('account')} className={`flex-1 rounded-lg px-3 py-2 text-xs font-bold ${mode === 'account' ? 'bg-accent text-ink' : 'text-ink-muted'}`}>New customer</button></div>
      {mode === 'code' ? <><div className="mx-auto mt-8 flex h-48 w-48 items-center justify-center rounded-2xl border-8 border-ink bg-white text-center text-xs font-black text-black [background-image:repeating-linear-gradient(45deg,#111_0_3px,transparent_3px_9px),repeating-linear-gradient(-45deg,#111_0_2px,transparent_2px_8px)]">NT<br />TABLE<br />QR</div><div className="mt-8 flex gap-2"><input value={code} onChange={(event) => setCode(event.target.value)} placeholder="Table code" className="min-w-0 flex-1 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-ink outline-none focus:border-accent" /><button onClick={() => setEntered(Boolean(code.trim()))} className="rounded-xl bg-accent px-4 py-3 text-sm font-bold text-ink">Enter</button></div>{entered && <Link to="/menu" className="mt-5 inline-block text-sm font-bold text-accent">Continue to menu →</Link>}</> : <form onSubmit={createAccount} className="mt-8 rounded-2xl border border-border bg-surface p-5 text-left"><label className="text-xs font-bold uppercase tracking-wide text-ink-muted">Your name<input required value={account.name} onChange={(event) => setAccount({ ...account, name: event.target.value })} className="mt-2 w-full rounded-xl border border-border bg-bg px-3 py-3 text-sm text-ink outline-none focus:border-accent" /></label><label className="mt-4 block text-xs font-bold uppercase tracking-wide text-ink-muted">Phone number<input required value={account.phone} onChange={(event) => setAccount({ ...account, phone: event.target.value })} className="mt-2 w-full rounded-xl border border-border bg-bg px-3 py-3 text-sm text-ink outline-none focus:border-accent" /></label><button className="mt-5 w-full rounded-xl bg-accent px-4 py-3 text-sm font-bold text-ink">Create guest account</button>{accountCreated && <Link to="/menu" className="mt-4 block text-center text-sm font-bold text-accent">Account ready. Continue to menu →</Link>}</form>}
      <Link to="/" className="mt-8 block text-xs text-ink-muted hover:text-accent">Back to website</Link>
    </div></div>
  )
}
