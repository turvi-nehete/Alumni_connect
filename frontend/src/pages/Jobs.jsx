import { useState } from "react"

const MOCK_JOBS = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Corp",
    location: "Mumbai",
    type: "Full-time",
    isRemote: false,
    skillMatch: 92,
    isRecommended: true,
    referredBy: "Riya Shah",
    postedBy: "alumni",
  },
  {
    id: 2,
    title: "Product Manager",
    company: "StartupXYZ",
    location: "Bangalore",
    type: "Full-time",
    isRemote: true,
    skillMatch: 78,
    isRecommended: true,
    referredBy: null,
    postedBy: "alumni",
  },
  {
    id: 3,
    title: "Data Analyst",
    company: "Data Insights Ltd",
    location: "Remote",
    type: "Full-time",
    isRemote: true,
    skillMatch: 65,
    isRecommended: false,
    referredBy: null,
    postedBy: "external",
  },
  {
    id: 4,
    title: "Senior Software Engineer",
    company: "BigTech Inc",
    location: "Delhi",
    type: "Full-time",
    isRemote: false,
    skillMatch: 88,
    isRecommended: true,
    referredBy: "Kabir Patel",
    postedBy: "alumni",
  },
]

function Jobs() {
  const [savedJobs, setSavedJobs] = useState([])

  const toggleSave = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId))
    } else {
      setSavedJobs([...savedJobs, jobId])
    }
  }

  const recommendedJobs = MOCK_JOBS.filter(job => job.isRecommended)
  const allJobs = MOCK_JOBS

  return (
    <div className="space-y-8">

      {/* STATS ROW */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { value: "24", label: "Total Open Jobs", color: "text-[var(--color-accent-indigo)]" },
          { value: "8", label: "New This Week", color: "text-[var(--color-accent-purple)]" },
          { value: "12", label: "Remote Roles", color: "text-emerald-400" },
          { value: "68%", label: "Alumni Posted %", color: "text-rose-400" },
        ].map((stat, index) => (
          <div
            key={index}
            className="rounded-2xl sm:rounded-3xl border border-[var(--color-border-soft)]
            bg-[var(--color-bg-card)] p-4 sm:p-6 shadow-md transition-all duration-300
            hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]"
          >
            <p className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${stat.color}`}>
              {stat.value}
            </p>
            <p className="mt-2 text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* RECOMMENDED FOR YOU SECTION */}
      {recommendedJobs.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-wide text-[var(--color-text-primary)]">
            Recommended For You
          </h2>
          <div className="space-y-4">
            {recommendedJobs.map((job) => {
              const isSaved = savedJobs.includes(job.id)
              return (
                <div
                  key={job.id}
                  className="group relative rounded-2xl sm:rounded-3xl border border-[var(--color-border-soft)]
                  bg-[var(--color-bg-card)] p-4 sm:p-6 shadow-md transition-all duration-300
                  hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(124,58,237,0.2)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                        <h3 className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)]">
                          {job.title}
                        </h3>
                        {job.referredBy && (
                          <span className="rounded-full bg-gradient-to-r from-[var(--color-accent-indigo)]/20 to-[var(--color-accent-purple)]/20 px-2 sm:px-3 py-1 text-xs font-semibold text-[var(--color-accent-purple)] self-start sm:self-auto">
                            Referred by Alumni
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm font-medium text-[var(--color-text-secondary)]">
                        {job.company} • {job.location} {job.isRemote && "• Remote"}
                      </p>
                      <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-[var(--color-text-secondary)]">
                            Skill Match:
                          </span>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-20 sm:w-24 overflow-hidden rounded-full bg-[var(--color-bg-main)]">
                              <div
                                className={`h-full rounded-full ${
                                  job.skillMatch >= 80
                                    ? "bg-gradient-to-r from-emerald-400 to-emerald-500"
                                    : job.skillMatch >= 60
                                    ? "bg-gradient-to-r from-[var(--color-accent-indigo)] to-[var(--color-accent-purple)]"
                                    : "bg-gradient-to-r from-yellow-400 to-orange-400"
                                }`}
                                style={{ width: `${job.skillMatch}%` }}
                              />
                            </div>
                            <span className={`text-sm font-bold ${
                              job.skillMatch >= 80
                                ? "text-emerald-400"
                                : job.skillMatch >= 60
                                ? "text-[var(--color-accent-purple)]"
                                : "text-yellow-400"
                            }`}>
                              {job.skillMatch}%
                            </span>
                          </div>
                        </div>
                        {job.referredBy && (
                          <span className="text-xs text-[var(--color-text-secondary)]">
                            Referred by <span className="font-semibold text-[var(--color-accent-indigo)]">{job.referredBy}</span>
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => toggleSave(job.id)}
                      className={`ml-4 rounded-full p-2 transition-all duration-300 ${
                        isSaved
                          ? "bg-[var(--color-accent-purple)] text-white shadow-[0_0_20px_rgba(124,58,237,0.5)]"
                          : "border border-[var(--color-border-soft)] bg-[var(--color-bg-main)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent-purple)]"
                      }`}
                      title={isSaved ? "Saved" : "Save Job"}
                    >
                      {isSaved ? "✓" : "☆"}
                    </button>
                  </div>
                  <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <button className="rounded-full bg-gradient-to-r from-[var(--color-accent-indigo)] to-[var(--color-accent-purple)] px-5 sm:px-6 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(99,102,241,0.5)] transition hover:shadow-[0_0_30px_rgba(124,58,237,0.7)]">
                      Apply Now
                    </button>
                    <button className="rounded-full border border-[var(--color-border-soft)] bg-[var(--color-bg-main)] px-5 sm:px-6 py-2 text-sm font-semibold text-[var(--color-text-primary)] transition hover:bg-[var(--color-bg-card)]">
                      View Details
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* ALL JOBS SECTION */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold tracking-wide text-[var(--color-text-primary)]">
          All Open Positions
        </h2>
        <div className="space-y-4">
          {allJobs.map((job) => {
            const isSaved = savedJobs.includes(job.id)
            return (
              <div
                key={job.id}
                className="group relative rounded-2xl sm:rounded-3xl border border-[var(--color-border-soft)]
                bg-[var(--color-bg-card)] p-4 sm:p-6 shadow-md transition-all duration-300
                hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                      <h3 className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)]">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {job.referredBy && (
                          <span className="rounded-full bg-gradient-to-r from-[var(--color-accent-indigo)]/20 to-[var(--color-accent-purple)]/20 px-2 sm:px-3 py-1 text-xs font-semibold text-[var(--color-accent-purple)]">
                            Referred by Alumni
                          </span>
                        )}
                        {job.postedBy === "alumni" && (
                          <span className="rounded-full bg-[var(--color-accent-indigo)]/20 px-2 sm:px-3 py-1 text-xs font-semibold text-[var(--color-accent-indigo)]">
                            Alumni Posted
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="mt-1 text-sm font-medium text-[var(--color-text-secondary)]">
                      {job.company} • {job.location} {job.isRemote && "• Remote"}
                    </p>
                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[var(--color-text-secondary)]">
                          Skill Match:
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-20 sm:w-24 overflow-hidden rounded-full bg-[var(--color-bg-main)]">
                            <div
                              className={`h-full rounded-full ${
                                job.skillMatch >= 80
                                  ? "bg-gradient-to-r from-emerald-400 to-emerald-500"
                                  : job.skillMatch >= 60
                                  ? "bg-gradient-to-r from-[var(--color-accent-indigo)] to-[var(--color-accent-purple)]"
                                  : "bg-gradient-to-r from-yellow-400 to-orange-400"
                              }`}
                              style={{ width: `${job.skillMatch}%` }}
                            />
                          </div>
                          <span className={`text-sm font-bold ${
                            job.skillMatch >= 80
                              ? "text-emerald-400"
                              : job.skillMatch >= 60
                              ? "text-[var(--color-accent-purple)]"
                              : "text-yellow-400"
                          }`}>
                            {job.skillMatch}%
                          </span>
                        </div>
                      </div>
                      {job.referredBy && (
                        <span className="text-xs text-[var(--color-text-secondary)]">
                          Referred by <span className="font-semibold text-[var(--color-accent-indigo)]">{job.referredBy}</span>
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSave(job.id)}
                    className={`ml-4 rounded-full p-2 transition-all duration-300 ${
                      isSaved
                        ? "bg-[var(--color-accent-purple)] text-white shadow-[0_0_20px_rgba(124,58,237,0.5)]"
                        : "border border-[var(--color-border-soft)] bg-[var(--color-bg-main)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent-purple)]"
                    }`}
                    title={isSaved ? "Saved" : "Save Job"}
                  >
                    {isSaved ? "✓" : "☆"}
                  </button>
                </div>
                <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button className="rounded-full bg-gradient-to-r from-[var(--color-accent-indigo)] to-[var(--color-accent-purple)] px-5 sm:px-6 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(99,102,241,0.5)] transition hover:shadow-[0_0_30px_rgba(124,58,237,0.7)]">
                    Apply Now
                  </button>
                  <button className="rounded-full border border-[var(--color-border-soft)] bg-[var(--color-bg-main)] px-5 sm:px-6 py-2 text-sm font-semibold text-[var(--color-text-primary)] transition hover:bg-[var(--color-bg-card)]">
                    View Details
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

    </div>
  )
}

export default Jobs
