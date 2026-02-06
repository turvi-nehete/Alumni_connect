import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = (event) => {
    event.preventDefault()
    // Mock auth: mark as authenticated and redirect
    login()
    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] px-8 py-8 shadow-xl shadow-[rgba(15,23,42,0.75)]">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-[var(--color-text-primary)]">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Sign in to continue your legacy.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-xs font-medium uppercase tracking-wide text-[var(--color-text-secondary)]"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-[var(--color-border-soft)] bg-[#020617]/40 px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none ring-0 transition focus:border-[var(--color-accent-indigo)] focus:ring-2 focus:ring-[var(--color-accent-indigo)]/60"
              placeholder="you@example.edu"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block text-xs font-medium uppercase tracking-wide text-[var(--color-text-secondary)]"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-[var(--color-border-soft)] bg-[#020617]/40 px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none ring-0 transition focus:border-[var(--color-accent-indigo)] focus:ring-2 focus:ring-[var(--color-accent-indigo)]/60"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary)]">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
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

          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-gradient-to-r from-[var(--color-accent-indigo)] to-[var(--color-accent-purple)] px-4 py-2 text-sm font-semibold text-white shadow-[0_0_28px_rgba(99,102,241,0.75)] transition hover:shadow-[0_0_36px_rgba(124,58,237,0.9)]"
          >
            Login
          </button>
        </form>

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

