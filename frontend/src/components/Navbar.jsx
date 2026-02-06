import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import logo from '../assets/logo.jpg'

const themeStorageKey = 'alumni_connect_theme'

const baseNavLinkClasses =
  'px-5 py-2.5 text-lg font-medium transition-colors duration-200'



  function getNavLinkClasses(isActive) {
    if (isActive) {
      return (
        baseNavLinkClasses +
        ' text-[var(--color-accent-indigo)]'
      )
    }
  
    return (
      baseNavLinkClasses +
      ' text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
    )
  }
  

function applyThemeToDocument(nextTheme) {
  if (typeof window === 'undefined') return
  const root = document.documentElement

  if (nextTheme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }

  window.localStorage.setItem(themeStorageKey, nextTheme)
}

function Navbar() {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = window.localStorage.getItem(themeStorageKey)
    const initialTheme =
      stored === 'light' || stored === 'dark' ? stored : 'dark'
    setTheme(initialTheme)
    applyThemeToDocument(initialTheme)
  }, [])

  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    applyThemeToDocument(nextTheme)
  }

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const publicLinks = [
    { to: '/public/home', label: 'Home' },
    { to: '/public/about', label: 'About' },
    { to: '/public/events', label: 'Events' },
    { to: '/public/members', label: 'Members' },
    { to: '/public/donations', label: 'Donations' },
    { to: '/public/gallery', label: 'Gallery' },
  ]

  const privateLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/directory', label: 'Directory' },
    { to: '/jobs', label: 'Jobs' },
    { to: '/events', label: 'Events' },
    { to: '/mentorship', label: 'Mentorship' },
    { to: '/messaging', label: 'Messaging' },
    { to: '/dashboard/donations', label: 'Donations' },
    { to: '/notifications', label: 'Notifications' },
  ]

  const links = isAuthenticated ? privateLinks : publicLinks

  return (
    <header className="border-b border-[var(--color-border-soft)] bg-[var(--color-bg-main)]/80 backdrop-blur">
      <div className="flex w-full items-center justify-between px-20 py-6">


        {/* LEFT SECTION */}
        <div className="flex items-center gap-5">
          <img
            src={logo}
            alt="UniCircle Logo"
            className="h-14 w-auto object-contain"
          />
          <p className="text-lg font-semibold text-[var(--color-text-primary)]">
            UniCircle
          </p>
        </div>

        {/* CENTER NAV LINKS */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => getNavLinkClasses(isActive)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={handleToggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
          >
            <span className="text-lg leading-none">
              {theme === 'dark' ? '🌙' : '☀️'}
            </span>
          </button>

          {!isAuthenticated ? (
            <Link
              to="/login"
              className="hidden rounded-full bg-gradient-to-r from-[var(--color-accent-indigo)] to-[var(--color-accent-purple)] px-6 py-2 text-base font-semibold text-white shadow-[0_0_22px_rgba(99,102,241,0.7)] transition hover:shadow-[0_0_30px_rgba(124,58,237,0.8)] md:inline-flex"
            >
              Login
            </Link>
          ) : (
            <button
              type="button"
              onClick={handleLogout}
              className="hidden rounded-full border border-[var(--color-border-soft)] px-6 py-2 text-base font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-card)] md:inline-flex"
            >
              Logout
            </button>
          )}
        </div>

      </div>
    </header>
  )
}

export default Navbar
