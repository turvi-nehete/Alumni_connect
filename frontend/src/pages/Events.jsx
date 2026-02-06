import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"
import { useAuth } from "../context/AuthContext.jsx"
import { Button } from "../components/ui/Button.jsx"
import { Card, CardContent } from "../components/ui/Card.jsx"
import { Input } from "../components/ui/Input.jsx"

import { useNotification } from "../context/NotificationContext.jsx" // Add this

// Simple Modal Component (Inline for now, can be extracted)
function CreateEventModal({ isOpen, onClose, onCreated }) {
  const { addNotification } = useNotification() // Add this
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    audience: "all",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      await api.post("/events/create/", formData)
      addNotification("success", "Event created successfully!") // Add notification
      onCreated()
      onClose()
      setFormData({ title: "", description: "", date: "", location: "", audience: "all" })
    } catch (err) {
      console.error(err)
      setError("Failed to create event.")
      addNotification("error", "Failed to create event.") // Add error notification
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-[var(--color-bg-card)] p-6 shadow-2xl ring-1 ring-[var(--color-border-soft)]">
        <h2 className="mb-4 text-xl font-bold text-[var(--color-text-primary)]">Create New Event</h2>
        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)]">Title</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)]">Description</label>
            <textarea
              className="w-full rounded-md border border-[var(--color-border-soft)] bg-[var(--color-bg-main)] px-3 py-2 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-indigo)]"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)]">Date</label>
              <Input
                type="datetime-local"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)]">Audience</label>
              <select
                className="w-full rounded-md border border-[var(--color-border-soft)] bg-[var(--color-bg-main)] px-3 py-2 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-indigo)] h-10"
                value={formData.audience}
                onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
              >
                <option value="all">Everyone</option>
                <option value="student">Students Only</option>
                <option value="alumni">Alumni Only</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)]">Location</label>
            <Input
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? "Creating..." : "Create Event"}</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  // Fetch events
  const fetchEvents = async () => {
    try {
      const response = await api.get("/events/")
      setEvents(response.data)
    } catch (err) {
      console.error("Failed to fetch events", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
          Upcoming Events
        </h1>
        {user?.role === 'admin' && (
          <Button onClick={() => setIsModalOpen(true)} className="shadow-lg shadow-indigo-500/20">
            + Create Event
          </Button>
        )}
      </div>

      <CreateEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={fetchEvents}
      />

      {loading ? (
        <div className="py-20 text-center text-[var(--color-text-secondary)]">Loading events...</div>
      ) : events.length === 0 ? (
        <div className="py-20 text-center text-[var(--color-text-secondary)]">
          No upcoming events found.
        </div>
      ) : (
        <div className="space-y-6">
          {events.map((event) => {
            const audienceLabel = {
              'student': 'Students Only',
              'alumni': 'Alumni Only',
              'all': 'Open to All'
            }[event.audience] || 'Open to All'

            return (
              <Card
                key={event.id}
                className="transition-all duration-300 hover:shadow-lg hover:border-[var(--color-accent-indigo)]/50 cursor-pointer group"
                onClick={() => navigate(`/events/${event.id}`)}
              >
                <CardContent className="p-6 sm:p-8">
                  {/* HEADER */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className={`inline-block mb-3 px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wide border ${event.audience === 'all' ? 'border-indigo-500/20 text-indigo-500 bg-indigo-500/5' :
                        event.audience === 'student' ? 'border-emerald-500/20 text-emerald-500 bg-emerald-500/5' :
                          'border-purple-500/20 text-purple-500 bg-purple-500/5'
                        }`}>
                        {audienceLabel}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-indigo)] transition-colors">
                        {event.title}
                      </h2>
                    </div>
                    <div className="text-[var(--color-accent-indigo)] opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                      →
                    </div>
                  </div>

                  {/* META */}
                  <div className="mt-4 flex flex-wrap gap-4 sm:gap-6 text-sm font-medium text-[var(--color-text-secondary)]">
                    <span className="flex items-center gap-1.5">
                      <span className="text-lg">📅</span> {new Date(event.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-lg">📍</span> {event.location}
                    </span>
                  </div>

                  {/* DESCRIPTION */}
                  <p className="mt-5 text-[var(--color-text-secondary)] leading-relaxed line-clamp-2">
                    {event.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Events
