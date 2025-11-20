import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Dashboard from './components/Dashboard'
import Expenses from './components/Expenses'
import Wishlist from './components/Wishlist'
import AISuggestions from './components/AISuggestions'
import Settings from './components/Settings'
import { Routes, Route } from 'react-router-dom'

export default function Test() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <Routes>
          <Route path="/" element={<>
            <Hero />
            <Dashboard />
          </>} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/ai" element={<AISuggestions />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  )
}
