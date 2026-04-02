import { formatCurrency, formatDate } from '../utils/format'
import { Modal } from './Modal'

export function CategoryDrilldownModal({ open, onClose, category, transactions }) {
  return (
    <Modal open={open} onClose={onClose} title={`${category ?? ''} Breakdown`}>
      {!transactions.length ? (
        <p className="text-sm text-[var(--text)]">No transactions in this category.</p>
      ) : (
        <div className="max-h-[360px] space-y-2 overflow-auto pr-2">
          {transactions.map((tx) => (
            <article key={tx.id} className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-[var(--text-strong)]">{formatDate(tx.date)}</p>
                  <p className="text-sm text-[var(--text)]">{tx.notes}</p>
                </div>
                <p className={`font-semibold ${tx.type === 'income' ? 'text-emerald-300' : 'text-red-300'}`}>
                  {tx.type === 'income' ? '+' : '-'}
                  {formatCurrency(tx.amount)}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </Modal>
  )
}
