import { Navigate, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import Profile from './pages/Profile.jsx'

import { useAuth } from './context/AuthContext.jsx'
import AuthGuard from './components/AuthGuard.jsx'
import Navbar from './components/Navbar.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Home from './pages/Home.jsx'
import LoginPage from './pages/Login.jsx'
import About from './pages/About.jsx'
import Events from './pages/Events.jsx'
import Members from './pages/Members.jsx'
import Register from './pages/Register.jsx'
import EventDetails from './pages/EventDetails.jsx'

// ... existing imports ...

import Jobs from './pages/Jobs.jsx'
import Directory from './pages/Directory.jsx'
import Mentorship from './pages/Mentorship.jsx'
import Donations from './pages/Donations.jsx'
import Messaging from './pages/Messaging.jsx'
import Gallery from './pages/Gallery.jsx'
import Notifications from './pages/Notifications.jsx'
import Analytics from './pages/Analytics.jsx'
import AlumniSpotlight from './pages/AlumniSpotlight.jsx'

// Public Pages
import PublicEvents from './pages/public/PublicEvents.jsx'
import PublicMembers from './pages/public/PublicMembers.jsx'
import PublicDonations from './pages/public/PublicDonations.jsx'
import PublicGallery from './pages/public/PublicGallery.jsx'

function App() {
  const { isAuthenticated } = useAuth()
  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`)
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])


  return (
    <div className="relative min-h-screen bg-[var(--color-bg-main)] text-[var(--color-text-primary)] overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 transition duration-300"
        style={{
          background: `
  radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(124,58,237,0.12), transparent 50%),
  radial-gradient(1200px circle at var(--mouse-x) var(--mouse-y), rgba(99,102,241,0.08), transparent 60%)
`,

        }}
      />

      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-6">
        <Routes>
          {/* Redirect root to public home */}
          <Route
            path="/"
            element={<Navigate to="/public/home" replace />}
          />
          <Route path="/members" element={<Members />} />
          <Route element={<AuthGuard />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Public routes */}
          <Route path="/public/home" element={<Home />} />
          <Route path="/public/about" element={<About />} />
          <Route path="/public/events" element={<PublicEvents />} />
          <Route path="/public/members" element={<PublicMembers />} />
          <Route path="/public/donations" element={<PublicDonations />} />
          <Route path="/public/gallery" element={<PublicGallery />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />

          {/* Private routes */}
          <Route element={<AuthGuard />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/directory" element={<Directory />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:eventId" element={<EventDetails />} />
            <Route path="/mentorship" element={<Mentorship />} />
            <Route path="/messaging" element={<Messaging />} />
            <Route path="/dashboard/donations" element={<Donations />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/alumni-spotlight" element={<AlumniSpotlight />} />
            <Route path="/notifications" element={<Notifications />} />
          </Route>

          {/* Fallback */}
          <Route
            path="*"
            element={
              <Navigate
                to={isAuthenticated ? '/dashboard' : '/public/home'}
                replace
              />
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
