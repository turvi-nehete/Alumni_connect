import { useState, useEffect } from "react"

const MOCK_RECENT_DONORS = [
  { name: "Riya Shah", amount: "₹5,000", time: "2 hours ago" },
  { name: "Harsh Doshi", amount: "₹10,000", time: "5 hours ago" },
  { name: "Kabir Patel", amount: "₹2,500", time: "1 day ago" },
  { name: "Neha Jain", amount: "₹7,500", time: "2 days ago" },
  { name: "Aarav Mehta", amount: "₹15,000", time: "3 days ago" },
]

function Donations() {
  const [animatedProgress, setAnimatedProgress] = useState(0)

  const totalRaised = 2450000
  const goal = 5000000
  const progressPercent = (totalRaised / goal) * 100

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progressPercent)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-8">

      {/* TOTAL DONATIONS COUNTER */}
      <section className="relative overflow-hidden rounded-3xl
      bg-gradient-to-br from-[var(--color-accent-indigo)]/20
      via-[var(--color-accent-purple)]/10
      to-transparent
      px-10 py-8 shadow-[0_0_60px_rgba(99,102,241,0.15)]">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--color-text-primary)]">
          ₹ {totalRaised.toLocaleString('en-IN')} Raised
        </h1>
        <p className="mt-2 text-base font-medium text-[var(--color-text-secondary)]">
          Help us reach our goal of ₹ {goal.toLocaleString('en-IN')}
        </p>
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full
        bg-[var(--color-accent-indigo)]/20 blur-3xl" />
      </section>

      {/* PROGRESS BAR */}
      <section className="rounded-3xl border border-[var(--color-border-soft)]
      bg-[var(--color-bg-card)] p-8 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold tracking-wide text-[var(--color-text-primary)]">
            Campaign Progress
          </h2>
          <span className="text-sm font-semibold text-[var(--color-accent-purple)]">
            {Math.round(progressPercent)}%
          </span>
        </div>
        <div className="h-6 overflow-hidden rounded-full bg-[var(--color-bg-main)]">
          <div
            className="h-full rounded-full bg-gradient-to-r
            from-[var(--color-accent-indigo)]
            via-[var(--color-accent-purple)]
            to-[var(--color-accent-indigo)]
            transition-all duration-1000 ease-out"
            style={{ width: `${animatedProgress}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-xs text-[var(--color-text-secondary)]">
          <span>Goal: ₹ {goal.toLocaleString('en-IN')}</span>
          <span>Raised: ₹ {totalRaised.toLocaleString('en-IN')}</span>
        </div>
      </section>

      {/* IMPACT STATS GRID */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            value: "24",
            label: "Scholarships Funded",
            icon: "🎓",
            color: "text-[var(--color-accent-indigo)]",
          },
          {
            value: "8",
            label: "Labs Built",
            icon: "🔬",
            color: "text-[var(--color-accent-purple)]",
          },
          {
            value: "45",
            label: "Events Sponsored",
            icon: "🎉",
            color: "text-emerald-400",
          },
          {
            value: "1,200+",
            label: "Students Supported",
            icon: "👥",
            color: "text-rose-400",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="group relative rounded-3xl border border-[var(--color-border-soft)]
            bg-[var(--color-bg-card)] p-6 shadow-md transition-all duration-300
            hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(124,58,237,0.25)]"
          >
            <div className="text-3xl mb-3">{stat.icon}</div>
            <p className={`text-3xl font-extrabold tracking-tight ${stat.color}`}>
              {stat.value}
            </p>
            <p className="mt-2 text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide">
              {stat.label}
            </p>
            {/* Accent Glow Bar */}
            <div className="absolute left-0 top-0 h-full w-1 rounded-l-3xl
            bg-gradient-to-b from-[var(--color-accent-indigo)]
            to-[var(--color-accent-purple)]
            opacity-0 transition group-hover:opacity-100" />
          </div>
        ))}
      </section>

      {/* MAIN CONTENT GRID */}
      <div className="grid gap-8 lg:grid-cols-3">

        {/* RECENT DONORS FEED */}
        <div className="lg:col-span-2 space-y-6">
          <section className="rounded-3xl border border-[var(--color-border-soft)]
          bg-[var(--color-bg-card)] p-8 shadow-md">
            <h2 className="text-lg font-bold tracking-wide text-[var(--color-text-primary)]">
              Recent Donors
            </h2>
            <div className="mt-6 space-y-4">
              {MOCK_RECENT_DONORS.map((donor, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-xl border border-[var(--color-border-soft)]
                  bg-[var(--color-bg-main)] p-4 transition-all duration-300
                  hover:border-[var(--color-accent-purple)]/50 hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-[var(--color-accent-indigo)] to-[var(--color-accent-purple)] flex items-center justify-center text-sm font-bold text-white">
                      {donor.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[var(--color-text-primary)]">
                        {donor.name}
                      </p>
                      <p className="text-xs text-[var(--color-text-secondary)]">
                        {donor.time}
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-[var(--color-accent-purple)]">
                    {donor.amount}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* DONATE NOW CTA */}
        <div className="space-y-6">
          <section className="rounded-3xl border border-[var(--color-accent-purple)]
          bg-gradient-to-br from-[var(--color-accent-indigo)]/10
          via-[var(--color-accent-purple)]/10
          to-transparent
          p-8 shadow-[0_0_40px_rgba(124,58,237,0.2)]">
            <h2 className="text-xl font-bold tracking-wide text-[var(--color-text-primary)]">
              Make a Difference
            </h2>
            <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
              Your contribution helps support scholarships, infrastructure, and student programs.
            </p>
            <button className="mt-6 w-full rounded-full bg-gradient-to-r
            from-[var(--color-accent-indigo)]
            to-[var(--color-accent-purple)]
            px-6 py-3 text-base font-semibold text-white
            shadow-[0_0_25px_rgba(99,102,241,0.5)]
            transition-all duration-300
            hover:scale-105 hover:shadow-[0_0_35px_rgba(124,58,237,0.8)]">
              Donate Now
            </button>
            <div className="mt-4 space-y-2 text-xs text-[var(--color-text-secondary)]">
              <p>• 100% tax deductible</p>
              <p>• Secure payment processing</p>
              <p>• Instant receipt</p>
            </div>
          </section>
        </div>

      </div>

    </div>
  )
}

export default Donations
