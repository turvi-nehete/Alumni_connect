import { useState, useEffect } from 'react'
import { Button } from "../components/ui/Button.jsx"
import { Input } from "../components/ui/Input.jsx"
import { Card, CardContent } from "../components/ui/Card.jsx"
import api from "../services/api"

function Profile() {
  const [profile, setProfile] = useState({
    name: '',
    email: '', // Added email
    batch: '',
    department: '',
    company: '',
    location: '',
    bio: '',
    skills: [],
    linkedin: '', // Added linkedin
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [newSkill, setNewSkill] = useState('')

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const res = await api.get('/profiles/me/')
      const data = res.data
      setProfile({
        name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
        email: data.email || '',
        batch: data.graduation_year || '',
        department: data.department || '', // Now exists in backend
        company: data.company || '',
        location: data.location || '',
        bio: data.bio || '',
        skills: data.skill_names || [],
        linkedin: data.linkedin || '',
      })
    } catch (err) {
      console.error("Failed to fetch profile", err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      // Send fields matching serializer
      const payload = {
        bio: profile.bio,
        company: profile.company,
        location: profile.location,
        linkedin: profile.linkedin,
        graduation_year: profile.batch, // Map back to backend field
        department: profile.department,
        skills: profile.skills,
      }

      await api.patch('/profiles/me/', payload)
      // Optional: Show toast success
      alert("Profile updated successfully!")
    } catch (err) {
      console.error("Failed to save profile", err)
      alert("Failed to save profile.")
    } finally {
      setSaving(false)
    }
  }

  const handleAddSkill = () => {
    if (!newSkill.trim()) return

    setProfile(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }))

    setNewSkill('')
  }

  const handleRemoveSkill = (skillToRemove) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }))
  }

  if (loading) return <div className="p-10 text-center">Loading profile...</div>

  return (
    <div className="mx-auto max-w-4xl space-y-8 animate-in fade-in duration-500">

      {/* Profile Header Card */}
      <Card className="overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-[var(--color-accent-indigo)]/20 to-[var(--color-accent-purple)]/20"></div>
        <CardContent className="px-6 sm:px-8 pb-8 relative">
          <div className="-mt-12 mb-6 flex flex-col sm:flex-row items-start sm:items-end gap-6">
            <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-[var(--color-bg-card)] p-1.5 shadow-xl ring-1 ring-[var(--color-border-soft)]">
              <div className="h-full w-full rounded-full bg-gradient-to-br from-[var(--color-accent-indigo)] to-[var(--color-accent-purple)] flex items-center justify-center text-4xl font-bold text-white">
                {profile.name ? profile.name.charAt(0).toUpperCase() : "U"}
              </div>
            </div>
            <div className="flex-1 min-w-0 pb-2">
              <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">
                {profile.name || "Your Name"}
              </h1>
              <p className="text-base text-[var(--color-text-secondary)] font-medium">
                {profile.batch ? `Class of ${profile.batch}` : "Batch Year"} {profile.department && `• ${profile.department}`}
              </p>
            </div>
            <div className="pb-2">
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>

          {/* Basic Info Form */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-4">
              <label className="text-sm font-semibold text-[var(--color-text-primary)]">Full Name</label>
              <Input
                placeholder="e.g. Riya Shah"
                value={profile.name}
                readOnly // Name from Signup is read-only
                className="bg-gray-100 dark:bg-gray-800 cursor-not-allowed opacity-70"
                title="Name cannot be changed here"
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-semibold text-[var(--color-text-primary)]">Email</label>
              <Input
                value={profile.email}
                readOnly
                className="bg-gray-100 dark:bg-gray-800 cursor-not-allowed opacity-70"
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-semibold text-[var(--color-text-primary)]">Batch Year</label>
              <Input
                placeholder="e.g. 2020"
                value={profile.batch}
                onChange={(e) => setProfile({ ...profile, batch: e.target.value })}
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-semibold text-[var(--color-text-primary)]">Department</label>
              <Input
                placeholder="e.g. Computer Science"
                value={profile.department}
                onChange={(e) => setProfile({ ...profile, department: e.target.value })}
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-semibold text-[var(--color-text-primary)]">Current Company</label>
              <Input
                placeholder="e.g. Google"
                value={profile.company}
                onChange={(e) => setProfile({ ...profile, company: e.target.value })}
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-semibold text-[var(--color-text-primary)]">Current Location</label>
              <Input
                placeholder="e.g. Mumbai, India"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-semibold text-[var(--color-text-primary)]">LinkedIn URL</label>
              <Input
                placeholder="https://linkedin.com/in/..."
                value={profile.linkedin}
                onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Bio Section */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardContent className="p-6 sm:p-8">
              <h2 className="mb-4 text-lg font-bold text-[var(--color-text-primary)]">
                Bio
              </h2>
              <textarea
                placeholder="Tell us about yourself..."
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                rows={6}
                className="w-full rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-bg-main)] px-4 py-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] focus:border-[var(--color-accent-purple)] focus:outline-none transition-colors resize-none"
              />
            </CardContent>
          </Card>
        </div>

        {/* Skills Section */}
        <div>
          <Card className="h-full">
            <CardContent className="p-6 sm:p-8">
              <h2 className="mb-4 text-lg font-bold text-[var(--color-text-primary)]">
                Skills
              </h2>

              <div className="mb-6 flex flex-wrap gap-2 min-h-[60px]">
                {profile.skills.length > 0 ? (
                  profile.skills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-1.5 rounded-full bg-[var(--color-accent-indigo)]/10 px-3 py-1 text-xs font-semibold text-[var(--color-accent-indigo)] border border-[var(--color-accent-indigo)]/20"
                    >
                      {skill}
                      <button
                        onClick={() => handleRemoveSkill(skill)}
                        className="hover:text-[var(--color-accent-purple)]"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-[var(--color-text-secondary)] italic">No skills added yet.</p>
                )}
              </div>

              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a new skill"
                  className="flex-1"
                />
                <Button
                  onClick={handleAddSkill}
                  size="sm"
                  className="px-4"
                >
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

    </div>
  )
}

export default Profile
