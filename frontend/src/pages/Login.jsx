import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [role, setRole] = useState('student')
  const [isOpen, setIsOpen] = useState(false)

  const dropdownRef = useRef(null)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = (event) => {
    event.preventDefault()
    login()
    navigate('/dashboard', { replace: true })
  }

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Role styling
  const roleBgMap = {
    student:
      'bg-indigo-500/20 border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.3)]',
    alumni:
      'bg-emerald-500/20 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]',
    admin:
      'bg-rose-500/20 border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.3)]',
  }

  const roleClasses = roleBgMap[role]

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] px-8 py-8 shadow-xl shadow-[rgba(15,23,42,0.75)]">

        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-[var(--color-text-primary)]">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Sign in to continue your legacy.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium uppercase tracking-wide text-[var(--color-text-secondary)]">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-border-soft)] bg-[#020617]/40 px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none transition focus:border-[var(--color-accent-indigo)] focus:ring-2 focus:ring-[var(--color-accent-indigo)]/60"
              placeholder="you@example.edu"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium uppercase tracking-wide text-[var(--color-text-secondary)]">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-border-soft)] bg-[#020617]/40 px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none transition focus:border-[var(--color-accent-indigo)] focus:ring-2 focus:ring-[var(--color-accent-indigo)]/60"
              placeholder="••••••••"
            />
          </div>

          {/* Custom Role Dropdown */}
          <div className="space-y-1.5 relative" ref={dropdownRef}>
            <label className="block text-xs font-medium uppercase tracking-wide text-[var(--color-text-secondary)]">
              Role
            </label>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className={`relative w-full rounded-lg border px-3 py-2 text-sm text-left text-[var(--color-text-primary)] transition duration-300 ${roleClasses}`}
            >
              {role.charAt(0).toUpperCase() + role.slice(1)}
              <span
                className={`absolute right-3 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              >
                ▼
              </span>
            </button>

            {isOpen && (
              <div className="absolute z-20 mt-2 w-full rounded-lg border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] shadow-xl">
                {['student', 'alumni', 'admin'].map((item) => (
                  <div
                    key={item}
                    onClick={() => {
                      setRole(item)
                      setIsOpen(false)
                    }}
                    className={`cursor-pointer px-3 py-2 text-sm capitalize transition hover:bg-white/10 ${
                      role === item ? 'bg-white/10' : ''
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary)]">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-[var(--color-border-soft)] bg-transparent text-[var(--color-accent-indigo)] focus:ring-[var(--color-accent-indigo)]"
              />
              <span>Remember me</span>
            </label>

            <button
              type="button"
              className="text-xs font-medium text-[var(--color-accent-indigo)] hover:text-[var(--color-accent-purple)]"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-gradient-to-r from-[var(--color-accent-indigo)] to-[var(--color-accent-purple)] px-4 py-2 text-sm font-semibold text-white shadow-[0_0_28px_rgba(99,102,241,0.75)] transition hover:shadow-[0_0_36px_rgba(124,58,237,0.9)]"
          >
            Login
          </button>
        </form>

        {/* LinkedIn Button */}
        <div className="mt-4">
          <button
            type="button"
            className="relative flex w-full items-center justify-center rounded-full bg-[#0a66c2] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#004182]"
          >
            <span className="absolute left-4 flex items-center">
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.22 8.25h4.56V24H.22zM8.56 8.25h4.37v2.13h.06c.61-1.16 2.1-2.38 4.33-2.38 4.63 0 5.48 3.05 5.48 7.02V24h-4.56v-7.39c0-1.76-.03-4.02-2.45-4.02-2.45 0-2.83 1.91-2.83 3.89V24H8.56z"
                />
              </svg>
            </span>
            <span>Connect With LinkedIn</span>
          </button>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center text-xs text-[var(--color-text-secondary)]">
          <span>Not ready to sign in? </span>
          <Link
            to="/public/home"
            className="font-medium text-[var(--color-accent-indigo)] hover:text-[var(--color-accent-purple)]"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
