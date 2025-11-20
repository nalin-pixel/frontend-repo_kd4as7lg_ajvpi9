import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function AISuggestions() {
  const [data, setData] = useState({ daily_allowance: 0, remaining_days: 0, affordable: [], plan: [], message: '' })
  const [alerts, setAlerts] = useState({ alerts: [] })

  const load = async () => {
    const s = await fetch(`${API}/api/suggestions`).then(r=>r.json())
    const a = await fetch(`${API}/api/alerts`).then(r=>r.json())
    setData(s)
    setAlerts(a)
  }
  useEffect(() => { load() }, [])

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-5">
        <h3 className="text-white font-semibold mb-2">Spending Guidance</h3>
        <div className="text-blue-200 text-sm">Daily spendable amount</div>
        <div className="text-white text-2xl font-semibold mt-1">₹{data.daily_allowance?.toFixed?.(2) || 0}</div>
        <div className="text-blue-300 text-sm mt-1">for the next {data.remaining_days} days</div>
        <ul className="mt-4 list-disc list-inside space-y-1 text-blue-100 text-sm">
          {data.plan?.map((p, i) => (<li key={i}>{p}</li>))}
        </ul>
        <div className="text-blue-300 text-sm mt-2">{data.message}</div>
      </div>

      <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-5">
        <h3 className="text-white font-semibold mb-2">Alerts</h3>
        <ul className="space-y-2 text-sm text-blue-100">
          {alerts.alerts?.length ? alerts.alerts.map((a,i)=>(<li key={i} className="p-2 rounded bg-white/5">{a}</li>)) : <li className="text-blue-300">No alerts</li>}
        </ul>
      </div>
    </div>
  )
}
