import { motion } from 'framer-motion'

export function ChartCard({ title, subtitle, children }) {
  return (
    <motion.section
      className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 shadow-lg shadow-purple-500/10 backdrop-blur-xl"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <header className="mb-4">
        <h3 className="text-lg font-semibold text-[var(--text-strong)]">{title}</h3>
        {subtitle ? <p className="text-sm text-[var(--text)]">{subtitle}</p> : null}
      </header>
      <div className="h-72">{children}</div>
    </motion.section>
  )
}
