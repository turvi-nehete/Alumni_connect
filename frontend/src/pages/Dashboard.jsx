import { useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import api from "../services/api"
import { useAuth } from "../context/AuthContext"
import { Button } from "../components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card"

function Dashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/analytics/dashboard/")
        setData(res.data)
      } catch (err) {
        console.error("Failed to fetch dashboard", err)
        setError("Failed to load dashboard data. Please try again.")
      } finally {
        setLoading(false)
      }
    }
    fetchDashboard()
  }, [])

  const [contextualMatches, setContextualMatches] = useState([])

  const handleConnect = async (userId) => {
    try {
      const res = await api.post("/messaging/create-chat/", { user_id: userId })
      navigate(`/messaging?chatId=${res.data.chat_id}`)
    } catch (err) {
      console.error("Failed to connect", err)
      // Optionally show toast
    }
  }

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await api.get("/matchmaking/alumni/")
        setContextualMatches(res.data)
      } catch (err) {
        console.error("Failed to fetch matches", err)
      }
    }
    if (user) fetchMatches()
  }, [user])

  if (loading) {
    return <div className="p-10 text-center text-[var(--color-text-secondary)]">Loading dashboard...</div>
  }

  if (error) {
    return <div className="p-10 text-center text-red-500">{error}</div>
  }

  if (!data) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl
      bg-gradient-to-br from-[var(--color-accent-indigo)]/20
      via-[var(--color-accent-purple)]/10
      to-transparent
      px-6 py-6 sm:px-10 sm:py-10 border border-[var(--color-accent-indigo)]/10 shadow-lg">

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text-primary)] relative z-10">
          Welcome back, {data.user?.first_name || "Alumni"}
        </h1>

        <p className="mt-2 text-sm sm:text-base font-medium text-[var(--color-text-secondary)] relative z-10 max-w-xl">
          Here’s what’s happening across your alumni network.
        </p>

        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full
        bg-[var(--color-accent-indigo)]/10 blur-3xl" />
        <div className="absolute right-20 bottom-0 h-40 w-40 rounded-full
        bg-[var(--color-accent-purple)]/10 blur-3xl" />
      </section>


      {/* ================= METRICS ================= */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {[
          {
            value: data.metrics.total_members,
            label: "Total Members",
            colorClass: "text-[var(--color-accent-indigo)]",
            route: "/members",
          },
          {
            value: data.metrics.upcoming_events,
            label: "Upcoming Events",
            colorClass: "text-[var(--color-accent-purple)]",
            route: "/events",
          },
          {
            value: data.metrics.open_jobs,
            label: "Open Jobs",
            colorClass: "text-emerald-500 dark:text-emerald-400",
            route: "/jobs",
          },
          {
            value: data.metrics.unread_messages,
            label: "Unread Messages",
            colorClass: "text-rose-500 dark:text-rose-400",
            route: "/messaging",
          },
        ].map((item, index) => (
          <Card
            key={index}
            onClick={() => navigate(item.route)}
            className="group cursor-pointer hover:border-[var(--color-accent-indigo)]/30"
          >
            <CardContent className="p-6 relative">
              {/* Accent Glow Bar */}
              <div className="absolute left-0 top-6 bottom-6 w-1 rounded-r-md
                bg-gradient-to-b from-[var(--color-accent-indigo)]
                to-[var(--color-accent-purple)]
                opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <p className={`text-3xl font-bold tracking-tight ${item.colorClass}`}>
                {item.value}
              </p>
              <p className="mt-1 text-sm font-medium text-[var(--color-text-secondary)] uppercase tracking-wide">
                {item.label}
              </p>
            </CardContent>
          </Card>
        ))}

      </div>

      {/* ================= ANALYTICS CARDS ROW ================= */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            value: data.analytics.profile_views,
            label: "Profile Views",
            trend: "+5%",
            colorClass: "text-[var(--color-accent-indigo)]",
          },
          {
            value: data.analytics.new_connections,
            label: "New Connections",
            trend: "+12%",
            colorClass: "text-[var(--color-accent-purple)]",
          },
          {
            value: data.analytics.event_participation,
            label: "Event Participation",
            trend: "Active",
            colorClass: "text-emerald-500 dark:text-emerald-400",
          },
          {
            value: `₹${(data.analytics.donation_impact || 0).toLocaleString('en-IN')}`,
            label: "Donation Impact",
            trend: "Thanks!",
            colorClass: "text-rose-500 dark:text-rose-400",
          },
        ].map((item, index) => (
          <Card key={index} className="hover:bg-[var(--color-bg-hover)]/50">
            <CardContent className="p-5 flex items-start justify-between">
              <div>
                <div className={`text-2xl font-bold ${item.colorClass}`}>{item.value}</div>
                <div className="text-xs font-medium text-[var(--color-text-secondary)] mt-1">{item.label}</div>
              </div>
              <div className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">{item.trend}</div>
            </CardContent>
          </Card>
        ))}
      </div>


      {/* ================= MAIN GRID ================= */}
      <div className="grid gap-8 lg:grid-cols-3">

        {/* LEFT SIDE */}
        <div className="space-y-6 lg:col-span-2">

          {/* MINI CHART CONTAINER */}
          <Card>
            <CardHeader>
              <CardTitle>Network Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
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
                    <div className="h-2 overflow-hidden rounded-full bg-[var(--color-bg-main)]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r
                        from-[var(--color-accent-indigo)]
                        to-[var(--color-accent-purple)]"
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* EVENTS */}
            <Card
              onClick={() => navigate("/events")}
              className="cursor-pointer group hover:border-[var(--color-accent-indigo)] transition-all"
            >
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {data.metrics.upcoming_events > 0 ? (
                    <li className="text-sm text-[var(--color-text-secondary)]">
                      {data.metrics.upcoming_events} events scheduled soon.
                    </li>
                  ) : (
                    <li className="text-sm text-[var(--color-text-secondary)]">No upcoming events.</li>
                  )}
                </ul>
                <div className="mt-4 pt-4 border-t border-[var(--color-border-soft)]">
                  <span className="text-sm font-semibold text-[var(--color-accent-purple)] group-hover:text-[var(--color-accent-indigo)] flex items-center gap-1">
                    View All Events <span>→</span>
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* JOBS */}
            <Card
              onClick={() => navigate("/jobs")}
              className="cursor-pointer group hover:border-emerald-500/50 transition-all"
            >
              <CardHeader>
                <CardTitle className="text-lg">Recent Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {data.metrics.open_jobs > 0 ? (
                    <li className="text-sm text-[var(--color-text-secondary)]">
                      {data.metrics.open_jobs} active job openings.
                    </li>
                  ) : (
                    <li className="text-sm text-[var(--color-text-secondary)]">No active jobs.</li>
                  )}
                </ul>
                <div className="mt-4 pt-4 border-t border-[var(--color-border-soft)]">
                  <span className="text-sm font-semibold text-emerald-500 group-hover:text-emerald-600 flex items-center gap-1">
                    View All Jobs <span>→</span>
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>


        {/* RIGHT SIDE */}
        <div className="space-y-6">

          {/* ALUMNI SPOTLIGHT WIDGET */}
          <section className="rounded-2xl bg-gradient-to-br from-[var(--color-accent-indigo)] to-[var(--color-accent-purple)] p-1 shadow-lg text-white animate-in zoom-in duration-500">
            <div className="bg-[var(--color-bg-card)]/10 backdrop-blur-sm rounded-xl p-6 text-center space-y-4">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white/20 uppercase tracking-wider mb-2">
                Alumni Spotlight
              </div>
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav&backgroundColor=c0aede"
                alt="Aarav"
                className="mx-auto h-20 w-20 rounded-full border-2 border-white/50 shadow-md"
              />
              <div>
                <h3 className="text-lg font-bold text-white">Aarav Patel</h3>
                <p className="text-sm text-white/80 italic">"The network gave me wings."</p>
              </div>
              <Button
                variant="ghost"
                className="w-full bg-white text-[var(--color-accent-indigo)] hover:bg-white/90 hover:text-[var(--color-accent-purple)] transition-colors font-bold"
                onClick={() => navigate('/alumni-spotlight')}
              >
                Read Story
              </Button>
            </div>
          </section>

          {/* PEOPLE YOU SHOULD KNOW (Contextual) */}
          <Card className="border-[var(--color-accent-indigo)]/20 shadow-lg shadow-indigo-500/5">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                People You Should Know
                <span className="text-[10px] bg-[var(--color-accent-indigo)] text-white px-2 py-0.5 rounded-full">New</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contextualMatches.length === 0 ? (
                  <p className="text-sm text-[var(--color-text-secondary)]">No recommendations yet.</p>
                ) : (
                  contextualMatches.map((person, index) => (
                    <div key={index} className="space-y-2 pb-3 border-b border-[var(--color-border-soft)] last:border-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <img src={person.avatar} alt={person.name} className="h-10 w-10 rounded-full" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-[var(--color-text-primary)] truncate">{person.name}</p>
                          <p className="text-xs text-[var(--color-text-secondary)] truncate">{person.role}</p>
                          <p className="text-[10px] text-[var(--color-accent-purple)] mt-0.5 font-medium">
                            {person.reasons.join(" · ")}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="w-full h-8 text-xs"
                        variant="secondary"
                        onClick={() => handleConnect(person.id)}
                      >
                        Connect
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* SOCIAL ACTIVITY FEED */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Real-time Feed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.feed.length === 0 ? (
                  <p className="text-sm text-[var(--color-text-secondary)]">No recent activity.</p>
                ) : (
                  data.feed.map((activity, index) => (
                    <div key={index} className="flex gap-3 text-sm">
                      <span className="text-lg">{activity.icon}</span>
                      <div>
                        <p className="text-[var(--color-text-primary)] leading-tight">
                          {activity.text}
                        </p>
                        <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                          {new Date(activity.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* PEOPLE YOU MAY KNOW */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">People You May Know</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.suggestions.map((person, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[var(--color-text-primary)] truncate">{person.name}</p>
                      <p className="text-xs text-[var(--color-text-secondary)] truncate capitalize">{person.role}</p>
                    </div>
                    {/* Placeholder action - ideally links to profile */}
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs px-2"
                      onClick={() => navigate("/members")}
                    >
                      Connect
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>

      </div>

    </div>
  )
}

export default Dashboard
