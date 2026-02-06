function About() {
  return (
    <div className="relative min-h-screen w-full px-[6vh] py-[6vh]">

      {/* Page heading */}
      <div className="mb-[6vh]">
        <h1 className="text-4xl font-semibold tracking-wide text-[var(--color-text-primary)]">
          About UniCircle
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[var(--color-text-secondary)]">
          A unified platform designed to strengthen alumni–student connections,
          foster mentorship, and build lasting academic communities.
        </p>
      </div>

      {/* BENTO GRID */}
      <div className="grid grid-cols-4 grid-rows-2 gap-[3vh]">

        {/* Big statement tile */}
        <div className="col-span-2 row-span-1 rounded-2xl border border-white/10 bg-purple-500/10 p-[4vh]">
          <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">
            One Network. One Identity.
          </h2>
          <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
            UniCircle brings students, alumni, and institutions into a single,
            structured ecosystem — replacing fragmented chats, emails, and
            spreadsheets.
          </p>
        </div>

        {/* Members stat */}
        <div className="rounded-2xl border border-white/10 bg-black/40 p-[4vh]">
          <p className="text-sm text-[var(--color-text-secondary)]">
            Total Members
          </p>
          <h3 className="mt-4 text-4xl font-semibold text-[var(--color-text-primary)]">
            12,480+
          </h3>
          <p className="mt-2 text-xs text-purple-400">
            students & alumni onboarded
          </p>
        </div>

        {/* Colleges stat */}
        <div className="rounded-2xl border border-white/10 bg-black/40 p-[4vh]">
          <p className="text-sm text-[var(--color-text-secondary)]">
            Institutions
          </p>
          <h3 className="mt-4 text-4xl font-semibold text-[var(--color-text-primary)]">
            35+
          </h3>
          <p className="mt-2 text-xs text-purple-400">
            active college communities
          </p>
        </div>

        {/* Features tile */}
        <div className="col-span-1 row-span-1 rounded-2xl border border-white/10 bg-purple-500/5 p-[4vh]">
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
            Core Features
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-[var(--color-text-secondary)]">
            <li>• Alumni directory</li>
            <li>• Job & referral board</li>
            <li>• Events & reunions</li>
            <li>• Mentorship programs</li>
          </ul>
        </div>

        {/* Admin control tile */}
        <div className="col-span-1 row-span-1 rounded-2xl border border-white/10 bg-black/40 p-[4vh]">
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
            Admin Control
          </h3>
          <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
            Role-based dashboards allow institutions to manage users, verify
            alumni, moderate content, and track engagement — all in one place.
          </p>
        </div>

        {/* Vision tile */}
        <div className="col-span-2 row-span-1 rounded-2xl border border-white/10 bg-purple-500/10 p-[4vh]">
          <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
            Built for the long term
          </h3>
          <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
            UniCircle is designed to scale with institutions — from small college
            networks to global alumni ecosystems — without losing clarity or
            community focus.
          </p>
        </div>

      </div>
    </div>
  )
}

export default About
