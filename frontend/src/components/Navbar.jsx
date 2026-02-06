import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import logo from '../assets/logo.jpg'
import { Button } from './ui/Button.jsx'

const themeStorageKey = 'alumni_connect_theme'

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
    setIsMobileMenuOpen(false)
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
    { to: '/jobs', label: 'Jobs' },
    { to: '/events', label: 'Events' },
    { to: '/members', label: 'Members' },
    { to: '/messaging', label: 'Messaging' },
    { to: '/analytics', label: 'Analytics' },
    { to: '/dashboard/donations', label: 'Donations' },
    { to: '/notifications', label: 'Notifications' },
  ]

  const links = isAuthenticated ? privateLinks : publicLinks

  const navLinkClasses = ({ isActive }) =>
    `px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${isActive
      ? 'text-[var(--color-accent-indigo)] bg-[var(--color-accent-indigo)]/10'
      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)]'
    }`

  const mobileNavLinkClasses = ({ isActive }) =>
    `block px-4 py-3 text-base font-medium transition-colors duration-200 rounded-md ${isActive
      ? 'text-[var(--color-accent-indigo)] bg-[var(--color-accent-indigo)]/10'
      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)]'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border-soft)] bg-[var(--color-bg-main)]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LOGO AREA */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="UniCircle Logo"
              className="h-10 w-auto object-contain"
            />
            <span className="hidden text-xl font-bold tracking-tight text-[var(--color-text-primary)] sm:block">
              UniCircle
            </span>
          </Link>
        </div>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.slice(0, 5).map((link) => (
            <NavLink key={link.to} to={link.to} className={navLinkClasses}>
              {link.label}
            </NavLink>
          ))}
          {links.length > 5 && (
            <div className="relative group">
              <button className="px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">
                More ▾
              </button>
              <div className="absolute right-0 mt-0 w-48 origin-top-right rounded-md border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden group-hover:block">
                {links.slice(5).map((link) => (
                  <NavLink key={link.to} to={link.to} className={({ isActive }) => `block px-4 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)] ${isActive ? 'text-[var(--color-accent-indigo)]' : ''}`}>
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleTheme}
            aria-label="Toggle Theme"
            className="rounded-full"
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </Button>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex md:items-center md:gap-3">
            {!isAuthenticated ? (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    Register
                  </Button>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
                <Link to="/profile">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-[var(--color-accent-indigo)] to-[var(--color-accent-purple)] text-white shadow-md transition hover:scale-105">
                    <span className="text-sm font-bold">U</span>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--color-accent-indigo)] md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {isMobileMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={mobileNavLinkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          <div className="border-t border-[var(--color-border-soft)] pb-4 pt-4">
            {!isAuthenticated ? (
              <div className="flex flex-col gap-2 px-4">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full justify-center">
                    Register
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="px-4">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-[var(--color-accent-indigo)] to-[var(--color-accent-purple)] text-white">
                    <span className="text-sm font-bold">U</span>
                  </div>
                  <div>
                    <div className="text-base font-medium text-[var(--color-text-primary)]">
                      User
                    </div>
                    <div className="text-sm font-medium text-[var(--color-text-secondary)]">
                      user@example.com
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
