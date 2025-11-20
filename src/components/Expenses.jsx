import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function Expenses() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ date: '', amount: '', merchant: '', category: '' })

  const load = async () => {
    const res = await fetch(`${API}/api/transactions`)
    const json = await res.json()
    setItems(json)
  }
  useEffect(() => { load() }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    const payload = { ...form, amount: parseFloat(form.amount), date: new Date(form.date).toISOString().slice(0,10) }
    await fetch(`${API}/api/transactions`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    setForm({ date: '', amount: '', merchant: '', category: '' })
    load()
  }

  const onUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const fd = new FormData()
    fd.append('file', file)
    await fetch(`${API}/api/transactions/upload`, { method: 'POST', body: fd })
    load()
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-5">
        <h3 className="text-white font-semibold mb-3">Add Expense</h3>
        <form onSubmit={onSubmit} className="grid grid-cols-2 gap-3 text-sm">
          <input value={form.date} onChange={e=>setForm(f=>({...f, date:e.target.value}))} type="date" className="col-span-2 md:col-span-1 bg-slate-700/60 text-white rounded px-3 py-2" required />
          <input value={form.amount} onChange={e=>setForm(f=>({...f, amount:e.target.value}))} type="number" step="0.01" placeholder="Amount" className="bg-slate-700/60 text-white rounded px-3 py-2" required />
          <input value={form.merchant} onChange={e=>setForm(f=>({...f, merchant:e.target.value}))} placeholder="Merchant" className="col-span-2 md:col-span-1 bg-slate-700/60 text-white rounded px-3 py-2" required />
          <input value={form.category} onChange={e=>setForm(f=>({...f, category:e.target.value}))} placeholder="Category" className="bg-slate-700/60 text-white rounded px-3 py-2" />
          <button className="col-span-2 bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2">Save</button>
        </form>
        <div className="mt-4">
          <label className="text-blue-200 text-sm">Upload statement (CSV)</label>
          <input onChange={onUpload} type="file" accept=".csv" className="mt-1 block text-blue-100 text-sm" />
        </div>
      </div>

      <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-5">
        <h3 className="text-white font-semibold mb-3">Transactions</h3>
        <div className="max-h-[420px] overflow-auto divide-y divide-white/5">
          {items.map(t => (
            <div key={t.id} className="py-3 flex items-center justify-between text-sm">
              <div>
                <div className="text-white">{t.merchant}</div>
                <div className="text-blue-300">{new Date(t.date).toLocaleDateString()} • {t.category || 'Uncategorized'}</div>
              </div>
              <div className="text-white">₹{t.amount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
