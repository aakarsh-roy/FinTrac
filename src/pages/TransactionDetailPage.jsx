import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, Pencil, Save } from 'lucide-react'
import { categories } from '../data/mockTransactions'
import { formatCurrency, formatDate } from '../utils/format'

export function TransactionDetailPage({ transaction, onBack, role, onSave }) {
  const [isEditing, setIsEditing] = useState(false)
  const [form, setForm] = useState(null)

  const canManageTransactions = role === 'admin'

  useEffect(() => {
    if (!transaction) return

    setForm({
      date: transaction.date,
      category: transaction.category,
      type: transaction.type,
      amount: String(transaction.amount),
      notes: transaction.notes,
    })
    setIsEditing(false)
  }, [transaction])

  const filteredCategories = useMemo(
    () =>
      categories.filter((cat) =>
        form?.type === 'income'
          ? ['Salary', 'Freelance', 'Investments'].includes(cat)
          : !['Salary', 'Freelance', 'Investments'].includes(cat),
      ),
    [form?.type],
  )

  if (!transaction) {
    return (
      <section className="rounded-3xl border border-dashed border-white/20 bg-[var(--surface)] p-8 text-center">
        <h2 className="text-xl font-semibold text-[var(--text-strong)]">Transaction not found</h2>
        <p className="mt-2 text-sm text-[var(--text)]">This transaction may have been removed or filtered out.</p>
        <button
          type="button"
          className="mt-4 rounded-xl border border-white/10 px-4 py-2 text-sm"
          onClick={onBack}
        >
          Back to Transactions
        </button>
      </section>
    )
  }

  if (!form) return null

  const handleSave = () => {
    if (!canManageTransactions) return

    onSave(transaction.id, {
      ...form,
      amount: Number(form.amount),
      notes: form.notes.trim(),
    })
    setIsEditing(false)
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-[var(--surface)] p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-[var(--text)]"
        >
          <ArrowLeft size={16} />
          Back to transactions
        </button>

        {canManageTransactions ? (
          <button
            type="button"
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-3 py-2 text-sm font-medium text-white"
          >
            {isEditing ? <Save size={16} /> : <Pencil size={16} />}
            {isEditing ? 'Save changes' : 'Edit transaction'}
          </button>
        ) : (
          <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
            Viewer mode: Read only
          </span>
        )}
      </div>

      <h2 className="text-2xl font-semibold text-[var(--text-strong)]">Transaction Details</h2>
      <p className="mt-1 text-sm text-[var(--text)]">Detailed view for {transaction.id}</p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">Date</p>
          {isEditing ? (
            <input
              type="date"
              value={form.date}
              onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))}
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-[var(--text-strong)]"
            />
          ) : (
            <p className="mt-2 text-base text-[var(--text-strong)]">{formatDate(transaction.date)}</p>
          )}
        </article>
        <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">Category</p>
          {isEditing ? (
            <select
              value={form.category}
              onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-[var(--text-strong)]"
            >
              {filteredCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          ) : (
            <p className="mt-2 text-base text-[var(--text-strong)]">{transaction.category}</p>
          )}
        </article>
        <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">Type</p>
          {isEditing ? (
            <select
              value={form.type}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  type: event.target.value,
                  category: event.target.value === 'income' ? 'Salary' : 'Groceries',
                }))
              }
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-[var(--text-strong)]"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          ) : (
            <p className="mt-2 text-base capitalize text-[var(--text-strong)]">{transaction.type}</p>
          )}
        </article>
        <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">Amount</p>
          {isEditing ? (
            <input
              type="number"
              min="1"
              value={form.amount}
              onChange={(event) => setForm((prev) => ({ ...prev, amount: event.target.value }))}
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-[var(--text-strong)]"
            />
          ) : (
            <p className={`mt-2 text-base font-semibold ${transaction.type === 'income' ? 'text-emerald-300' : 'text-red-300'}`}>
              {transaction.type === 'income' ? '+' : '-'}
              {formatCurrency(transaction.amount)}
            </p>
          )}
        </article>
      </div>

      <article className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">Notes</p>
        {isEditing ? (
          <textarea
            rows={4}
            value={form.notes}
            onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-[var(--text)]"
          />
        ) : (
          <p className="mt-2 text-sm text-[var(--text)]">{transaction.notes}</p>
        )}
      </article>
    </section>
  )
}
