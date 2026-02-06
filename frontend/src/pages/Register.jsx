import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { Button } from '../components/ui/Button.jsx'
import { Input } from '../components/ui/Input.jsx'

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: 'student'
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { register } = useAuth()

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    // Transform to snake_case for backend
    const payload = {
      email: formData.email,
      password: formData.password,
      first_name: formData.firstName,
      last_name: formData.lastName,
      role: formData.role
    }

    setIsLoading(true)
    try {
      await register(payload)
      // Redirect to login page since registration doesn't auto-login
      navigate('/login', { replace: true, state: { message: 'Registration successful! Please log in.' } })
    } catch (err) {
      console.error('Registration error:', err)

      // Handle various error formats
      let errorMessage = 'Registration failed. Please try again.'

      if (err.response) {
        // Server responded with a status code
        const data = err.response.data
        const status = err.response.status

        console.log('Error Data:', data) // For debugging
        console.log('Error Status:', status)

        if (typeof data === 'string') {
          // If HTML or text response (e.g. 500 or 404)
          errorMessage = `Server Error (${status}): ${data.slice(0, 100)}...`
        } else if (data && typeof data === 'object') {
          // DRF Field errors
          if (data.detail) {
            errorMessage = data.detail
          } else if (data.message) {
            errorMessage = data.message
          } else {
            // Join all field errors
            const messages = Object.entries(data).map(([key, value]) => {
              const msgs = Array.isArray(value) ? value.join(' ') : String(value)
              return `${key}: ${msgs}`
            })
            errorMessage = messages.join(' | ')
          }
        } else {
          errorMessage = `Request failed with status ${status}`
        }
      } else if (err.request) {
        // Request made but no response received
        errorMessage = 'Network Error: No response from server. Check your connection.'
      } else {
        // Something else happened
        errorMessage = err.message
      }

      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-[85vh] items-center justify-center px-4 animate-in fade-in duration-500 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] px-8 py-10 shadow-xl shadow-black/5">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
            Create an Account
          </h1>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Join the alumni network today.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-500/10 px-4 py-3 text-center text-sm font-medium text-red-500 border border-red-500/20 break-words">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
                First Name
              </label>
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="John"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
                Last Name
              </label>
              <Input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              Email
            </label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="john@university.edu"
              autoComplete="email"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
                Password
              </label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
                Confirm Password
              </label>
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full h-10 rounded-md border border-[var(--color-border-soft)] bg-[var(--color-bg-main)] px-3 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-indigo)]/50 focus:border-[var(--color-accent-indigo)] transition-all"
            >
              <option value="student">Student</option>
              <option value="alumni">Alumni</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <Button
            type="submit"
            className="w-full text-base shadow-lg shadow-indigo-500/20"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Register'}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-[var(--color-text-secondary)]">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-[var(--color-accent-indigo)] hover:text-[var(--color-accent-purple)] transition-colors hover:underline">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register

