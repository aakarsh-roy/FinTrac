import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { NavLink, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { AddTransactionModal } from './components/AddTransactionModal'
import { CategoryDrilldownModal } from './components/CategoryDrilldownModal'
import { Header } from './components/Header'
import { LoadingSkeleton } from './components/LoadingSkeleton'
import { RightSidebar } from './components/RightSidebar'
import { Sidebar } from './components/Sidebar'
import { AnalyticsPage } from './pages/AnalyticsPage'
import { BudgetPage } from './pages/BudgetPage'
import { OverviewPage } from './pages/OverviewPage'
import { SettingsPage } from './pages/SettingsPage'
import { TransactionDetailPage } from './pages/TransactionDetailPage'
import { TransactionsPage } from './pages/TransactionsPage'
import { useFinanceStore } from './store/useFinanceStore'
import {
  buildBalanceSeries,
  buildCategoryBreakdown,
  buildIncomeExpenseSeries,
  calculateTotals,
  deriveInsights,
  filterTransactions,
  monthlyExpense,
  paginate,
  sortTransactions,
} from './utils/finance'

function App() {
  const navigate = useNavigate()
  const {
    loading,
    error,
    initialize,
    role,
    setRole,
    theme,
    toggleTheme,
    transactions,
    filters,
    setFilters,
    resetFilters,
    setPage,
    monthlyBudget,
    setBudget,
    addTransaction,
    updateTransaction,
    selectedCategory,
    openCategory,
    closeCategory,
  } = useFinanceStore()

  const [addModalOpen, setAddModalOpen] = useState(false)
  const canManageTransactions = role === 'admin'

  useEffect(() => {
    initialize()
  }, [initialize])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const filteredTransactions = useMemo(
    () => filterTransactions(transactions, filters),
    [transactions, filters],
  )

  const sortedTransactions = useMemo(
    () => sortTransactions(filteredTransactions, filters.sortBy, filters.sortOrder),
    [filteredTransactions, filters.sortBy, filters.sortOrder],
  )

  const { pagedItems, totalPages, safePage } = useMemo(
    () => paginate(sortedTransactions, filters.page, filters.pageSize),
    [sortedTransactions, filters.page, filters.pageSize],
  )

  useEffect(() => {
    if (safePage !== filters.page) {
      setPage(safePage)
    }
  }, [filters.page, safePage, setPage])

  const totals = useMemo(() => calculateTotals(filteredTransactions), [filteredTransactions])
  const balanceSeries = useMemo(() => buildBalanceSeries(sortedTransactions), [sortedTransactions])
  const incomeExpenseSeries = useMemo(
    () =>
      buildIncomeExpenseSeries(sortedTransactions).map((item) => ({
        ...item,
        month: item.month.slice(2),
      })),
    [sortedTransactions],
  )
  const categoryBreakdown = useMemo(
    () => buildCategoryBreakdown(filteredTransactions),
    [filteredTransactions],
  )
  const insights = useMemo(() => deriveInsights(transactions), [transactions])

  const latestMonth = useMemo(() => {
    if (!transactions.length) return ''
    const latestDate = [...transactions]
      .map((tx) => tx.date)
      .sort((a, b) => new Date(b) - new Date(a))[0]
    return latestDate.slice(0, 7)
  }, [transactions])

  const thisMonthExpense = useMemo(
    () => (latestMonth ? monthlyExpense(transactions, latestMonth) : 0),
    [transactions, latestMonth],
  )

  useEffect(() => {
    if (!loading && thisMonthExpense > monthlyBudget) {
      toast.error('Budget threshold exceeded for this month.')
    }
  }, [loading, thisMonthExpense, monthlyBudget])

  const categoryTransactions = useMemo(
    () => transactions.filter((tx) => tx.category === selectedCategory),
    [transactions, selectedCategory],
  )

  const handleSort = (column) => {
    if (filters.sortBy === column) {
      setFilters({ sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' })
      return
    }

    setFilters({ sortBy: column, sortOrder: 'desc' })
  }

  const openTransactionDetail = (transactionId) => {
    navigate(`/transactions/${transactionId}`)
  }

  const TransactionDetailRoute = () => {
    const { transactionId } = useParams()
    const tx = transactions.find((item) => item.id === transactionId)

    return (
      <TransactionDetailPage
        transaction={tx}
        role={role}
        onSave={(id, payload) => {
          updateTransaction(id, payload)
          toast.success('Transaction updated successfully.')
        }}
        onBack={() => navigate('/transactions')}
      />
    )
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] px-3 py-4 text-[var(--text)] xl:px-6">
      <main className="mx-auto grid w-full max-w-[1700px] grid-cols-1 gap-4 xl:grid-cols-[17rem_minmax(0,1fr)_20rem]">
        <Sidebar monthlyBudget={monthlyBudget} monthlyExpense={thisMonthExpense} />

        <div className="space-y-4">
          <Header
            search={filters.search}
            onSearchChange={(value) => setFilters({ search: value })}
            theme={theme}
            onToggleTheme={toggleTheme}
            role={role}
            onRoleChange={setRole}
            onOpenAddTransaction={() => {
              if (!canManageTransactions) {
                toast.error('Viewer role cannot add transactions.')
                return
              }
              setAddModalOpen(true)
            }}
          />

          <section className="flex gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-white/5 p-2 shadow-lg shadow-purple-500/10 backdrop-blur-xl xl:hidden">
            {[
              { to: '/overview', label: 'Overview' },
              { to: '/analytics', label: 'Analytics' },
              { to: '/budget', label: 'Budget' },
              { to: '/transactions', label: 'Transactions' },
              { to: '/settings', label: 'Settings' },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-xl px-3 py-2 text-sm transition ${
                    isActive
                      ? 'bg-gradient-to-r from-fuchsia-500/25 to-violet-500/25 text-[var(--text-strong)]'
                      : 'text-[var(--text)] hover:bg-white/10'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </section>

          {loading ? <LoadingSkeleton /> : null}

          {!loading && error ? (
            <div className="rounded-3xl border border-red-400/30 bg-red-500/10 p-6 text-red-200">{error}</div>
          ) : null}

          {!loading && !error ? (
            <Routes>
              <Route
                path="/overview"
                element={
                  <OverviewPage
                    totals={totals}
                    balanceSeries={balanceSeries}
                    categoryBreakdown={categoryBreakdown}
                    monthlyBudget={monthlyBudget}
                    monthlyExpense={thisMonthExpense}
                    setBudget={setBudget}
                    canEditBudget={canManageTransactions}
                    insights={insights}
                    onCategoryClick={openCategory}
                  />
                }
              />
              <Route
                path="/transactions"
                element={
                  <TransactionsPage
                    totals={totals}
                    filters={filters}
                    setFilters={setFilters}
                    resetFilters={resetFilters}
                    pagedItems={pagedItems}
                    safePage={safePage}
                    totalPages={totalPages}
                    setPage={setPage}
                    onSort={handleSort}
                    onCategoryClick={openCategory}
                    onTransactionClick={openTransactionDetail}
                  />
                }
              />
              <Route path="/transactions/:transactionId" element={<TransactionDetailRoute />} />
              <Route
                path="/analytics"
                element={
                  <AnalyticsPage
                    balanceSeries={balanceSeries}
                    categoryBreakdown={categoryBreakdown}
                    incomeExpenseSeries={incomeExpenseSeries}
                    insights={insights}
                    onCategoryClick={openCategory}
                  />
                }
              />
              <Route
                path="/budget"
                element={
                  <BudgetPage
                    monthlyBudget={monthlyBudget}
                    monthlyExpense={thisMonthExpense}
                    setBudget={setBudget}
                    canEditBudget={canManageTransactions}
                    categoryBreakdown={categoryBreakdown}
                  />
                }
              />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/overview" replace />} />
            </Routes>
          ) : null}
        </div>

        <RightSidebar
          role={role}
          totals={totals}
          monthlyBudget={monthlyBudget}
          monthlyExpense={thisMonthExpense}
          transactions={sortedTransactions}
        />
      </main>

      <AddTransactionModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={(payload) => {
          if (!canManageTransactions) {
            toast.error('Viewer role cannot add transactions.')
            return
          }
          addTransaction(payload)
        }}
      />

      <CategoryDrilldownModal
        open={Boolean(selectedCategory)}
        onClose={closeCategory}
        category={selectedCategory}
        transactions={categoryTransactions}
      />
    </div>
  )
}

export default App
