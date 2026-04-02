import { Moon, Plus, Sun, UserCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Navbar({ onOpenAddTransaction, theme, onToggleTheme, role, onRoleChange }) {
  const canManageTransactions = role === 'admin'

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[var(--bg)]/90 px-4 py-4 backdrop-blur xl:px-8">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4">
        <Link to="/overview" className="block">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-muted)]">Fintech Suite</p>
          <h1 className="font-heading text-2xl font-semibold text-[var(--text-strong)]">FinTrac</h1>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-[var(--text)] transition hover:-translate-y-0.5 hover:bg-white/10"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
          <button
            type="button"
            onClick={onOpenAddTransaction}
            disabled={!canManageTransactions}
            title={canManageTransactions ? 'Add a new transaction' : 'Viewer role cannot add transactions'}
            className="inline-flex items-center gap-2 rounded-2xl bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus size={16} />
            Add transaction
          </button>

          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
            <UserCircle2 size={22} className="text-[var(--text-strong)]" />
            <div>
              <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">Profile</p>
              <select
                value={role}
                onChange={(event) => onRoleChange(event.target.value)}
                className="rounded bg-transparent text-xs font-medium capitalize text-[var(--text-strong)] outline-none"
                aria-label="Select role"
              >
                <option value="viewer">Viewer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
