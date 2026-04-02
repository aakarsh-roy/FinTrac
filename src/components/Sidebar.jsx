import { Landmark, LayoutDashboard, PieChart, Wallet } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { formatCurrency } from '../utils/format'

const navItems = [
  { to: '/overview', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/transactions', label: 'Transactions', icon: Wallet },
  { to: '/analytics', label: 'Analytics', icon: PieChart },
  { to: '/settings', label: 'Settings', icon: Landmark },
]

export function Sidebar({ monthlyBudget, monthlyExpense }) {
  const usedPct = monthlyBudget ? Math.min((monthlyExpense / monthlyBudget) * 100, 100) : 0

  return (
    <aside className="hidden w-72 shrink-0 p-6 xl:block">
      <div className="mb-5 rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 shadow-lg shadow-purple-500/10 backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-muted)]">Finance OS</p>
        <h2 className="mt-1 font-heading text-2xl font-bold text-[var(--text-strong)]">FinTrac</h2>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `group flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition ${
                  isActive
                    ? 'border-fuchsia-400/30 bg-gradient-to-r from-fuchsia-500/20 to-violet-500/20 text-[var(--text-strong)] shadow-lg shadow-purple-500/20'
                    : 'border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--text)] hover:border-fuchsia-400/20 hover:text-[var(--text-strong)] hover:shadow-lg hover:shadow-purple-500/10'
                }`
              }
            >
              <Icon size={16} className="text-[var(--accent)]" />
              {item.label}
            </NavLink>
          )
        })}
      </nav>

      <div className="mt-8 rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 shadow-lg shadow-purple-500/10 backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">This month budget</p>
        <p className="mt-2 text-lg font-semibold text-[var(--text-strong)]">{formatCurrency(monthlyBudget)}</p>
        <p className="mt-1 text-sm text-[var(--text)]">Spent: {formatCurrency(monthlyExpense)}</p>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500"
            style={{ width: `${usedPct}%` }}
          />
        </div>
      </div>
    </aside>
  )
}
