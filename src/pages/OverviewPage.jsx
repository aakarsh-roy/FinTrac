import { BudgetTracker } from '../components/BudgetTracker'
import { ChartsGrid } from '../components/ChartsGrid'
import { InsightsPanel } from '../components/InsightsPanel'
import { StatCard } from '../components/StatCard'

export function OverviewPage({
  totals,
  balanceSeries,
  categoryBreakdown,
  monthlyBudget,
  monthlyExpense,
  setBudget,
  canEditBudget,
  insights,
  onCategoryClick,
}) {
  const incomeShare = totals.balance ? (totals.income / (totals.income + totals.expenses || 1)) * 100 : 0
  const expenseShare = totals.balance ? (totals.expenses / (totals.income + totals.expenses || 1)) * 100 : 0

  return (
    <>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard
          label="Total Balance"
          value={totals.balance}
          type="currency"
          accent="neutral"
          large
          progress={82}
          tooltip="Total balance from filtered transactions"
        />
        <StatCard
          label="Income"
          value={totals.income}
          type="currency"
          accent="emerald"
          progress={incomeShare}
          tooltip="Total money inflow"
        />
        <StatCard
          label="Expenses"
          value={totals.expenses}
          type="currency"
          accent="red"
          progress={expenseShare}
          tooltip="Total money outflow"
        />
      </section>

      <ChartsGrid
        balanceSeries={balanceSeries}
        categoryBreakdown={categoryBreakdown}
        onCategoryClick={onCategoryClick}
      />

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <BudgetTracker
            monthlyBudget={monthlyBudget}
            monthlyExpense={monthlyExpense}
            setBudget={setBudget}
            canEditBudget={canEditBudget}
          />
        </div>
        <InsightsPanel insights={insights} />
      </section>
    </>
  )
}
