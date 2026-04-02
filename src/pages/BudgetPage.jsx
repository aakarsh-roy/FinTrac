import { BudgetTracker } from '../components/BudgetTracker'
import { formatCurrency } from '../utils/format'

export function BudgetPage({ monthlyBudget, monthlyExpense, setBudget, categoryBreakdown, canEditBudget }) {
  return (
    <div className="space-y-4">
      <BudgetTracker
        monthlyBudget={monthlyBudget}
        monthlyExpense={monthlyExpense}
        setBudget={setBudget}
        canEditBudget={canEditBudget}
      />

      <section className="rounded-3xl border border-white/10 bg-[var(--surface)] p-5">
        <h3 className="text-lg font-semibold text-[var(--text-strong)]">Category Budget Pressure</h3>
        <p className="text-sm text-[var(--text)]">Top expense categories for current filtered data.</p>

        <div className="mt-4 space-y-3">
          {categoryBreakdown.slice(0, 8).map((item) => {
            const ratio = monthlyBudget ? (item.value / monthlyBudget) * 100 : 0
            return (
              <div key={item.name}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-[var(--text)]">{item.name}</span>
                  <span className="text-[var(--text-strong)]">
                    {formatCurrency(item.value)} ({ratio.toFixed(1)}%)
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400"
                    style={{ width: `${Math.min(ratio, 100)}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
