import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import authService from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const fetchUser = async () => {
    try {
      const response = await authService.getCurrentUser() // Need to add this to authService
      setUser(response)
    } catch (error) {
      console.error("Failed to fetch user", error)
    }
  }

  // Check token immediately
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('access_token'))

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('access_token')
      if (storedToken) {
        setToken(storedToken)
        setIsAuthenticated(true)
        await fetchUser()
      }
      setLoading(false)
    }
    initAuth()
  }, [])

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password)
      // authService.login usually sets localStorage, but we need to update state too
      // Assuming authService.login returns the token or we get it from storage
      const newToken = localStorage.getItem('access_token')
      setToken(newToken)
      setIsAuthenticated(true)
      await fetchUser()
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  const register = async (userData) => {
    try {
      await authService.register(userData)
      // Note: We don't auto-login here as the backend might require email verification 
      // or the user might want to login manually.
      // If auto-login is desired, we can call login() here using the credentials from userData.
    } catch (error) {
      console.error('Registration failed:', error)
      throw error
    }
  }

  const logout = () => {
    authService.logout()
    setToken(null)
    setIsAuthenticated(false)
    setUser(null)
  }

  const value = useMemo(
    () => ({
      isAuthenticated,
      user,
      token,
      loading,
      login,
      register,
      logout,
    }),
    [isAuthenticated, user, token],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}

