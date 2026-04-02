import { AlertTriangle, CheckCircle2 } from 'lucide-react'
import { formatCurrency } from '../utils/format'

export function BudgetTracker({ monthlyBudget, setBudget, monthlyExpense, canEditBudget = true }) {
  const progress = monthlyBudget ? (monthlyExpense / monthlyBudget) * 100 : 0
  const exceeded = progress > 100

  return (
    <section className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 shadow-lg shadow-purple-500/10 backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-[var(--text-strong)]">Budget Tracker</h3>
          <p className="text-sm text-[var(--text)]">Set your monthly expense target and monitor spend in real time.</p>
          {!canEditBudget ? (
            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
              Viewer mode: Budget is read-only
            </p>
          ) : null}
        </div>
        <div className="w-40">
          <label className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]" htmlFor="budget-input">
            Budget
          </label>
          <input
            id="budget-input"
            type="number"
            min="0"
            value={monthlyBudget}
            onChange={(event) => setBudget(event.target.value)}
            disabled={!canEditBudget}
            className="mt-1 w-full rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-3 py-2 text-sm text-[var(--text-strong)] disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-[var(--text)]">Spent {formatCurrency(monthlyExpense)}</span>
          <span className="text-[var(--text-strong)]">{Math.max(progress, 0).toFixed(1)}%</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-white/10">
          <div
            className={`h-full rounded-full ${exceeded ? 'bg-gradient-to-r from-red-400 to-orange-300' : 'bg-gradient-to-r from-emerald-400 to-lime-300'}`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>

      <div className="mt-4 inline-flex items-center gap-2 text-sm">
        {exceeded ? <AlertTriangle size={16} className="text-[var(--negative)]" /> : <CheckCircle2 size={16} className="text-[var(--positive)]" />}
        <span className={exceeded ? 'text-[var(--negative)]' : 'text-[var(--positive)]'}>
          {exceeded
            ? `You exceeded budget by ${formatCurrency(monthlyExpense - monthlyBudget)} this month.`
            : `You are within budget by ${formatCurrency(monthlyBudget - monthlyExpense)}.`}
        </span>
      </div>
    </section>
  )
}
