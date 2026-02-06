import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { Button } from '../components/ui/Button.jsx'
import { Input } from '../components/ui/Input.jsx'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [role, setRole] = useState('student')
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const dropdownRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  // Check for success message from registration
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message)
      // Clear the message from location state
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location, navigate])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      await login(email, password)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      console.error('Login failed:', err)
      setError('Invalid email or password')
    } finally {
      setIsLoading(false)
    }
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
    student: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-500',
    alumni: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500',
    admin: 'bg-rose-500/10 border-rose-500/30 text-rose-500',
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 animate-in fade-in duration-500">
      <div className="w-full max-w-md rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] px-8 py-10 shadow-xl shadow-black/5">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Sign in to continue your legacy.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-500/10 px-4 py-3 text-center text-sm font-medium text-red-500 border border-red-500/20">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-6 rounded-lg bg-green-500/10 px-4 py-3 text-center text-sm font-medium text-green-500 border border-green-500/20">
            {successMessage}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              Email
            </label>
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.edu"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              Password
            </label>
            <Input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {/* Custom Role Dropdown */}
          <div className="space-y-1.5 relative" ref={dropdownRef}>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              Role
            </label>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className={`relative w-full rounded-md border border-[var(--color-border-soft)] px-3 py-2 text-sm font-medium text-left transition-all duration-200 outline-none focus:ring-2 focus:ring-[var(--color-accent-indigo)]/50 ${roleBgMap[role]} capitalize`}
            >
              {role}
              <span
                className={`absolute right-3 top-1/2 -translate-y-1/2 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              >
                ▼
              </span>
            </button>

            {isOpen && (
              <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-lg border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] shadow-lg ring-1 ring-black ring-opacity-5">
                {['student', 'alumni', 'admin'].map((item) => (
                  <div
                    key={item}
                    onClick={() => {
                      setRole(item)
                      setIsOpen(false)
                    }}
                    className={`cursor-pointer px-4 py-2.5 text-sm capitalize transition hover:bg-[var(--color-bg-hover)] ${role === item ? 'bg-[var(--color-accent-indigo)]/5 font-medium text-[var(--color-accent-indigo)]' : 'text-[var(--color-text-primary)]'}`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="inline-flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-[var(--color-border-soft)] bg-[var(--color-bg-main)] text-[var(--color-accent-indigo)] focus:ring-[var(--color-accent-indigo)] transition-all cursor-pointer"
              />
              <span className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">Remember me</span>
            </label>

            <button
              type="button"
              className="font-medium text-[var(--color-accent-indigo)] hover:text-[var(--color-accent-purple)] transition-colors"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full text-base shadow-lg shadow-indigo-500/20"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-[var(--color-text-secondary)]">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-semibold text-[var(--color-accent-indigo)] hover:text-[var(--color-accent-purple)] transition-colors hover:underline"
              >
                Register now
              </Link>
            </p>
          </div>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[var(--color-border-soft)]"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-[var(--color-bg-card)] px-2 text-[var(--color-text-muted)]">Or continue with</span>
          </div>
        </div>

        {/* LinkedIn Button */}
        <button
          type="button"
          className="relative flex w-full items-center justify-center rounded-full bg-[#0a66c2] hover:bg-[#004182] px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200"
        >
          <span className="absolute left-4 flex items-center">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </span>
          LinkedIn
        </button>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link
            to="/public/home"
            className="text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
