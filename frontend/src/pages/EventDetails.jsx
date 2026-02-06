import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../services/api"
import { useAuth } from "../context/AuthContext.jsx"
import { Button } from "../components/ui/Button.jsx"
import { Card, CardContent } from "../components/ui/Card.jsx"

import { useNotification } from "../context/NotificationContext.jsx" // Add import

function EventDetails() {
    const { eventId } = useParams()
    const navigate = useNavigate()
    const { user } = useAuth()
    const { addNotification } = useNotification() // Destructure

    const [event, setEvent] = useState(null)
    const [attendees, setAttendees] = useState([])
    const [loading, setLoading] = useState(true)
    const [registering, setRegistering] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        fetchEventData()
    }, [eventId])

    const fetchEventData = async () => {
        try {
            setLoading(true)
            const [eventRes, rsvpRes] = await Promise.all([
                api.get(`/events/${eventId}/`),
                api.get(`/events/${eventId}/rsvps/`)
            ])
            setEvent(eventRes.data)
            setAttendees(rsvpRes.data)
        } catch (err) {
            console.error("Failed to fetch event data", err)
            setError("Failed to load event details")
        } finally {
            setLoading(false)
        }
    }


    const handleRegister = async () => {
        try {
            setRegistering(true)
            await api.post("/events/rsvp/", { event: eventId, status: 'going' })
            // Refresh data to show new RSVP
            await fetchEventData()
            addNotification("success", "Successfully registered for event!") // Notification
        } catch (err) {
            console.error(err)
            const status = err.response?.status
            if (status === 400) {
                addNotification("info", "You are already registered.")
            } else {
                addNotification("error", "Failed to register.")
            }
        } finally {
            setRegistering(false)
        }
    }

    const isRegistered = attendees.some(rsvp => rsvp.user_email === user?.email)

    const canRegister = (eventAudience) => {
        if (!user) return false;
        if (user.role === 'admin') return true;
        if (eventAudience === 'all') return true;
        return eventAudience === user.role;
    }

    if (loading) {
        return <div className="py-20 text-center text-[var(--color-text-secondary)]">Loading...</div>
    }

    if (!event) {
        return <div className="py-20 text-center text-red-500">Event not found.</div>
    }

    // Ensure user is loaded before checking logic if possible, or handle null user gracefully
    const isAllowed = canRegister(event.audience)

    const audienceLabel = {
        'student': 'Students Only',
        'alumni': 'Alumni Only',
        'all': 'Open to All'
    }[event.audience] || 'Open to All'

    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">

            {/* Back Button */}
            <button
                onClick={() => navigate('/events')}
                className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] mb-4"
            >
                ← Back to Events
            </button>

            {/* Main Content */}
            <div className="grid gap-8 md:grid-cols-3">

                {/* Left Column: Event Info */}
                <div className="md:col-span-2 space-y-6">
                    <Card className="overflow-hidden border-[var(--color-border-soft)]">
                        <CardContent className="p-8">
                            <span className={`inline-block mb-4 px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wide border ${event.audience === 'all' ? 'border-indigo-500/20 text-indigo-500 bg-indigo-500/5' :
                                event.audience === 'student' ? 'border-emerald-500/20 text-emerald-500 bg-emerald-500/5' :
                                    'border-purple-500/20 text-purple-500 bg-purple-500/5'
                                }`}>
                                {audienceLabel}
                            </span>

                            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-6">
                                {event.title}
                            </h1>

                            <div className="flex flex-col gap-3 text-base text-[var(--color-text-secondary)] mb-8">
                                <span className="flex items-center gap-3">
                                    <span className="text-xl">📅</span>
                                    <span className="font-medium text-[var(--color-text-primary)]">
                                        {new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                    </span>
                                    <span>at {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </span>
                                <span className="flex items-center gap-3">
                                    <span className="text-xl">📍</span>
                                    <span className="font-medium text-[var(--color-text-primary)]">{event.location}</span>
                                </span>
                            </div>

                            <div className="prose prose-invert max-w-none text-[var(--color-text-secondary)] leading-relaxed">
                                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">About this event</h3>
                                <p className="whitespace-pre-line">{event.description}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Key Details & RSVP */}
                <div className="space-y-6">

                    {/* Action Card */}
                    <Card className="border-[var(--color-border-soft)]">
                        <CardContent className="p-6 space-y-4">
                            <div className="text-center">
                                <p className="text-sm text-[var(--color-text-secondary)] mb-1">Are you going?</p>
                                <div className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
                                    {attendees.length} people going
                                </div>
                            </div>

                            <Button
                                onClick={handleRegister}
                                disabled={!isAllowed || registering || isRegistered}
                                variant={isRegistered ? "outline" : "primary"}
                                className={`w-full py-6 text-lg ${isRegistered
                                    ? "border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/10 cursor-default"
                                    : !isAllowed ? "opacity-50 cursor-not-allowed" : "shadow-lg shadow-indigo-500/20"}`}
                            >
                                {isRegistered ? "You are going! ✓" :
                                    !isAllowed ? "Not Available for Role" :
                                        registering ? "Registering..." : "Register Now"}
                            </Button>

                            {!isAllowed && (
                                <p className="text-xs text-center text-red-400 mt-2">
                                    This event is restricted to {event.audience === 'student' ? 'Students' : 'Alumni'}.
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Attendees List */}
                    <Card className="border-[var(--color-border-soft)]">
                        <CardContent className="p-6">
                            <h3 className="font-semibold text-[var(--color-text-primary)] mb-4 flex items-center justify-between">
                                Attendees
                                <span className="text-xs font-normal text-[var(--color-text-secondary)] bg-[var(--color-bg-main)] px-2 py-1 rounded-full">{attendees.length}</span>
                            </h3>

                            {attendees.length === 0 ? (
                                <p className="text-sm text-[var(--color-text-secondary)] italic">Be the first to register!</p>
                            ) : (
                                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                    {attendees.map((rsvp) => {
                                        const initial = rsvp.first_name ? rsvp.first_name[0] : (rsvp.user_email ? rsvp.user_email[0].toUpperCase() : '?')
                                        const name = (rsvp.first_name && rsvp.last_name) ? `${rsvp.first_name} ${rsvp.last_name}` : (rsvp.user_email || 'Unknown User')

                                        return (
                                            <div key={rsvp.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--color-bg-main)] transition-colors">
                                                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-[var(--color-accent-indigo)] to-[var(--color-accent-purple)] flex items-center justify-center text-xs font-bold text-white shadow-sm">
                                                    {initial}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">
                                                        {name}
                                                    </p>
                                                    <p className="text-xs text-[var(--color-text-secondary)] capitalize">
                                                        {rsvp.role || 'Member'}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    )
}

export default EventDetails
