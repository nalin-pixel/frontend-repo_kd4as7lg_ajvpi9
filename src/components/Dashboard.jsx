import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function Dashboard() {
  const [data, setData] = useState({ limit_amount: 0, spent: 0, remaining: 0, percent_used: 0, month: '' })

  const fetchSummary = async () => {
    const res = await fetch(`${API}/api/summary`)
    const json = await res.json()
    setData(json)
  }

  useEffect(() => { fetchSummary() }, [])

  const bar = Math.min(100, data.percent_used || 0)

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-5">
        <h3 className="text-white font-semibold mb-2">Monthly Budget</h3>
        <div className="text-blue-200 text-sm">{data.month}</div>
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-blue-100">
          <div>
            <div className="text-blue-300">Total Budget</div>
            <div className="text-white text-xl">₹{data.limit_amount?.toFixed?.(2) || 0}</div>
          </div>
          <div>
            <div className="text-blue-300">Amount Spent</div>
            <div className="text-white text-xl">₹{data.spent?.toFixed?.(2) || 0}</div>
          </div>
          <div>
            <div className="text-blue-300">Remaining</div>
            <div className="text-white text-xl">₹{data.remaining?.toFixed?.(2) || 0}</div>
          </div>
          <div>
            <div className="text-blue-300">Used</div>
            <div className="text-white text-xl">{data.percent_used}%</div>
          </div>
        </div>
        <div className="mt-4 h-3 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-violet-500" style={{ width: `${bar}%` }} />
        </div>
      </div>

      <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-5">
        <h3 className="text-white font-semibold mb-2">AI Suggestions</h3>
        <SuggestionsCard />
      </div>
    </div>
  )
}

function SuggestionsCard() {
  const [data, setData] = useState({ daily_allowance: 0, remaining_days: 0, plan: [], message: '' })
  const API = import.meta.env.VITE_BACKEND_URL || ''
  const fetchData = async () => {
    const res = await fetch(`${API}/api/suggestions`)
    const json = await res.json()
    setData(json)
  }
  useEffect(() => { fetchData() }, [])

  return (
    <div>
      <div className="text-blue-200 text-sm">Daily spendable amount</div>
      <div className="text-white text-2xl font-semibold mt-1">₹{data.daily_allowance?.toFixed?.(2) || 0}</div>
      <div className="text-blue-300 text-sm mt-1">for the next {data.remaining_days} days</div>
      <ul className="mt-4 list-disc list-inside space-y-1 text-blue-100 text-sm">
        {data.plan?.map((p, i) => (<li key={i}>{p}</li>))}
      </ul>
      <div className="text-blue-300 text-sm mt-2">{data.message}</div>
    </div>
  )
}
