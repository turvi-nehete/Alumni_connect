import { useAuth } from '../context/AuthContext.jsx'

const MOCK_MEMBERS = [
  { id: 1, name: 'Darsh Doshi', role: 'Alumni', batch: 'Batch of 2018' },
  { id: 2, name: 'Aarav Mehta', role: 'Student', batch: 'Batch of 2026' },
  { id: 3, name: 'Riya Shah', role: 'Alumni', batch: 'Batch of 2015' },
  { id: 4, name: 'Kabir Patel', role: 'Student', batch: 'Batch of 2025' },
  { id: 5, name: 'Neha Jain', role: 'Alumni', batch: 'Batch of 2012' },
  { id: 6, name: 'Dev Malhotra', role: 'Student', batch: 'Batch of 2027' },
  { id: 7, name: 'Ishaan Rao', role: 'Alumni', batch: 'Batch of 2010' },
  { id: 8, name: 'Meera Kapoor', role: 'Student', batch: 'Batch of 2024' },
]

function Members() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {MOCK_MEMBERS.map((member) => (
        <div key={member.id} className="perspective h-[340px]">

          <div className="flip-card glow-card relative h-full w-full rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] shadow-md">

            {/* FRONT SIDE */}
            <div className="flip-front absolute inset-0 flex flex-col items-center justify-between rounded-2xl p-8">

              {/* Big Avatar */}
              <div className="mt-6 h-36 w-36 rounded-full bg-gradient-to-tr from-[var(--color-accent-indigo)] to-[var(--color-accent-purple)] p-1">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-[var(--color-bg-main)] text-4xl font-bold text-[var(--color-accent-indigo)]">
                  {member.name?.charAt(0)}
                </div>
              </div>

              {/* Name Bottom with Subtle Glow */}
<p className="text-lg font-semibold tracking-wide text-white 
  [text-shadow:0_0_8px_rgba(255,255,255,0.8),0_2px_12px_rgba(0,0,0,0.8)]">
  {member.name}
</p>




            </div>

            {/* BACK SIDE */}
            <div className="flip-back absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-[var(--color-bg-main)] p-8 text-center">

              <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
                {member.name}
              </h2>

              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                {member.batch}
              </p>

              {/* SOCIAL LAYER */}
              <div className="mt-6 w-full space-y-4">
                
                {/* Mutual Connections */}
                <div className="rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">
                    Mutual Connections
                  </p>
                  <p className="mt-1 text-lg font-bold text-[var(--color-accent-indigo)]">
                    {member.id % 3 === 0 ? "8" : member.id % 2 === 0 ? "5" : "3"}
                  </p>
                </div>

                {/* Shared Skills */}
                <div className="rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">
                    Shared Skills
                  </p>
                  <div className="mt-2 flex flex-wrap justify-center gap-2">
                    {[
                      ["React", "AI"],
                      ["JavaScript", "Python"],
                      ["React", "Node.js"],
                      ["AI", "ML"],
                      ["React", "TypeScript"],
                      ["Python", "Data Science"],
                      ["React", "Vue"],
                      ["JavaScript", "React"],
                    ][member.id - 1].map((skill, idx) => (
                      <span
                        key={idx}
                        className="rounded-full bg-gradient-to-r from-[var(--color-accent-indigo)]/20 to-[var(--color-accent-purple)]/20 px-3 py-1 text-xs font-semibold text-[var(--color-accent-purple)]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* ACTION BUTTONS */}
              {isAuthenticated && (
                <div className="mt-6 flex w-full gap-3">
                  <button
                    className="flex-1 rounded-full bg-gradient-to-r from-[var(--color-accent-indigo)] to-[var(--color-accent-purple)] px-4 py-2 text-sm font-semibold text-white shadow-[0_0_18px_rgba(99,102,241,0.6)] transition hover:shadow-[0_0_24px_rgba(124,58,237,0.8)]"
                  >
                    Connect
                  </button>
                  <button
                    className="rounded-full border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] px-4 py-2 text-sm font-semibold text-[var(--color-text-primary)] transition hover:bg-[var(--color-bg-main)]"
                  >
                    Message
                  </button>
                </div>
              )}

            </div>

          </div>

        </div>
      ))}
    </div>
  )
}

export default Members
