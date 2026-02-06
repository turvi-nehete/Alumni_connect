import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { NotificationProvider } from './context/NotificationContext.jsx'

const themeStorageKey = 'alumni_connect_theme'

function initializeTheme() {
  if (typeof window === 'undefined') return
  const stored = window.localStorage.getItem(themeStorageKey)
  const theme = stored === 'light' || stored === 'dark' ? stored : 'dark'
  const root = document.documentElement
  if (theme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
  window.localStorage.setItem(themeStorageKey, theme)
}

initializeTheme()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
