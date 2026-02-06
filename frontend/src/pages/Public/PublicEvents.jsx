import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Card, CardContent } from '../../components/ui/Card'
import { Calendar, MapPin, Clock } from 'lucide-react'

// Mock Data for Public View
const PUBLIC_EVENTS = [
    {
        id: 1,
        title: "Alumni Startup Meet 2024",
        date: "2024-03-15",
        time: "10:00 AM",
        location: "Innovation Hub, Campus",
        category: "Meetup",
        description: "Connect with alumni founders and investors. Pitch your ideas and network with the best minds.",
        image: "https://images.unsplash.com/photo-1559223605-391d97741d05?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 2,
        title: "Breaking into FinTech – Alumni Panel",
        date: "2024-03-20",
        time: "6:00 PM",
        location: "Online (Zoom)",
        category: "Webinar",
        description: "Learn from alumni working at J.P. Morgan, Goldman Sachs, and Stripe about landing roles in FinTech.",
        image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 3,
        title: "Annual Alumni Reunion Night",
        date: "2024-04-12",
        time: "7:00 PM",
        location: "Grand Ball Room, City Hotel",
        category: "Reunion",
        description: "Relive the golden days! Dinner, music, and networking with batchmates from all years.",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 4,
        title: "Tech Trends 2024: AI & Future",
        date: "2024-03-25",
        time: "5:00 PM",
        location: "Auditorium A",
        category: "Workshop",
        description: "A deep dive into Generative AI and its impact on software engineering careers.",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800"
    }
]

function PublicEvents() {
    const navigate = useNavigate()

    const handleInteraction = () => {
        navigate('/login')
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
                        Upcoming Events
                    </h1>
                    <p className="text-[var(--color-text-secondary)] mt-1 text-lg">
                        Join exclusive gatherings, workshops, and reunions hosted by the community.
                    </p>
                </div>

                <div className="hidden md:block">
                    <Button
                        onClick={handleInteraction}
                        className="bg-[var(--color-accent-indigo)] hover:bg-[var(--color-accent-indigo)]/90 text-white"
                    >
                        Login to Register
                    </Button>
                </div>
            </div>

            {/* Events Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {PUBLIC_EVENTS.map((event) => (
                    <Card
                        key={event.id}
                        className="overflow-hidden cursor-pointer group hover:border-[var(--color-accent-indigo)] transition-all duration-300"
                        onClick={handleInteraction}
                    >
                        <div className="relative h-48 w-full">
                            <img
                                src={event.image}
                                alt={event.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[var(--color-accent-indigo)] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                {event.category}
                            </div>
                        </div>

                        <CardContent className="p-6">
                            <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] mb-3">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                                <span className="mx-1">•</span>
                                <Clock className="h-4 w-4" />
                                <span>{event.time}</span>
                            </div>

                            <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-accent-indigo)] transition-colours">
                                {event.title}
                            </h3>

                            <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] mb-4">
                                <MapPin className="h-4 w-4" />
                                <span>{event.location}</span>
                            </div>

                            <p className="text-[var(--color-text-secondary)] line-clamp-2 mb-6">
                                {event.description}
                            </p>

                            <Button
                                className="w-full bg-[var(--color-bg-main)] text-[var(--color-text-primary)] border border-[var(--color-border-soft)] hover:bg-[var(--color-accent-indigo)] hover:text-white"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleInteraction()
                                }}
                            >
                                View Details
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* CTA Banner */}
            <div className="mt-12 rounded-2xl bg-gradient-to-r from-[var(--color-accent-indigo)] to-[var(--color-accent-purple)] p-8 text-center text-white shadow-lg">
                <h2 className="text-2xl font-bold mb-2">Don't miss out on these events!</h2>
                <p className="mb-6 text-white/90">Log in to RSVP, see who's attending, and get event updates.</p>
                <Button
                    onClick={handleInteraction}
                    className="bg-white text-[var(--color-accent-indigo)] hover:bg-white/90 font-bold px-8"
                >
                    Log In to Join
                </Button>
            </div>
        </div>
    )
}

export default PublicEvents
