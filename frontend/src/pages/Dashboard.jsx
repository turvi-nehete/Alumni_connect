function Dashboard() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] px-6 py-5 shadow-sm">
        <h1 className="text-xl font-semibold text-[var(--color-text-primary)]">
          Welcome back to Alumni Connect
        </h1>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          This dashboard will surface your most relevant alumni activity,
          opportunities, and updates.
        </p>
      </section>

      <div className="grid gap-5 md:grid-cols-3">
        <section className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">
            Upcoming Events
          </h2>
          <p className="mt-2 text-xs text-[var(--color-text-secondary)]">
            Event timeline and RSVP actions will appear here.
          </p>
        </section>

        <section className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">
            Recent Jobs
          </h2>
          <p className="mt-2 text-xs text-[var(--color-text-secondary)]">
            Curated job postings and referrals will be summarized here.
          </p>
        </section>

        <section className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">
            Notifications Summary
          </h2>
          <p className="mt-2 text-xs text-[var(--color-text-secondary)]">
            Your unread messages, event updates, and system alerts will be
            summarized here.
          </p>
        </section>
      </div>
    </div>
  )
}

export default Dashboard

