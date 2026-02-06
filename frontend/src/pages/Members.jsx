import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from '../context/AuthContext.jsx'
import api from '../services/api'
import { useNotification } from "../context/NotificationContext.jsx"

function Members() {
  const { isAuthenticated, user } = useAuth()
  const navigate = useNavigate()
  const { addNotification } = useNotification()
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("alumni")

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    try {
      const response = await api.get('/profiles/all/')
      const filtered = isAuthenticated && user
        ? response.data.filter(p => p.email !== user.email)
        : response.data
      setMembers(filtered)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleConnect = async (userId) => {
    try {
      const response = await api.post('/messaging/create-chat/', { user_id: userId })
      const chatId = response.data.chat_id
      navigate(`/messaging?chatId=${chatId}`)
    } catch (err) {
      console.error(err)
      addNotification("error", "Failed to connect.")
    }
  }

  const filteredMembers = members.filter(member => member.role?.toLowerCase() === activeTab)

  if (loading) return <div className="text-center py-20 text-[var(--color-text-secondary)]">Loading members...</div>

  return (
    <div className="space-y-6 animate-in fade-in duration-500">

      {/* TABS */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-full bg-[var(--color-bg-card)] p-1 border border-[var(--color-border-soft)]">
          <button
            onClick={() => setActiveTab("alumni")}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${activeTab === "alumni"
              ? "bg-gradient-to-r from-[var(--color-accent-indigo)] to-[var(--color-accent-purple)] text-white shadow-md"
              : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              }`}
          >
            Alumni
          </button>
          <button
            onClick={() => setActiveTab("student")}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${activeTab === "student"
              ? "bg-gradient-to-r from-[var(--color-accent-indigo)] to-[var(--color-accent-purple)] text-white shadow-md"
              : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              }`}
          >
            Students
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {filteredMembers.map((member) => (
          <div key={member.user_id || member.email} className="perspective h-[320px] sm:h-[340px]">

            <div className="flip-card glow-card relative h-full w-full rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] shadow-md">

              {/* FRONT SIDE */}
              <div className="flip-front absolute inset-0 flex flex-col items-center justify-between rounded-2xl p-8">

                {/* Big Avatar */}
                <div className="mt-4 sm:mt-6 h-28 w-28 sm:h-36 sm:w-36 rounded-full bg-gradient-to-tr from-[var(--color-accent-indigo)] to-[var(--color-accent-purple)] p-1">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-[var(--color-bg-main)] text-3xl sm:text-4xl font-bold text-[var(--color-accent-indigo)]">
                    {(member.first_name || member.email || "?").charAt(0).toUpperCase()}
                  </div>
                </div>

                {/* Name Bottom with Subtle Glow */}
                <p className="text-base sm:text-lg font-semibold tracking-wide text-[var(--color-text-primary)]">
                  {member.first_name} {member.last_name}
                </p>
                <p className="text-sm text-[var(--color-text-secondary)]">{member.role}</p>

              </div>

              {/* BACK SIDE */}
              <div className="flip-back absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-[var(--color-bg-main)] p-4 sm:p-8 text-center">

                <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
                  {member.first_name} {member.last_name}
                </h2>

                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                  {member.company || "No Company"}
                </p>

                {/* Skills */}
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {member.skill_names && member.skill_names.slice(0, 5).map((skill, idx) => (
                    <span key={idx} className="rounded-full bg-[var(--color-accent-indigo)]/10 px-2 py-1 text-xs text-[var(--color-accent-indigo)]">
                      {skill}
                    </span>
                  ))}
                </div>


                {/* ACTION BUTTONS */}
                {isAuthenticated && (
                  <div className="mt-auto mb-4 w-full">
                    <button
                      onClick={() => handleConnect(member.user_id)}
                      className="w-full rounded-full bg-gradient-to-r from-[var(--color-accent-indigo)] to-[var(--color-accent-purple)] px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-md transition hover:scale-105"
                    >
                      Connect
                    </button>
                  </div>
                )}

              </div>

            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Members
