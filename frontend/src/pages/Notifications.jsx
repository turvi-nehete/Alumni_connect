import { Card, CardContent } from "../components/ui/Card.jsx"
import { Button } from "../components/ui/Button.jsx"

const MOCK_NOTIFICATIONS = [
  { id: 1, type: "alert", message: "Your mentorship session with Dr. Gupta is confirmed for tomorrow at 10 AM.", time: "2 hours ago", isRead: false },
  { id: 2, type: "info", message: "New job posting: Senior React Developer at TechCorp matches your profile.", time: "5 hours ago", isRead: false },
  { id: 3, type: "success", message: "Your donation of ₹5,000 was successfully processed. Thank you!", time: "1 day ago", isRead: true },
  { id: 4, type: "info", message: "Riya Shah viewed your profile.", time: "2 days ago", isRead: true },
]

function Notifications() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-3xl mx-auto">

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
          Notifications
        </h1>
        <Button variant="ghost" size="sm">Mark all as read</Button>
      </div>

      <div className="space-y-4">
        {MOCK_NOTIFICATIONS.map((notification) => (
          <Card key={notification.id} className={`transition-all duration-200 ${notification.isRead ? 'opacity-80' : 'border-l-4 border-l-[var(--color-accent-indigo)]'}`}>
            <CardContent className="p-4 sm:p-5 flex gap-4 items-start">
              <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${notification.isRead ? 'bg-transparent' : 'bg-[var(--color-accent-indigo)]'}`} />
              <div className="flex-1">
                <p className={`text-sm sm:text-base ${notification.isRead ? 'text-[var(--color-text-secondary)]' : 'text-[var(--color-text-primary)] font-medium'}`}>
                  {notification.message}
                </p>
                <p className="mt-1.5 text-xs text-[var(--color-text-secondary)]">
                  {notification.time}
                </p>
              </div>
              {!notification.isRead && (
                <Button size="xs" variant="ghost" className="text-[var(--color-accent-indigo)]">Read</Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {MOCK_NOTIFICATIONS.length === 0 && (
        <div className="text-center py-20 text-[var(--color-text-secondary)]">
          No new notifications.
        </div>
      )}
    </div>
  )
}

export default Notifications

