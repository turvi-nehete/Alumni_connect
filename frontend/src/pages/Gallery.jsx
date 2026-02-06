function Gallery() {
  return (
    <div className="relative w-full px-[6vh] py-[8vh]">

      {/* Header */}
      <div className="mb-[10vh] max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-wide text-white">
          Gallery
        </h1>
        <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
          Moments from across the UniCircle community — events, conversations,
          mentorship, and shared experiences.
        </p>
      </div>

      {/* GALLERY STRIPS */}
      <div className="space-y-[12vh]">

        {/* Strip 1 */}
        <div className="flex items-center gap-[8vh]">
          <div className="h-[38vh] w-[55%] rounded-2xl bg-purple-500/15 transition-transform duration-500 hover:scale-[1.03]" />
          <div className="max-w-sm">
            <p className="text-xs uppercase tracking-widest text-purple-400">
              Alumni Meet
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-white">
              Annual Alumni Connect
            </h2>
            <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
              Graduates from across batches reconnect, share stories, and build
              new professional links.
            </p>
          </div>
        </div>

        {/* Strip 2 (reversed) */}
        <div className="flex items-center gap-[8vh] flex-row-reverse">
          <div className="h-[38vh] w-[55%] rounded-2xl bg-black/40 transition-transform duration-500 hover:scale-[1.03]" />
          <div className="max-w-sm">
            <p className="text-xs uppercase tracking-widest text-purple-400">
              Mentorship
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-white">
              1:1 Alumni Guidance
            </h2>
            <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
              Students connect directly with alumni for career advice,
              internships, and long-term mentorship.
            </p>
          </div>
        </div>

        {/* Strip 3 */}
        <div className="flex items-center gap-[8vh]">
          <div className="h-[38vh] w-[55%] rounded-2xl bg-purple-500/10 transition-transform duration-500 hover:scale-[1.03]" />
          <div className="max-w-sm">
            <p className="text-xs uppercase tracking-widest text-purple-400">
              Events
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-white">
              Talks & Workshops
            </h2>
            <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
              Industry experts and alumni leaders share insights through curated
              talks and hands-on sessions.
            </p>
          </div>
        </div>

        {/* Strip 4 (reversed) */}
        <div className="flex items-center gap-[8vh] flex-row-reverse">
          <div className="h-[38vh] w-[55%] rounded-2xl bg-black/30 transition-transform duration-500 hover:scale-[1.03]" />
          <div className="max-w-sm">
            <p className="text-xs uppercase tracking-widest text-purple-400">
              Community
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-white">
              Beyond Graduation
            </h2>
            <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
              UniCircle keeps the community alive long after college — through
              shared milestones, opportunities, and support.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Gallery
