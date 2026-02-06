import { useEffect } from "react"

export function Toast({ notification, onDismiss }) {
    const { id, type, message, duration = 5000 } = notification

    useEffect(() => {
        const timer = setTimeout(() => {
            onDismiss(id)
        }, duration)
        return () => clearTimeout(timer)
    }, [id, duration, onDismiss])

    const bgColors = {
        success: "bg-emerald-500",
        error: "bg-rose-500",
        info: "bg-[var(--color-accent-indigo)]",
        warning: "bg-yellow-500",
    }

    const icons = {
        success: "✓",
        error: "✕",
        info: "ℹ",
        warning: "⚠",
    }

    return (
        <div className={`pointer-events-auto flex w-full max-w-sm overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-300 animate-in slide-in-from-top-2 fade-in ${bgColors[type] || bgColors.info}`}>
            <div className="p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white font-bold text-sm">
                            {icons[type] || icons.info}
                        </span>
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                        <p className="text-sm font-medium text-white">{message}</p>
                    </div>
                    <div className="ml-4 flex flex-shrink-0">
                        <button
                            type="button"
                            className="inline-flex rounded-md text-white hover:text-white/80 focus:outline-none focus:ring-2 focus:ring-white"
                            onClick={() => onDismiss(id)}
                        >
                            <span className="sr-only">Close</span>
                            <span className="text-lg">×</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function ToastContainer({ notifications, onDismiss }) {
    return (
        <div
            aria-live="assertive"
            className="pointer-events-none fixed inset-0 z-[100] flex flex-col items-center gap-4 px-4 py-6 sm:items-end sm:p-6"
        >
            {notifications.map((notification) => (
                <Toast key={notification.id} notification={notification} onDismiss={onDismiss} />
            ))}
        </div>
    )
}
