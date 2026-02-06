const MOCK_MEMBERS = [
  { id: 1, name: 'Member Name', role: 'Alumni', batch: 'Batch of 2018' },
  { id: 2, name: 'Member Name', role: 'Student', batch: 'Batch of 2026' },
  { id: 3, name: 'Member Name', role: 'Alumni', batch: 'Batch of 2015' },
  { id: 4, name: 'Member Name', role: 'Student', batch: 'Batch of 2025' },
  { id: 5, name: 'Member Name', role: 'Alumni', batch: 'Batch of 2012' },
  { id: 6, name: 'Member Name', role: 'Student', batch: 'Batch of 2027' },
  { id: 7, name: 'Member Name', role: 'Alumni', batch: 'Batch of 2010' },
  { id: 8, name: 'Member Name', role: 'Student', batch: 'Batch of 2024' },
]

function Members() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {MOCK_MEMBERS.map((member) => (
        <div
          key={member.id}
          className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] p-8 text-center shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
        >
          {/* Bigger Avatar Placeholder */}
          <div className="mb-6 h-20 w-20 rounded-full border border-[var(--color-border-soft)] bg-[var(--color-bg-main)]" />

          {/* Name */}
          <p className="text-lg font-semibold text-[var(--color-text-primary)]">
            {member.name}
          </p>

          {/* Role */}
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            {member.role}
          </p>

          {/* Batch */}
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            {member.batch}
          </p>
        </div>
      ))}
    </div>
  )
}

export default Members
