export function SettingsPage() {
  return (
    <section className="space-y-4">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-purple-500/10 backdrop-blur-xl">
        <h2 className="text-xl font-semibold text-[var(--text-strong)]">Settings</h2>
        <p className="mt-2 text-sm text-[var(--text)]">
          Customize your dashboard preferences, notification behavior, and appearance. This is a UI-only settings screen.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">Appearance</h3>
          <p className="mt-2 text-sm text-[var(--text)]">Dark/light mode and dashboard density controls.</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">Notifications</h3>
          <p className="mt-2 text-sm text-[var(--text)]">Manage transaction and budget alert preferences.</p>
        </div>
      </div>
    </section>
  )
}
