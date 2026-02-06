import { Card, CardContent } from "../components/ui/Card.jsx"

const GALLERY_ITEMS = [
  {
    category: "Alumni Meet",
    title: "Annual Alumni Connect",
    description: "Graduates from across batches reconnect, share stories, and build new professional links.",
    colorClass: "bg-[var(--color-accent-purple)]/10"
  },
  {
    category: "Mentorship",
    title: "1:1 Alumni Guidance",
    description: "Students connect directly with alumni for career advice, internships, and long-term mentorship.",
    colorClass: "bg-[var(--color-accent-indigo)]/10"
  },
  {
    category: "Events",
    title: "Talks & Workshops",
    description: "Industry experts and alumni leaders share insights through curated talks and hands-on sessions.",
    colorClass: "bg-[var(--color-accent-purple)]/10"
  },
  {
    category: "Community",
    title: "Beyond Graduation",
    description: "UniCircle keeps the community alive long after college — through shared milestones, opportunities, and support.",
    colorClass: "bg-[var(--color-accent-indigo)]/10"
  }
]

function Gallery() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">

      {/* Header */}
      <div className="max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text-primary)]">
          Gallery
        </h1>
        <p className="mt-4 text-base sm:text-lg text-[var(--color-text-secondary)]">
          Moments from across the UniCircle community — events, conversations,
          mentorship, and shared experiences.
        </p>
      </div>

      {/* GALLERY STRIPS */}
      <div className="space-y-12 sm:space-y-20">
        {GALLERY_ITEMS.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col gap-6 sm:gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
              }`}
          >
            {/* Image Placeholder */}
            <div
              className={`w-full lg:w-3/5 h-64 sm:h-80 lg:h-96 rounded-3xl ${item.colorClass} 
              transition-transform duration-500 hover:scale-[1.02] shadow-lg`}
            />

            {/* Content */}
            <div className="w-full lg:w-2/5 flex flex-col items-start text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent-purple)]">
                {item.category}
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)]">
                {item.title}
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[var(--color-text-secondary)]">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Gallery
