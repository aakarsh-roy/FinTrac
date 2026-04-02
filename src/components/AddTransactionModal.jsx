import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { categories } from '../data/mockTransactions'
import { Modal } from './Modal'

const defaultState = {
  date: new Date().toISOString().slice(0, 10),
  category: 'Salary',
  type: 'income',
  amount: '',
  notes: '',
}

export function AddTransactionModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState(defaultState)

  const filteredCategories = useMemo(
    () =>
      categories.filter((cat) =>
        form.type === 'income'
          ? ['Salary', 'Freelance', 'Investments'].includes(cat)
          : !['Salary', 'Freelance', 'Investments'].includes(cat),
      ),
    [form.type],
  )

  const updateField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.amount || Number(form.amount) <= 0 || !form.notes.trim()) {
      toast.error('Please enter valid amount and notes.')
      return
    }

    onSubmit(form)
    toast.success('Transaction added successfully.')
    setForm(defaultState)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Add Transaction">
      <form className="grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        <label className="space-y-2 text-sm text-[var(--text)]">
          Date
          <input
            type="date"
            value={form.date}
            onChange={(event) => updateField('date', event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[var(--text-strong)]"
            required
          />
        </label>

        <label className="space-y-2 text-sm text-[var(--text)]">
          Type
          <select
            value={form.type}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                type: event.target.value,
                category: event.target.value === 'income' ? 'Salary' : 'Groceries',
              }))
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[var(--text-strong)]"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>

        <label className="space-y-2 text-sm text-[var(--text)]">
          Category
          <select
            value={form.category}
            onChange={(event) => updateField('category', event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[var(--text-strong)]"
          >
            {filteredCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2 text-sm text-[var(--text)]">
          Amount
          <input
            type="number"
            min="1"
            value={form.amount}
            onChange={(event) => updateField('amount', event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[var(--text-strong)]"
            placeholder="0"
            required
          />
        </label>

        <label className="space-y-2 text-sm text-[var(--text)] md:col-span-2">
          Notes
          <textarea
            rows={4}
            value={form.notes}
            onChange={(event) => updateField('notes', event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[var(--text-strong)]"
            placeholder="What is this transaction for?"
            required
          />
        </label>

        <div className="md:col-span-2 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 px-4 py-2 text-sm text-[var(--text)]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white"
          >
            Save transaction
          </button>
        </div>
      </form>
    </Modal>
  )
}
