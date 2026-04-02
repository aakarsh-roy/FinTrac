import { percent } from '../utils/format'

export function InsightsPanel({ insights }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-[var(--surface)] p-5">
      <h3 className="text-lg font-semibold text-[var(--text-strong)]">Smart Insights</h3>
      <div className="mt-4 space-y-3">
        <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">Highest spending category</p>
          <p className="mt-1 text-base text-[var(--text-strong)]">{insights.topSpendingCategory}</p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">Monthly expense delta</p>
          <p className="mt-1 text-base text-[var(--text-strong)]">{percent(insights.monthOverMonthExpensesChange)}</p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">Savings trend</p>
          <p className="mt-1 text-sm text-[var(--text)]">{insights.savingsTrend}</p>
        </article>
      </div>
    </section>
  )
}
