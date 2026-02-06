import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Camera } from 'lucide-react'

// Mock Images (using Unsplash source for realism)
const GALLERY_IMAGES = [
    { id: 1, src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800", caption: "Class of 2023 Convocation" },
    { id: 2, src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800", caption: "Alumni Networking Dinner" },
    { id: 3, src: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=800", caption: "Guest Lecture Series" },
    { id: 4, src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800", caption: "Campus Tech Fest 2023" },
    { id: 5, src: "https://images.unsplash.com/photo-1560439514-e960a3ef5019?auto=format&fit=crop&q=80&w=800", caption: "Startup Pitch Day" },
    { id: 6, src: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800", caption: "Annual Hackathon" },
]

function PublicGallery() {
    const navigate = useNavigate()

    const handleInteraction = () => {
        navigate('/login')
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">

            {/* Header */}
            <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
                    Moments & Memories
                </h1>
                <p className="text-[var(--color-text-secondary)]">
                    Capturing the spirit of our community through events, reunions, and celebrations.
                </p>
            </div>

            {/* Masonry-ish Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {GALLERY_IMAGES.map((img) => (
                    <div
                        key={img.id}
                        className="group relative overflow-hidden rounded-xl cursor-pointer h-64"
                        onClick={handleInteraction}
                    >
                        <img
                            src={img.src}
                            alt={img.caption}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                            <p className="text-white font-bold">{img.caption}</p>
                            <p className="text-white/80 text-xs flex items-center gap-1 mt-1">
                                <Camera className="h-3 w-3" />
                                View Full Album
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Login Trigger */}
            <div className="flex justify-center mt-8">
                <Button
                    onClick={handleInteraction}
                    variant="ghost"
                    className="text-[var(--color-accent-indigo)] hover:bg-[var(--color-accent-indigo)]/10"
                >
                    View 150+ More Photos →
                </Button>
            </div>

        </div>
    )
}

export default PublicGallery
