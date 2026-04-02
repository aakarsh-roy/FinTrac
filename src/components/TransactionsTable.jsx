import { ArrowDown, ArrowUp } from 'lucide-react'
import { formatCurrency, formatDate } from '../utils/format'

const headers = [
  { key: 'date', label: 'Date' },
  { key: 'category', label: 'Category' },
  { key: 'type', label: 'Type' },
  { key: 'amount', label: 'Amount' },
  { key: 'notes', label: 'Notes' },
]

export function TransactionsTable({
  transactions,
  onSort,
  filters,
  page,
  totalPages,
  onPageChange,
  onCategoryClick,
  onTransactionClick,
}) {
  if (!transactions.length) {
    return (
      <div className="rounded-3xl border border-dashed border-[var(--card-border)] bg-[var(--card-bg)] p-10 text-center">
        <h3 className="text-lg font-semibold text-[var(--text-strong)]">No transactions found</h3>
        <p className="mt-2 text-sm text-[var(--text)]">Try changing filters or add a new transaction.</p>
      </div>
    )
  }

  return (
    <section className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-lg shadow-purple-500/10 backdrop-blur-xl">
      <div className="max-h-[460px] overflow-auto">
        <table className="min-w-full border-separate border-spacing-y-2 px-2 text-left text-sm">
          <thead className="sticky top-0 z-10 bg-[var(--table-head-bg)] backdrop-blur">
            <tr>
              {headers.map((header) => (
                <th key={header.key} className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                  <button
                    type="button"
                    onClick={() => onSort(header.key)}
                    className="inline-flex items-center gap-1"
                    title={`Sort by ${header.label}`}
                  >
                    {header.label}
                    {filters.sortBy === header.key ? (
                      filters.sortOrder === 'asc' ? (
                        <ArrowUp size={13} />
                      ) : (
                        <ArrowDown size={13} />
                      )
                    ) : null}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr
                key={tx.id}
                className="cursor-pointer rounded-2xl border border-[var(--card-border)] bg-[var(--row-bg)] text-[var(--text)] transition hover:-translate-y-0.5 hover:bg-[var(--row-bg-hover)]"
                onClick={() => onTransactionClick?.(tx.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    onTransactionClick?.(tx.id)
                  }
                }}
                tabIndex={0}
              >
                <td className="rounded-l-2xl px-4 py-3 text-[var(--text-strong)]">{formatDate(tx.date)}</td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation()
                      onCategoryClick(tx.category)
                    }}
                    className="rounded-lg bg-[var(--chip-bg)] px-2 py-1 text-left text-xs transition hover:bg-[var(--chip-bg-hover)]"
                  >
                    {tx.category}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-lg px-2 py-1 text-xs ${
                      tx.type === 'income'
                        ? 'bg-[var(--positive-soft)] text-[var(--positive)]'
                        : 'bg-[var(--negative-soft)] text-[var(--negative)]'
                    }`}
                  >
                    {tx.type}
                  </span>
                </td>
                <td className={`px-4 py-3 font-medium ${tx.type === 'income' ? 'text-[var(--positive)]' : 'text-[var(--negative)]'}`}>
                  {tx.type === 'income' ? '+' : '-'}
                  {formatCurrency(tx.amount)}
                </td>
                <td className="rounded-r-2xl px-4 py-3">{tx.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-[var(--card-border)] p-4">
        <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
          Page {page} of {totalPages}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            className="rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-3 py-2 text-sm disabled:opacity-50"
          >
            Previous
          </button>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            className="rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-3 py-2 text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  )
}
