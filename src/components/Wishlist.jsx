import { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function Wishlist() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ name: '', estimated_price: '', priority: 'Medium', deadline_month: '' })

  const load = async () => {
    const res = await fetch(`${API}/api/wishlist`)
    const json = await res.json()
    setItems(json)
  }
  useEffect(() => { load() }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    const payload = { ...form, estimated_price: parseFloat(form.estimated_price) || 0 }
    await fetch(`${API}/api/wishlist`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    setForm({ name: '', estimated_price: '', priority: 'Medium', deadline_month: '' })
    load()
  }

  const remove = async (id) => {
    await fetch(`${API}/api/wishlist/${id}`, { method: 'DELETE' })
    load()
  }

  const markPurchased = async (id) => {
    await fetch(`${API}/api/wishlist/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ purchased: true }) })
    load()
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-5">
        <h3 className="text-white font-semibold mb-3">Add Wishlist Item</h3>
        <form onSubmit={onSubmit} className="grid grid-cols-2 gap-3 text-sm">
          <input value={form.name} onChange={e=>setForm(f=>({...f, name:e.target.value}))} placeholder="Item name" className="col-span-2 bg-slate-700/60 text-white rounded px-3 py-2" required />
          <input value={form.estimated_price} onChange={e=>setForm(f=>({...f, estimated_price:e.target.value}))} type="number" step="0.01" placeholder="Estimated price" className="bg-slate-700/60 text-white rounded px-3 py-2" required />
          <select value={form.priority} onChange={e=>setForm(f=>({...f, priority:e.target.value}))} className="bg-slate-700/60 text-white rounded px-3 py-2">
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <input value={form.deadline_month} onChange={e=>setForm(f=>({...f, deadline_month:e.target.value}))} placeholder="YYYY-MM (optional)" className="bg-slate-700/60 text-white rounded px-3 py-2" />
          <button className="col-span-2 bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2">Save</button>
        </form>
      </div>

      <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-5">
        <h3 className="text-white font-semibold mb-3">Wishlist</h3>
        <div className="max-h-[420px] overflow-auto divide-y divide-white/5">
          {items.map(i => (
            <div key={i.id} className="py-3 flex items-center justify-between text-sm">
              <div>
                <div className="text-white font-medium">{i.name}</div>
                <div className="text-blue-300">₹{i.estimated_price} • {i.priority} {i.deadline_month ? `• ${i.deadline_month}` : ''}</div>
              </div>
              <div className="flex items-center gap-2">
                {!i.purchased && (
                  <button onClick={() => markPurchased(i.id)} className="px-2 py-1 text-xs rounded bg-emerald-500/80 text-white hover:bg-emerald-500">Mark purchased</button>
                )}
                <button onClick={() => remove(i.id)} className="p-2 rounded bg-red-500/10 hover:bg-red-500/20 text-red-300"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
