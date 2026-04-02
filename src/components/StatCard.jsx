import { motion } from 'framer-motion'
import { useAnimatedNumber } from '../hooks/useAnimatedNumber'
import { formatCurrency, percent } from '../utils/format'

export function StatCard({
  label,
  value,
  type = 'currency',
  accent = 'emerald',
  tooltip,
  large = false,
  progress = 0,
}) {
  const animatedValue = useAnimatedNumber(value)

  const valueClass =
    accent === 'red'
      ? 'text-[var(--negative)]'
      : accent === 'neutral'
        ? 'text-[var(--text-strong)]'
        : 'text-[var(--accent)]'

  const gradientClass =
    accent === 'red'
      ? 'from-rose-500/30 to-fuchsia-500/10'
      : accent === 'neutral'
        ? 'from-violet-500/35 to-indigo-500/10'
        : 'from-fuchsia-500/35 to-violet-500/10'

  const displayValue =
    type === 'currency' ? formatCurrency(animatedValue) : percent(animatedValue)

  const progressPct = Math.min(Math.max(progress, 0), 100)

  return (
    <motion.article
      className={`group relative overflow-hidden rounded-3xl border border-[var(--card-border)] bg-gradient-to-br ${gradientClass} p-5 shadow-lg shadow-purple-500/10 backdrop-blur-xl`}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      title={tooltip}
    >
      <div className="absolute right-3 top-3 h-20 w-20 rounded-full bg-white/5 blur-xl" />

      <div className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">{label}</p>
          <p className={`mt-3 font-semibold ${valueClass} ${large ? 'text-4xl' : 'text-3xl'}`}>
            <motion.span>{displayValue}</motion.span>
          </p>
          <p className="mt-2 text-xs text-[var(--text)]">
            {type === 'currency' ? formatCurrency(value) : percent(value)}
          </p>
        </div>

        <div
          className="grid h-14 w-14 place-items-center rounded-full border border-white/15"
          style={{
            background: `conic-gradient(rgba(232,121,249,0.95) ${progressPct * 3.6}deg, rgba(255,255,255,0.1) 0deg)`,
          }}
        >
          <div className="grid h-10 w-10 place-items-center rounded-full bg-[var(--ring-center-bg)] text-[10px] font-semibold text-[var(--text-strong)]">
            {Math.round(progressPct)}%
          </div>
        </div>
      </div>
    </motion.article>
  )
}
