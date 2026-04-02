import { CheckCircle2, CircleDashed, Clock3 } from 'lucide-react'
import { ProfileCard } from './ProfileCard'
import { formatCurrency } from '../utils/format'

export function RightSidebar({ role, totals, monthlyBudget, monthlyExpense, transactions }) {
  const recent = transactions.slice(0, 4)
  const budgetProgress = monthlyBudget ? (monthlyExpense / monthlyBudget) * 100 : 0

  return (
    <aside className="hidden w-80 shrink-0 space-y-4 xl:block">
      <ProfileCard role={role} />

      <section className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 shadow-lg shadow-purple-500/10 backdrop-blur-xl">
        <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">Quick Stats</h3>
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--text)]">Balance</span>
            <span className="font-semibold text-[var(--text-strong)]">{formatCurrency(totals.balance)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--text)]">Income</span>
            <span className="font-semibold text-[var(--positive)]">{formatCurrency(totals.income)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--text)]">Expenses</span>
            <span className="font-semibold text-[var(--negative)]">{formatCurrency(totals.expenses)}</span>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 shadow-lg shadow-purple-500/10 backdrop-blur-xl">
        <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">Recent Activity</h3>
        <div className="mt-4 space-y-3">
          {recent.map((tx) => (
            <div key={tx.id} className="flex items-start gap-2">
              <Clock3 size={14} className="mt-0.5 text-[var(--accent)]" />
              <div>
                <p className="text-sm text-[var(--text-strong)]">{tx.category}</p>
                <p className="text-xs text-[var(--text-muted)]">{tx.notes}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 shadow-lg shadow-purple-500/10 backdrop-blur-xl">
        <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">Goals</h3>
        <div className="mt-4 space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-[var(--text)]"><CheckCircle2 size={14} className="text-[var(--positive)]" /> Save 25% income</span>
            <span className="text-[var(--positive)]">Done</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-[var(--text)]"><CircleDashed size={14} className="text-amber-300" /> Budget target</span>
            <span className="text-[var(--text-strong)]">{Math.min(budgetProgress, 100).toFixed(0)}%</span>
          </div>
        </div>
      </section>
    </aside>
  )
}
