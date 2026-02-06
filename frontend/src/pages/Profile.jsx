import { useState } from 'react'

function Profile() {
  const [profile, setProfile] = useState({
    name: '',
    batch: '',
    department: '',
    company: '',
    location: '',
    bio: '',
    skills: [],
  })

  const [newSkill, setNewSkill] = useState('')

  const handleAddSkill = () => {
    if (!newSkill.trim()) return

    setProfile({
      ...profile,
      skills: [...profile.skills, newSkill],
    })

    setNewSkill('')
  }

  const handleRemoveSkill = (skillToRemove) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter(
        (skill) => skill !== skillToRemove
      ),
    })
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">

      {/* Profile Header */}
      <div className="flex items-center gap-6">
        <div className="h-24 w-24 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border-soft)]" />
        <div>
          <h1 className="text-2xl font-semibold text-[var(--color-text-primary)]">
            {profile.name || "Your Name"}
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {profile.batch} {profile.department && `• ${profile.department}`}
          </p>
        </div>
      </div>

      {/* Basic Info Form */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          type="text"
          placeholder="Name"
          value={profile.name}
          onChange={(e) =>
            setProfile({ ...profile, name: e.target.value })
          }
          className="rounded-lg border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] px-4 py-2 text-sm"
        />

        <input
          type="text"
          placeholder="Batch"
          value={profile.batch}
          onChange={(e) =>
            setProfile({ ...profile, batch: e.target.value })
          }
          className="rounded-lg border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] px-4 py-2 text-sm"
        />

        <input
          type="text"
          placeholder="Department"
          value={profile.department}
          onChange={(e) =>
            setProfile({ ...profile, department: e.target.value })
          }
          className="rounded-lg border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] px-4 py-2 text-sm"
        />

        <input
          type="text"
          placeholder="Company"
          value={profile.company}
          onChange={(e) =>
            setProfile({ ...profile, company: e.target.value })
          }
          className="rounded-lg border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] px-4 py-2 text-sm"
        />

        <input
          type="text"
          placeholder="Location"
          value={profile.location}
          onChange={(e) =>
            setProfile({ ...profile, location: e.target.value })
          }
          className="rounded-lg border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] px-4 py-2 text-sm"
        />
      </div>

      {/* Bio */}
      <div>
        <textarea
          placeholder="Bio"
          value={profile.bio}
          onChange={(e) =>
            setProfile({ ...profile, bio: e.target.value })
          }
          rows={4}
          className="w-full rounded-lg border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] px-4 py-2 text-sm"
        />
      </div>

      {/* Skills Section */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-[var(--color-text-primary)]">
          Skills
        </h2>

        <div className="mb-3 flex flex-wrap gap-2">
          {profile.skills.map((skill) => (
            <div
              key={skill}
              className="flex items-center gap-2 rounded-full bg-indigo-500/20 px-3 py-1 text-xs"
            >
              {skill}
              <button
                onClick={() => handleRemoveSkill(skill)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add skill"
            className="flex-1 rounded-lg border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] px-4 py-2 text-sm"
          />

          <button
            onClick={handleAddSkill}
            className="rounded-full bg-gradient-to-r from-[var(--color-accent-indigo)] to-[var(--color-accent-purple)] px-4 py-2 text-sm font-semibold text-white"
          >
            Add
          </button>
        </div>
      </div>

    </div>
  )
}

export default Profile
