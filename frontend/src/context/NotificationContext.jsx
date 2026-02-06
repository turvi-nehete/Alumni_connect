import { createContext, useContext, useState, useCallback } from 'react'
import { ToastContainer } from '../components/ui/Toast.jsx'

const NotificationContext = createContext(null)

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([])

    const addNotification = useCallback((type, message, duration = 5000) => {
        const id = Date.now().toString()
        setNotifications((prev) => [...prev, { id, type, message, duration }])
    }, [])

    const removeNotification = useCallback((id) => {
        setNotifications((prev) => prev.filter((notification) => notification.id !== id))
    }, [])

    return (
        <NotificationContext.Provider value={{ addNotification }}>
            {children}
            <ToastContainer notifications={notifications} onDismiss={removeNotification} />
        </NotificationContext.Provider>
    )
}

export function useNotification() {
    const context = useContext(NotificationContext)
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider')
    }
    return context
}
