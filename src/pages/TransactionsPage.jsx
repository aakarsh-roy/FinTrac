import { FiltersPanel } from '../components/FiltersPanel'
import { StatCard } from '../components/StatCard'
import { TransactionsTable } from '../components/TransactionsTable'

export function TransactionsPage({
  totals,
  filters,
  setFilters,
  resetFilters,
  pagedItems,
  safePage,
  totalPages,
  setPage,
  onSort,
  onCategoryClick,
  onTransactionClick,
}) {
  const totalVolume = totals.income + totals.expenses || 1

  return (
    <>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard label="Filtered Balance" value={totals.balance} type="currency" accent="neutral" progress={76} />
        <StatCard
          label="Filtered Income"
          value={totals.income}
          type="currency"
          accent="emerald"
          progress={(totals.income / totalVolume) * 100}
        />
        <StatCard
          label="Filtered Expenses"
          value={totals.expenses}
          type="currency"
          accent="red"
          progress={(totals.expenses / totalVolume) * 100}
        />
      </section>

      <FiltersPanel filters={filters} onChange={setFilters} onReset={resetFilters} />

      <TransactionsTable
        transactions={pagedItems}
        filters={filters}
        onSort={onSort}
        page={safePage}
        totalPages={totalPages}
        onPageChange={setPage}
        onCategoryClick={onCategoryClick}
        onTransactionClick={onTransactionClick}
      />
    </>
  )
}
