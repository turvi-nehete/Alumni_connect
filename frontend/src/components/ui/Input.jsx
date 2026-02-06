import React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
    return twMerge(clsx(inputs))
}

const Input = React.forwardRef(({ className, type, error, ...props }, ref) => {
    return (
        <div className="w-full">
            <input
                type={type}
                className={cn(
                    'flex h-10 w-full rounded-md border border-[var(--color-border-soft)] bg-[var(--color-bg-main)] px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-indigo)]/50 focus:border-[var(--color-accent-indigo)] disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
                    error && 'border-red-500 focus:ring-red-500/50 focus:border-red-500',
                    className
                )}
                ref={ref}
                {...props}
            />
            {error && (
                <p className="mt-1 text-xs text-red-500 font-medium animate-in slide-in-from-top-1">
                    {error}
                </p>
            )}
        </div>
    )
})

Input.displayName = 'Input'

export { Input }
