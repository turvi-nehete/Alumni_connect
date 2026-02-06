import { useState } from "react"

const MOCK_EVENTS = [
  {
    id: 1,
    title: "Tech Meetup 2025",
    date: "12 October 2025",
    location: "Main Auditorium",
    description: "Annual alumni technology networking event.",
    attendees: 48,
    attendeeAvatars: ["R", "K", "N", "A", "H"],
    friendsAttending: ["Riya Shah", "Kabir Patel"],
  },
  {
    id: 2,
    title: "Startup Pitch Day",
    date: "25 October 2025",
    location: "Innovation Hall",
    description: "Students pitch ideas to alumni investors.",
    attendees: 32,
    attendeeAvatars: ["R", "N", "D"],
    friendsAttending: ["Riya Shah"],
  },
  {
    id: 3,
    title: "Alumni Networking Night",
    date: "18 November 2025",
    location: "City Convention Center",
    description: "Reconnect with your batch and build new connections.",
    attendees: 76,
    attendeeAvatars: ["R", "K", "N", "A", "H", "D", "I"],
    friendsAttending: ["Riya Shah", "Kabir Patel", "Neha Jain", "Aarav Mehta"],
  },
]

function Events() {
  const [registeredEvents, setRegisteredEvents] = useState([])
  const [bookmarkedEvents, setBookmarkedEvents] = useState([])

  const handleRegister = (eventId) => {
    if (registeredEvents.includes(eventId)) {
      setRegisteredEvents(registeredEvents.filter(id => id !== eventId))
    } else {
      setRegisteredEvents([...registeredEvents, eventId])
    }
  }

  const toggleBookmark = (eventId) => {
    if (bookmarkedEvents.includes(eventId)) {
      setBookmarkedEvents(bookmarkedEvents.filter(id => id !== eventId))
    } else {
      setBookmarkedEvents([...bookmarkedEvents, eventId])
    }
  }

  const handleShare = (eventId) => {
    // Frontend only - no backend logic
    if (navigator.share) {
      const event = MOCK_EVENTS.find(e => e.id === eventId)
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      }).catch(() => {})
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert("Event link copied to clipboard!")
      })
    }
  }

  return (
    <div className="space-y-8">

      <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
        Upcoming Events
      </h1>

      <div className="space-y-8">
        {MOCK_EVENTS.map((event) => {
          const isRegistered = registeredEvents.includes(event.id)

          return (
            <div
              key={event.id}
              className={`rounded-3xl border p-8 transition-all duration-300
              ${isRegistered
                ? "border-[var(--color-accent-purple)] shadow-[0_0_40px_rgba(124,58,237,0.25)]"
                : "border-[var(--color-border-soft)] shadow-md"
              }
              bg-[var(--color-bg-card)]`}
            >

              {/* HEADER WITH ACTIONS */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
                    {event.title}
                  </h2>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => toggleBookmark(event.id)}
                    className={`rounded-full p-2 transition-all duration-300 ${
                      bookmarkedEvents.includes(event.id)
                        ? "bg-[var(--color-accent-purple)] text-white shadow-[0_0_15px_rgba(124,58,237,0.5)]"
                        : "border border-[var(--color-border-soft)] bg-[var(--color-bg-main)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent-purple)]"
                    }`}
                    title={bookmarkedEvents.includes(event.id) ? "Bookmarked" : "Bookmark"}
                  >
                    {bookmarkedEvents.includes(event.id) ? "✓" : "☆"}
                  </button>
                  <button
                    onClick={() => handleShare(event.id)}
                    className="rounded-full border border-[var(--color-border-soft)] bg-[var(--color-bg-main)] p-2 text-[var(--color-text-secondary)] transition hover:border-[var(--color-accent-indigo)] hover:text-[var(--color-accent-indigo)]"
                    title="Share Event"
                  >
                    ↗
                  </button>
                </div>
              </div>

              {/* META */}
              <div className="mt-3 flex flex-wrap gap-6 text-sm font-medium text-[var(--color-text-secondary)]">
                <span>📅 {event.date}</span>
                <span>📍 {event.location}</span>
                <span>👥 {event.attendees + (isRegistered ? 1 : 0)} attending</span>
              </div>

              {/* ATTENDEE AVATARS ROW */}
              <div className="mt-4 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {event.attendeeAvatars.slice(0, 5).map((avatar, idx) => (
                    <div
                      key={idx}
                      className="h-10 w-10 rounded-full border-2 border-[var(--color-bg-card)] bg-gradient-to-tr from-[var(--color-accent-indigo)] to-[var(--color-accent-purple)] flex items-center justify-center text-xs font-bold text-white"
                    >
                      {avatar}
                    </div>
                  ))}
                  {event.attendees > 5 && (
                    <div className="h-10 w-10 rounded-full border-2 border-[var(--color-bg-card)] bg-[var(--color-bg-main)] flex items-center justify-center text-xs font-bold text-[var(--color-text-secondary)]">
                      +{event.attendees - 5}
                    </div>
                  )}
                </div>
                <span className="text-xs font-medium text-[var(--color-text-secondary)]">
                  {event.attendees + (isRegistered ? 1 : 0)} people attending
                </span>
              </div>

              {/* FRIENDS ATTENDING */}
              {event.friendsAttending.length > 0 && (
                <div className="mt-4 rounded-xl border border-[var(--color-accent-purple)]/30 bg-[var(--color-accent-purple)]/10 p-3">
                  <p className="text-xs font-semibold text-[var(--color-accent-purple)] mb-2">
                    Friends Attending:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {event.friendsAttending.map((friend, idx) => (
                      <span
                        key={idx}
                        className="rounded-full bg-[var(--color-accent-purple)]/20 px-3 py-1 text-xs font-medium text-[var(--color-accent-purple)]"
                      >
                        {friend}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* DESCRIPTION */}
              <p className="mt-4 text-[15px] text-[var(--color-text-secondary)] leading-relaxed">
                {event.description}
              </p>

              {/* BUTTON */}
              <div className="mt-6">
                <button
                  onClick={() => handleRegister(event.id)}
                  className={`rounded-full px-6 py-2 text-sm font-semibold transition-all duration-300
                  ${isRegistered
                    ? "bg-emerald-500 text-white shadow-[0_0_25px_rgba(16,185,129,0.6)] hover:scale-105"
                    : "bg-gradient-to-r from-[var(--color-accent-indigo)] to-[var(--color-accent-purple)] text-white shadow-[0_0_25px_rgba(99,102,241,0.5)] hover:scale-105 hover:shadow-[0_0_35px_rgba(124,58,237,0.8)]"
                  }`}
                >
                  {isRegistered ? "Registered ✓" : "Register for Event"}
                </button>
              </div>

            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Events
