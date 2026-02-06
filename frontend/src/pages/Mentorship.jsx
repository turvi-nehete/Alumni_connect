import { Button } from "../components/ui/Button.jsx"
import { Card, CardContent } from "../components/ui/Card.jsx"
import { useNotification } from "../context/NotificationContext.jsx" // Add import

const MOCK_MENTORS = [
  { id: 1, name: "Dr. Anjali Gupta", expertise: "Data Science, AI", company: "Google", experience: "10+ Years", slots: 2 },
  { id: 2, name: "Mr. Rohan Kumar", expertise: "Product Management", company: "Amazon", experience: "8 Years", slots: 0 },
  { id: 3, name: "Ms. Priya Singh", expertise: "Software Engineering", company: "Microsoft", experience: "5 Years", slots: 4 },
  { id: 4, name: "Mr. Aditya Roy", expertise: "Entrepreneurship", company: "Founder, TechStart", experience: "12 Years", slots: 1 },
]

function Mentorship() {
  const { addNotification } = useNotification() // Add hook

  const handleRequest = (mentorName) => {
    // Mock booking success
    addNotification("success", `Mentorship request sent to ${mentorName}!`)
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl
      bg-gradient-to-br from-[var(--color-accent-indigo)]/10
      via-[var(--color-accent-purple)]/5
      to-transparent
      px-6 py-8 sm:px-10 sm:py-12 border border-[var(--color-accent-indigo)]/20">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text-primary)]">
            Find Your Mentor
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[var(--color-text-secondary)]">
            Connect with experienced alumni who can guide you through your career journey. book 1:1 sessions, get resume reviews, and more.
          </p>
          <div className="mt-8 flex gap-4">
            <Button size="lg" className="shadow-lg shadow-indigo-500/20">Find a Mentor</Button>
            <Button size="lg" variant="outline">Become a Mentor</Button>
          </div>
        </div>
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-[var(--color-accent-purple)]/10 blur-3xl pointer-events-none" />
      </section>

      <section>
        <h2 className="mb-6 text-xl font-bold text-[var(--color-text-primary)]">Featured Mentors</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MOCK_MENTORS.map((mentor) => (
            <Card key={mentor.id} className="group flex flex-col h-full hover:border-[var(--color-accent-indigo)]/30 transition-all duration-300">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-4 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[var(--color-accent-purple)] to-[var(--color-accent-indigo)] flex items-center justify-center text-lg font-bold text-white shadow-md">
                    {mentor.name.charAt(4)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-[var(--color-text-primary)] truncate">{mentor.name}</h3>
                    <p className="text-xs text-[var(--color-text-secondary)]">{mentor.company}</p>
                  </div>
                </div>

                <div className="flex-1 space-y-2 mb-6">
                  <div className="text-sm">
                    <span className="block text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wide">Expertise</span>
                    <span className="text-[var(--color-text-primary)] font-medium">{mentor.expertise}</span>
                  </div>
                  <div className="text-sm">
                    <span className="block text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wide">Experience</span>
                    <span className="text-[var(--color-text-primary)] font-medium">{mentor.experience}</span>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-[var(--color-border-soft)] flex items-center justify-between">
                  <span className={`text-xs font-bold ${mentor.slots > 0 ? "text-emerald-500" : "text-rose-500"}`}>
                    {mentor.slots > 0 ? `${mentor.slots} Slots Available` : "Fully Booked"}
                  </span>
                  <Button
                    size="sm"
                    variant={mentor.slots > 0 ? "primary" : "secondary"}
                    disabled={mentor.slots === 0}
                    onClick={() => handleRequest(mentor.name)} // Added handler
                  >
                    Request
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
export default Mentorship

