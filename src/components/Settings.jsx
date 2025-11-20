import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function Settings() {
  const [limit, setLimit] = useState('')
  const [month, setMonth] = useState('')
  const [status, setStatus] = useState('')

  const load = async () => {
    const res = await fetch(`${API}/api/budget`)
    const json = await res.json()
    setLimit(json.limit_amount || '')
    setMonth(json.month || '')
  }
  useEffect(() => { load() }, [])

  const save = async (e) => {
    e.preventDefault()
    await fetch(`${API}/api/budget`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ month: month || undefined, limit_amount: parseFloat(limit) || 0 }) })
    setStatus('Saved')
    setTimeout(()=>setStatus(''), 1500)
  }

  return (
    <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-5 max-w-xl">
      <h3 className="text-white font-semibold mb-3">Monthly Budget</h3>
      <form onSubmit={save} className="grid grid-cols-2 gap-3 text-sm">
        <input value={month} onChange={e=>setMonth(e.target.value)} placeholder="YYYY-MM (defaults to current)" className="bg-slate-700/60 text-white rounded px-3 py-2" />
        <input value={limit} onChange={e=>setLimit(e.target.value)} type="number" step="0.01" placeholder="Limit (e.g., 1500)" className="bg-slate-700/60 text-white rounded px-3 py-2" />
        <button className="col-span-2 bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2">Save</button>
        {status && <div className="text-emerald-300">{status}</div>}
      </form>

      <div className="mt-6">
        <h4 className="text-white font-semibold mb-2">Google Pay Integration</h4>
        <p className="text-blue-200 text-sm">Direct Google Pay API access is restricted. Use the CSV statement upload on the Expenses page, or connect a webhook if available that posts normalized events to the integration endpoint.</p>
        <div className="mt-2 p-3 bg-white/5 rounded text-blue-100 text-sm">
          Webhook URL: <code className="text-white">{`${API}/api/integrations/gpay/webhook`}</code>
        </div>
      </div>
    </div>
  )
}
