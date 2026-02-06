import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext.jsx"
import api from "../services/api"
import { Button } from "../components/ui/Button.jsx"
import { Card, CardContent } from "../components/ui/Card.jsx"
import { Input } from "../components/ui/Input.jsx"

import { useNotification } from "../context/NotificationContext.jsx"

// Modal for posting a job
function PostJobModal({ isOpen, onClose, onCreated }) {
  const { addNotification } = useNotification()
  const [formData, setFormData] = useState({
    title: "", company: "", description: "", expiry_date: "", skills: ""
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      // Split skills string into array
      const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(Boolean)

      await api.post("/jobs/post/", { ...formData, skills: skillsArray })
      addNotification("success", "Job posted successfully!")
      onCreated()
      onClose()
      setFormData({ title: "", company: "", description: "", expiry_date: "", skills: "" })
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.error || "Failed to post job")
      addNotification("error", "Failed to post job.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-[var(--color-bg-card)] p-6 shadow-2xl ring-1 ring-[var(--color-border-soft)]">
        <h2 className="mb-4 text-xl font-bold text-[var(--color-text-primary)]">Post New Job</h2>
        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)]">Title</label>
            <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)]">Company</label>
            <Input value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)]">Description</label>
            <textarea
              className="w-full rounded-md border border-[var(--color-border-soft)] bg-[var(--color-bg-main)] px-3 py-2 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-indigo)]"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)]">Required Skills (comma separated)</label>
            <Input
              placeholder="e.g. React, Python, AWS"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)]">Expiry Date</label>
            <Input type="date" value={formData.expiry_date} onChange={(e) => setFormData({ ...formData, expiry_date: e.target.value })} required />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? "Posting..." : "Post Job"}</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Modal for viewing applicants
function ApplicantsModal({ isOpen, onClose, jobId }) {
  const [applicants, setApplicants] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isOpen && jobId) {
      setLoading(true)
      api.get(`/jobs/${jobId}/applicants/`)
        .then(res => setApplicants(res.data))
        .catch(err => console.error(err))
        .finally(() => setLoading(false))
    }
  }, [isOpen, jobId])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-[var(--color-bg-card)] p-6 shadow-2xl ring-1 ring-[var(--color-border-soft)]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Applicants</h2>
          <button onClick={onClose} className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">✕</button>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : applicants.length === 0 ? (
          <div className="text-center py-8 text-[var(--color-text-secondary)]">No applicants yet.</div>
        ) : (
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {applicants.map(app => (
              <div key={app.id} className="flex justify-between items-center p-3 rounded-lg border border-[var(--color-border-soft)] hover:bg-[var(--color-bg-main)]">
                <div>
                  <p className="font-semibold text-[var(--color-text-primary)]">{app.student_name}</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">{app.student_email}</p>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1">Applied: {new Date(app.applied_at).toLocaleDateString()}</p>
                </div>
                <span className="text-xs bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-full capitalize">{app.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


function Jobs() {
  const { user } = useAuth()
  const { addNotification } = useNotification()
  const [jobs, setJobs] = useState([])
  const [recommendedJobs, setRecommendedJobs] = useState([])
  const [myApplications, setMyApplications] = useState([])
  const [isPostModalOpen, setIsPostModalOpen] = useState(false)
  const [viewApplicantsJobId, setViewApplicantsJobId] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const [jobsRes, recRes, appsRes] = await Promise.all([
        api.get("/jobs/"),
        user?.role === 'student' ? api.get("/matchmaking/jobs/") : Promise.resolve({ data: [] }),
        user?.role === 'student' ? api.get("/jobs/my-applications/") : Promise.resolve({ data: [] })
      ])
      setJobs(jobsRes.data)
      setRecommendedJobs(recRes.data)
      setMyApplications(appsRes.data)
    } catch (err) {
      console.error("Failed to fetch jobs", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [user])

  const handleApply = async (jobId) => {
    try {
      await api.post(`/jobs/${jobId}/apply/`)
      addNotification("success", "Application submitted successfully!")
      fetchJobs()
    } catch (err) {
      addNotification("error", err.response?.data?.error || "Failed to apply")
    }
  }

  const isStudent = user?.role === 'student'
  const canPost = user?.role === 'admin' || user?.role === 'alumni'

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
          Jobs & Opportunities
        </h1>
        {canPost && (
          <Button onClick={() => setIsPostModalOpen(true)} className="shadow-lg shadow-indigo-500/20">
            + Post New Job
          </Button>
        )}
      </div>

      <PostJobModal isOpen={isPostModalOpen} onClose={() => setIsPostModalOpen(false)} onCreated={fetchJobs} />
      <ApplicantsModal isOpen={!!viewApplicantsJobId} onClose={() => setViewApplicantsJobId(null)} jobId={viewApplicantsJobId} />

      {/* STUDENT: My Applications */}
      {isStudent && myApplications.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)]">My Applications</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {myApplications.map(app => (
              <Card key={app.id}>
                <CardContent className="p-4">
                  <h3 className="font-bold text-[var(--color-text-primary)]">{app.job_title}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-1">Status: <span className="capitalize text-emerald-500">{app.status}</span></p>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-2">Applied on {new Date(app.applied_at).toLocaleDateString()}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* STUDENT: Recommended Jobs */}
      {isStudent && recommendedJobs.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Recommended For You</h2>
          <div className="space-y-4">
            {recommendedJobs.map(job => (
              <JobCard key={job.id} job={job} onApply={() => handleApply(job.id)} isRecommended />
            ))}
          </div>
        </section>
      )}

      {/* ALL JOBS (or Posted Jobs for Alumni) */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
          {canPost ? "Recent Job Postings" : "All Open Positions"}
        </h2>
        {loading ? <div className="text-center py-10">Loading jobs...</div> : (
          <div className="space-y-4">
            {jobs.map(job => (
              <JobCard
                key={job.id}
                job={job}
                onApply={() => handleApply(job.id)}
                onViewApplicants={() => setViewApplicantsJobId(job.id)}
                isOwner={user?.email === job.posted_by || user?.role === 'admin'} // simple check, ideally check ID
                userRole={user?.role}
              />
            ))}
            {jobs.length === 0 && <p className="text-center text-[var(--color-text-secondary)]">No jobs posted yet.</p>}
          </div>
        )}
      </section>
    </div>
  )
}

function JobCard({ job, onApply, onViewApplicants, isRecommended, isOwner, userRole }) {
  return (
    <Card className={`group transition-all duration-300 ${isRecommended ? "border-l-4 border-l-[var(--color-accent-indigo)]" : ""}`}>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-[var(--color-text-primary)]">{job.title}</h3>
              {isRecommended && (
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-indigo-500/10 text-indigo-500 px-2 py-0.5 rounded-full font-semibold">
                    {job.match_score}% Match
                  </span>
                </div>
              )}
            </div>
            <p className="text-sm font-medium text-[var(--color-text-secondary)] mt-1">
              {job.company} • Posted by {job.posted_by || "Alumni"}
            </p>
            <p className="mt-3 text-[var(--color-text-secondary)] line-clamp-2">{job.description}</p>
          </div>

          <div className="flex flex-col gap-2 min-w-[120px]">
            {userRole === 'student' && (
              <Button
                onClick={onApply}
                disabled={job.has_applied}
                variant={job.has_applied ? "outline" : "primary"}
                className={job.has_applied ? "text-emerald-500 border-emerald-500/20" : ""}
              >
                {job.has_applied ? "Applied ✓" : "Apply Now"}
              </Button>
            )}

            {isOwner && (
              <Button onClick={onViewApplicants} variant="outline">
                View Applicants
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Jobs
