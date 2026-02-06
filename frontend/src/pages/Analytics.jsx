import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import api from "../services/api"
import { useAuth } from "../context/AuthContext"
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, Cell
} from 'recharts'

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#3b82f6'];

function Analytics() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("connections")

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
            Analytics & Insights
          </h1>
          <p className="text-[var(--color-text-secondary)] mt-1">
            Data-driven connections and market trends.
          </p>
        </div>

        <div className="flex p-1 bg-[var(--color-bg-card)] rounded-xl border border-[var(--color-border-soft)] text-sm font-medium">
          <button
            onClick={() => setActiveTab("connections")}
            className={`px-4 py-2 rounded-lg transition-all ${activeTab === "connections" ? "bg-[var(--color-accent-indigo)] text-white shadow-md" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"}`}
          >
            My Connections
          </button>
          <button
            onClick={() => setActiveTab("placements")}
            className={`px-4 py-2 rounded-lg transition-all ${activeTab === "placements" ? "bg-[var(--color-accent-indigo)] text-white shadow-md" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"}`}
          >
            Placements & Trends
          </button>
          <button
            onClick={() => setActiveTab("heatmap")}
            className={`px-4 py-2 rounded-lg transition-all ${activeTab === "heatmap" ? "bg-[var(--color-accent-indigo)] text-white shadow-md" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"}`}
          >
            Job Heatmap
          </button>
        </div>
      </div>

      {activeTab === "connections" && <ConnectionsTab user={user} />}
      {activeTab === "placements" && <PlacementsTab />}
      {activeTab === "heatmap" && <HeatmapTab />}
    </div>
  )
}

