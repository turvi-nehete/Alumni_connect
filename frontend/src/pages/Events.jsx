const MOCK_EVENTS = [
  {
    id: 1,
    title: 'Alumni Networking Night',
    date: 'March 24, 2026',
    description: 'A brief description of the event will appear here soon.',
  },
  {
    id: 2,
    title: 'Campus Homecoming',
    date: 'April 12, 2026',
    description: 'Details about speakers, sessions, and activities go here.',
  },
  {
    id: 3,
    title: 'Tech Careers Panel',
    date: 'May 3, 2026',
    description: 'Insights from alumni leaders in the tech industry.',
  },
  {
    id: 4,
    title: 'Mentor Match Kickoff',
    date: 'June 8, 2026',
    description: 'Information about mentorship cohorts and introductions.',
  },
  {
    id: 5,
    title: 'Giving Day Celebration',
    date: 'July 20, 2026',
    description: 'Highlights from our annual day of giving and impact.',
  },
]

function Events() {
  return (
    <div className="space-y-6">
      {MOCK_EVENTS.map((event) => (
        <div
          key={event.id}
          className="w-full rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] p-8 shadow-sm transition-transform transition-shadow duration-150 hover:-translate-y-0.5 hover:shadow-md"
        >
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
            {event.title}
          </h2>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            {event.date}
          </p>
          <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
            {event.description}
          </p>
          <div className="mt-6">
            <button
              type="button"
              className="inline-flex h-9 w-24 rounded-full border border-[var(--color-border-soft)] bg-[var(--color-bg-card)]"
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Events

