import { Link, NavLink } from 'react-router-dom'
import { Menu, CreditCard, ListOrdered, Settings, Brain, Home } from 'lucide-react'

export default function Navbar() {
  const navItem = (to, label, Icon) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
          isActive ? 'bg-white/10 text-white' : 'text-blue-200 hover:text-white hover:bg-white/5'
        }`
      }
    >
      <Icon className="w-4 h-4" />
      <span className="text-sm font-medium">{label}</span>
    </NavLink>
  )

  return (
    <div className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/80 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-white font-semibold">
            <CreditCard className="w-5 h-5 text-blue-400" />
            Budget Buddy
          </Link>
          <nav className="hidden md:flex items-center gap-2">
            {navItem('/', 'Dashboard', Home)}
            {navItem('/expenses', 'Expenses', ListOrdered)}
            {navItem('/wishlist', 'Wishlist', CreditCard)}
            {navItem('/ai', 'AI Suggestions', Brain)}
            {navItem('/settings', 'Settings', Settings)}
          </nav>
        </div>
      </div>
    </div>
  )
}
