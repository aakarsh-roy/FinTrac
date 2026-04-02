import { categories } from '../data/mockTransactions'

export function FiltersPanel({ filters, onChange, onReset }) {
  return (
    <section className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 shadow-lg shadow-purple-500/10 backdrop-blur-xl">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-6">
        <label className="space-y-2 text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
          Search
          <input
            value={filters.search}
            onChange={(e) => onChange({ search: e.target.value })}
            placeholder="Category or note"
            className="w-full rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-3 py-2 text-sm text-[var(--text-strong)] outline-none ring-fuchsia-400/60 transition focus:ring"
          />
        </label>

        <label className="space-y-2 text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
          Category
          <select
            value={filters.category}
            onChange={(e) => onChange({ category: e.target.value })}
            className="w-full rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-3 py-2 text-sm text-[var(--text-strong)] outline-none ring-fuchsia-400/60 transition focus:ring"
          >
            <option value="all">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2 text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
          Type
          <select
            value={filters.type}
            onChange={(e) => onChange({ type: e.target.value })}
            className="w-full rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-3 py-2 text-sm text-[var(--text-strong)] outline-none ring-fuchsia-400/60 transition focus:ring"
          >
            <option value="all">All types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>

        <label className="space-y-2 text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
          From
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => onChange({ startDate: e.target.value })}
            className="w-full rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-3 py-2 text-sm text-[var(--text-strong)] outline-none ring-fuchsia-400/60 transition focus:ring"
          />
        </label>

        <label className="space-y-2 text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
          To
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => onChange({ endDate: e.target.value })}
            className="w-full rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-3 py-2 text-sm text-[var(--text-strong)] outline-none ring-fuchsia-400/60 transition focus:ring"
          />
        </label>

        <button
          className="mt-auto h-[42px] rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-3 py-2 text-sm text-[var(--text-strong)] transition hover:bg-[var(--chip-bg-hover)]"
          type="button"
          onClick={onReset}
        >
          Reset filters
        </button>
      </div>
    </section>
  )
}
