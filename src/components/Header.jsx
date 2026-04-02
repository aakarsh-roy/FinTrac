import { Bell, Moon, Plus, Search, Sun, UserCircle2 } from 'lucide-react'

export function Header({
  search,
  onSearchChange,
  onOpenAddTransaction,
  onToggleTheme,
  theme,
  role,
  onRoleChange,
}) {
  const isAdmin = role === 'admin'

  return (
    <header className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 shadow-lg shadow-purple-500/10 backdrop-blur-xl">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="relative w-full xl:max-w-md">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search transactions, categories, notes..."
            className="w-full rounded-2xl border border-[var(--input-border)] bg-[var(--input-bg)] py-2.5 pl-9 pr-3 text-sm text-[var(--text-strong)] outline-none ring-purple-400/60 transition focus:ring"
          />
        </div>

        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--text)] transition hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
            aria-label="Notifications"
          >
            <Bell size={16} />
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--text)] transition hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <select
            value={role}
            onChange={(event) => onRoleChange(event.target.value)}
            className="h-10 rounded-2xl border border-[var(--input-border)] bg-[var(--input-bg)] px-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-strong)]"
            aria-label="Select role"
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="button"
            onClick={onOpenAddTransaction}
            disabled={!isAdmin}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-violet-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/30 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus size={16} />
            Add
          </button>

          <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-fuchsia-300/20 bg-gradient-to-br from-fuchsia-500/30 to-violet-500/30 text-fuchsia-100">
            <UserCircle2 size={18} />
          </div>
        </div>
      </div>
    </header>
  )
}
