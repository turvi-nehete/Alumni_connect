import { cva } from 'class-variance-authority'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import React from 'react'

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
    {
        variants: {
            variant: {
                primary:
                    'bg-gradient-to-r from-[var(--color-accent-indigo)] to-[var(--color-accent-purple)] text-white shadow-lg hover:shadow-xl hover:scale-[1.02] focus:ring-[var(--color-accent-indigo)]',
                secondary:
                    'bg-[var(--color-bg-card)] text-[var(--color-text-primary)] border border-[var(--color-border-soft)] hover:bg-[var(--color-bg-hover)] focus:ring-[var(--color-border-soft)]',
                ghost:
                    'bg-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)]',
                outline:
                    'bg-transparent border border-[var(--color-accent-indigo)] text-[var(--color-accent-indigo)] hover:bg-[var(--color-accent-indigo)] hover:text-white',
                danger:
                    'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
            },
            size: {
                sm: 'h-8 px-3 text-xs',
                md: 'h-10 px-4 py-2',
                lg: 'h-12 px-6 text-base',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
    // Utility for merging tailwind classes safely
    function cn(...inputs) {
        return twMerge(clsx(inputs))
    }

    return (
        <button
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
        />
    )
})

Button.displayName = 'Button'

export { Button, buttonVariants }
