import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
    return twMerge(clsx(inputs))
}

export function Card({ className, children, ...props }) {
    return (
        <div
            className={cn(
                'rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] shadow-md transition-all duration-200 hover:shadow-lg',
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}

export function CardHeader({ className, children, ...props }) {
    return (
        <div
            className={cn('flex flex-col space-y-1.5 p-6', className)}
            {...props}
        >
            {children}
        </div>
    )
}

export function CardTitle({ className, children, ...props }) {
    return (
        <h3
            className={cn(
                'text-2xl font-semibold leading-none tracking-tight text-[var(--color-text-primary)]',
                className
            )}
            {...props}
        >
            {children}
        </h3>
    )
}

export function CardContent({ className, children, ...props }) {
    return (
        <div className={cn('p-6 pt-0', className)} {...props}>
            {children}
        </div>
    )
}

export function CardFooter({ className, children, ...props }) {
    return (
        <div
            className={cn('flex items-center p-6 pt-0', className)}
            {...props}
        >
            {children}
        </div>
    )
}
