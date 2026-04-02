import { Crown, Sparkles } from 'lucide-react'

export function ProfileCard({ role = 'viewer' }) {
  const isAdmin = role === 'admin'

  return (
    <section className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 shadow-lg shadow-purple-500/10 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-500 text-white">
          <Sparkles size={18} />
        </div>
        <div>
          <p className="text-sm font-semibold text-[var(--text-strong)]">Aakarsh Roy</p>
          <p className="text-xs text-[var(--text-muted)]">aakarshroy03@gmail.com</p>
        </div>
      </div>

      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/25 bg-fuchsia-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-fuchsia-600 dark:text-fuchsia-200">
        <Crown size={12} />
        {isAdmin ? 'Admin Access' : 'Viewer Access'}
      </div>
    </section>
  )
}
