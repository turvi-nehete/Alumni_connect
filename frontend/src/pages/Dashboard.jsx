import { useNavigate } from "react-router-dom"

function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="space-y-12">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden rounded-3xl
      bg-gradient-to-br from-[var(--color-accent-indigo)]/20
      via-[var(--color-accent-purple)]/10
      to-transparent
      px-10 py-8 shadow-[0_0_60px_rgba(99,102,241,0.15)]">

        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
          Welcome back,
        </h1>

        <p className="mt-2 text-base font-medium text-[var(--color-text-secondary)]">
          Here’s what’s happening across your alumni network.
        </p>

        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full
        bg-[var(--color-accent-indigo)]/20 blur-3xl" />
      </section>


      {/* ================= METRICS ================= */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

        {[
          {
            value: "1,248",
            label: "Total Members",
            color: "text-[var(--color-accent-indigo)]",
            route: "/members",
          },
          {
            value: "6",
            label: "Upcoming Events",
            color: "text-[var(--color-accent-purple)]",
            route: "/events",
          },
          {
            value: "12",
            label: "Open Jobs",
            color: "text-emerald-400",
            route: "/jobs",
          },
          {
            value: "3",
            label: "Unread Messages",
            color: "text-rose-400",
            route: "/messaging",
          },
        ].map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.route)}
            className="group relative cursor-pointer rounded-3xl
            border border-[var(--color-border-soft)]
            bg-[var(--color-bg-card)]
            p-7 shadow-md
            transition-all duration-300
            hover:-translate-y-2
            hover:shadow-[0_0_40px_rgba(124,58,237,0.25)]">

            {/* Accent Glow Bar */}
            <div className="absolute left-0 top-0 h-full w-1 rounded-l-3xl
            bg-gradient-to-b from-[var(--color-accent-indigo)]
            to-[var(--color-accent-purple)]
            opacity-0 transition group-hover:opacity-100" />

            <p className={`text-4xl font-extrabold tracking-tight ${item.color}`}>
              {item.value}
            </p>

            <p className="mt-2 text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide">
              {item.label}
            </p>
          </div>
        ))}

      </div>


      {/* ================= ANALYTICS CARDS ROW ================= */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

        {[
          {
            value: "2,847",
            label: "Profile Views",
            trend: "+5%",
            color: "text-[var(--color-accent-indigo)]",
          },
          {
            value: "23",
            label: "New Connections This Week",
            trend: "+12%",
            color: "text-[var(--color-accent-purple)]",
          },
          {
            value: "68%",
            label: "Event Participation Rate",
            trend: "+3%",
            color: "text-emerald-400",
          },
          {
            value: "₹45K",
            label: "Donation Impact Score",
            trend: "+8%",
            color: "text-rose-400",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="group relative rounded-3xl
            border border-[var(--color-border-soft)]
            bg-[var(--color-bg-card)]
            p-6 shadow-md
            transition-all duration-300
            hover:-translate-y-1
            hover:shadow-[0_0_30px_rgba(124,58,237,0.2)]">

            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className={`text-3xl font-extrabold tracking-tight ${item.color}`}>
                  {item.value}
                </p>
                <p className="mt-2 text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide">
                  {item.label}
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-emerald-400">
                <span>▲</span>
                <span>{item.trend}</span>
              </div>
            </div>

            {/* Gradient accent bar */}
            <div className="absolute bottom-0 left-0 h-1 w-full rounded-b-3xl
            bg-gradient-to-r from-[var(--color-accent-indigo)]
            via-[var(--color-accent-purple)]
            to-[var(--color-accent-indigo)]
            opacity-60" />

          </div>
        ))}

      </div>


      {/* ================= MAIN GRID ================= */}
      <div className="grid gap-8 lg:grid-cols-3">

        {/* LEFT SIDE */}
        <div className="space-y-8 lg:col-span-2">

          {/* MINI CHART CONTAINER */}
          <section className="rounded-3xl border border-[var(--color-border-soft)]
          bg-[var(--color-bg-card)] p-8 shadow-md transition-all duration-300
          hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]">

            <h2 className="text-lg font-bold tracking-wide text-[var(--color-text-primary)]">
              Network Activity
            </h2>

            <div className="mt-6 space-y-4">
              {[
                { label: "Connections", value: 85 },
                { label: "Messages", value: 72 },
                { label: "Event RSVPs", value: 58 },
                { label: "Job Applications", value: 42 },
                { label: "Profile Updates", value: 35 },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-[var(--color-text-secondary)]">
                      {item.label}
                    </span>
                    <span className="font-semibold text-[var(--color-text-primary)]">
                      {item.value}%
                    </span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-[var(--color-bg-main)]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r
                      from-[var(--color-accent-indigo)]
                      to-[var(--color-accent-purple)]
                      transition-all duration-500"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

          </section>

          {/* EVENTS */}
          <section
            onClick={() => navigate("/events")}
            className="group relative cursor-pointer rounded-3xl
            border border-[var(--color-border-soft)]
            bg-[var(--color-bg-card)]
            p-8 shadow-md transition-all duration-300
            hover:-translate-y-2
            hover:shadow-[0_0_40px_rgba(124,58,237,0.2)]">

            <h2 className="text-lg font-bold tracking-wide text-[var(--color-text-primary)]">
              Upcoming Events
            </h2>

            <ul className="mt-6 space-y-4 text-[15px] font-medium text-[var(--color-text-secondary)]">
              <li className="flex justify-between">
                <span>Tech Meetup 2025</span>
                <span className="text-[var(--color-accent-indigo)]">12 Oct</span>
              </li>
              <li className="flex justify-between">
                <span>Alumni Networking Night</span>
                <span className="text-[var(--color-accent-indigo)]">18 Oct</span>
              </li>
              <li className="flex justify-between">
                <span>Startup Pitch Day</span>
                <span className="text-[var(--color-accent-indigo)]">25 Oct</span>
              </li>
            </ul>

            <div className="mt-6 text-sm font-bold text-[var(--color-accent-purple)]
            group-hover:underline">
              View All →
            </div>
          </section>


          {/* JOBS */}
          <section
            onClick={() => navigate("/jobs")}
            className="group relative cursor-pointer rounded-3xl
            border border-[var(--color-border-soft)]
            bg-[var(--color-bg-card)]
            p-8 shadow-md transition-all duration-300
            hover:-translate-y-2
            hover:shadow-[0_0_40px_rgba(16,185,129,0.2)]">

            <h2 className="text-lg font-bold tracking-wide text-[var(--color-text-primary)]">
              Recent Jobs
            </h2>

            <ul className="mt-6 space-y-4 text-[15px] font-medium text-[var(--color-text-secondary)]">
              <li>Frontend Developer — Mumbai</li>
              <li>Product Manager — Bangalore</li>
              <li>Data Analyst — Remote</li>
            </ul>

            <div className="mt-6 text-sm font-bold text-emerald-400 group-hover:underline">
              View All →
            </div>
          </section>

        </div>


        {/* RIGHT SIDE */}
        <div className="space-y-8">

          {/* SOCIAL ACTIVITY FEED */}
          <div className="rounded-3xl border border-[var(--color-border-soft)]
          bg-[var(--color-bg-card)] p-8 shadow-md">

            <h2 className="text-lg font-bold tracking-wide text-[var(--color-text-primary)]">
              Recent Network Activity
            </h2>

            <div className="mt-6 space-y-5">

              {[
                { name: "Riya", action: "connected with", target: "Kabir", icon: "🔗" },
                { name: "Harsh", action: "RSVP'd to", target: "Tech Meetup", icon: "📅" },
                { name: "Neha", action: "donated", target: "₹5000", icon: "💜" },
                { name: "Aarav", action: "posted a job referral", target: "", icon: "💼" },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3 border-b border-[var(--color-border-soft)] pb-4 last:border-0">
                  <div className="text-xl">{activity.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">
                      <span className="font-bold text-[var(--color-accent-purple)]">{activity.name}</span>
                      {" "}{activity.action}{" "}
                      {activity.target && (
                        <span className="font-semibold text-[var(--color-accent-indigo)]">
                          {activity.target}
                        </span>
                      )}
                    </p>
                    <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                      {index === 0 ? "2 hours ago" : index === 1 ? "5 hours ago" : index === 2 ? "1 day ago" : "2 days ago"}
                    </p>
                  </div>
                </div>
              ))}

            </div>

          </div>

          {/* PEOPLE YOU MAY KNOW */}
          <div className="rounded-3xl border border-[var(--color-border-soft)]
          bg-[var(--color-bg-card)] p-8 shadow-md">

            <h2 className="text-lg font-bold tracking-wide text-[var(--color-text-primary)]">
              People You May Know
            </h2>

            <div className="mt-8 space-y-6">

              {[
                { name: "Riya Shah", role: "Alumni — 2015" },
                { name: "Kabir Patel", role: "Student — 2025" },
                { name: "Neha Jain", role: "Alumni — 2012" },
              ].map((person, index) => (
                <div key={index}
                className="flex items-center justify-between">

                  <div>
                    <p className="text-sm font-bold text-[var(--color-text-primary)]">
                      {person.name}
                    </p>
                    <p className="text-xs font-medium text-[var(--color-text-secondary)]">
                      {person.role}
                    </p>
                  </div>

                  <button className="rounded-full bg-gradient-to-r
                  from-[var(--color-accent-indigo)]
                  to-[var(--color-accent-purple)]
                  px-5 py-2 text-xs font-semibold text-white
                  shadow-[0_0_20px_rgba(99,102,241,0.5)]
                  transition-all duration-300
                  hover:scale-105 hover:shadow-[0_0_35px_rgba(124,58,237,0.7)]">
                    Connect
                  </button>

                </div>
              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Dashboard
