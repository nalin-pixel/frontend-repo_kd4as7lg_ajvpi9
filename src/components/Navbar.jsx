import { NavLink } from 'react-router-dom'

export default function Navbar() {
  const linkBase = 'px-4 py-3 text-sm font-medium transition-colors'
  return (
    <header style={{ backgroundColor: '#1a1a1a' }} className="sticky top-0 z-20 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4">
        <nav className="h-14 flex items-center gap-6 text-white">
          <NavLink
            to="/"
            className={({ isActive }) => `${linkBase} ${isActive ? 'text-[#0066cc] border-b-2 border-[#0066cc]' : 'text-white/90 hover:text-white'}`}
            end
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/expenses"
            className={({ isActive }) => `${linkBase} ${isActive ? 'text-[#0066cc] border-b-2 border-[#0066cc]' : 'text-white/90 hover:text-white'}`}
          >
            Expenses
          </NavLink>
          <NavLink
            to="/wishlist"
            className={({ isActive }) => `${linkBase} ${isActive ? 'text-[#0066cc] border-b-2 border-[#0066cc]' : 'text-white/90 hover:text-white'}`}
          >
            Wishlist
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