function PlacementsTab() {
  // Mock Data
  const batchData = [
    { year: '2019', rate: 85, avgPackage: 12 },
    { year: '2020', rate: 82, avgPackage: 11.5 },
    { year: '2021', rate: 88, avgPackage: 14 },
    { year: '2022', rate: 92, avgPackage: 16.5 },
    { year: '2023', rate: 90, avgPackage: 15.8 },
    { year: '2024', rate: 95, avgPackage: 18 },
  ];

  const industryData = [
    { name: 'Tech', value: 45 },
    { name: 'Finance', value: 20 },
    { name: 'Consulting', value: 15 },
    { name: 'Product', value: 10 },
    { name: 'Core Eng', value: 10 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* BATCH TRENDS */}
        <Card>
          <CardHeader>
            <CardTitle>Batch Placement Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={batchData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} vertical={false} />
                  <XAxis dataKey="year" stroke="var(--color-text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: 'var(--color-bg-card)', borderColor: 'var(--color-border-soft)', borderRadius: '8px' }}
                    itemStyle={{ color: 'var(--color-text-primary)' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="rate" name="Placement Rate (%)" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="avgPackage" name="Avg Package (LPA)" stroke="#ec4899" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] mt-4 text-center">
              Consistently rising placement rates and packages over the last 5 years.
            </p>
          </CardContent>
        </Card>

        {/* INDUSTRY DISTRIBUTION */}
        <Card>
          <CardHeader>
            <CardTitle>Alumni Industry Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={industryData} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} horizontal={false} />
                  <XAxis type="number" stroke="var(--color-text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis dataKey="name" type="category" stroke="var(--color-text-primary)" fontSize={12} tickLine={false} axisLine={false} width={80} />
                  <RechartsTooltip
                    cursor={{ fill: 'var(--color-bg-hover)' }}
                    contentStyle={{ backgroundColor: 'var(--color-bg-card)', borderColor: 'var(--color-border-soft)', borderRadius: '8px' }}
                    itemStyle={{ color: 'var(--color-text-primary)' }}
                  />
                  <Bar dataKey="value" name="Percentage %" radius={[0, 4, 4, 0]} barSize={32}>
                    {industryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] mt-4 text-center">
              Tech and Finance continue to dominate alumni career paths.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ConnectionsTab({ user }) {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMatches()
  }, [])

  const fetchMatches = async () => {
    try {
      const res = await api.get("/matchmaking/recommendations/")
      setMatches(res.data)
    } catch (err) {
      console.error("Failed to fetch matches", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center py-10">finding your best matches...</div>

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {matches.map((match) => (
          <Card key={match.id} className="group hover:border-[var(--color-accent-indigo)] transition-all">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-[var(--color-accent-indigo)] to-[var(--color-accent-purple)] flex items-center justify-center text-2xl font-bold text-white mb-4 shadow-lg group-hover:scale-105 transition-transform">
                {match.name.charAt(0)}
              </div>

              <h3 className="text-xl font-bold text-[var(--color-text-primary)]">{match.name}</h3>
              <p className="text-sm font-medium text-[var(--color-accent-indigo)] uppercase tracking-wider mt-1">{match.role}</p>

              <div className="my-4 space-y-1">
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {match.company || "Company N/A"} • {match.department || "Dept N/A"}
                </p>
                <div className="flex flex-wrap gap-2 justify-center mt-3">
                  {match.skills.map(skill => (
                    <span key={skill} className="px-2 py-1 text-xs rounded-full bg-[var(--color-bg-main)] border border-[var(--color-border-soft)]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-4 w-full">
                <div className="mb-4 w-full bg-[var(--color-bg-main)] rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-[var(--color-accent-emerald)] h-2.5 rounded-full"
                    style={{ width: `${match.score}%` }}
                  ></div>
                </div>
                <p className="text-xs text-[var(--color-text-secondary)] mb-4">{match.score}% Skill Match</p>

                <Button className="w-full">Connect</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {matches.length === 0 && (
        <div className="text-center py-12 bg-[var(--color-bg-card)] rounded-2xl border border-[var(--color-border-soft)]">
          <p className="text-lg text-[var(--color-text-secondary)]">No matches found yet.</p>
          <p className="text-sm text-[var(--color-text-secondary)] mt-2">Try adding more skills to your profile to get better recommendations.</p>
        </div>
      )}
    </div>
  )
}

function HeatmapTab() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/analytics/active-jobs/")
      .then(res => setData(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="text-center py-10">Loading market insights...</div>

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Popular Roles Chart (Visualized as a list/bar for now) */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6">Most In-Demand Roles</h2>
          <div className="space-y-4">
            {data?.popular_roles.map((role, index) => (
              <div key={role.title} className="relative">
                <div className="flex justify-between items-center mb-1 z-10 relative">
                  <span className="font-medium text-[var(--color-text-primary)] flex items-center gap-2">
                    <span className="h-6 w-6 rounded-full bg-[var(--color-bg-main)] flex items-center justify-center text-xs font-bold border border-[var(--color-border-soft)]">
                      {index + 1}
                    </span>
                    {role.title}
                  </span>
                  <span className="text-sm font-bold text-[var(--color-accent-indigo)]">{role.count} Active Jobs</span>
                </div>
                <div className="w-full bg-[var(--color-bg-main)] rounded-full h-2">
                  <div
                    className="bg-[var(--color-accent-indigo)] h-2 rounded-full opacity-80"
                    style={{ width: `${(role.count / (data.popular_roles[0].count || 1)) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
            {data?.popular_roles.length === 0 && <p className="text-[var(--color-text-secondary)]">No active jobs data available.</p>}
          </div>
        </CardContent>
      </Card>

      {/* Placeholder for future Map or more stats */}
      <Card>
        <CardContent className="p-6 h-full flex flex-col justify-center items-center text-center">
          <div className="text-6xl mb-4">🌍</div>
          <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Global Opportunities</h2>
          <p className="text-[var(--color-text-secondary)] mt-2 max-w-xs">
            Our alumni network spans top companies globally. Map visualization coming soon.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-sm">
            <div className="p-4 bg-[var(--color-bg-main)] rounded-xl">
              <p className="text-2xl font-bold text-[var(--color-text-primary)]">{data?.total_active_jobs || 0}</p>
              <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wide">Active Jobs</p>
            </div>
            <div className="p-4 bg-[var(--color-bg-main)] rounded-xl">
              <p className="text-2xl font-bold text-[var(--color-text-primary)]">Remote</p>
              <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wide">Top Location</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Analytics
