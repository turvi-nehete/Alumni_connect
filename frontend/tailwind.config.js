/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          main: 'var(--color-bg-main)',
          card: 'var(--color-bg-card)',
          hover: 'var(--color-bg-hover)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
        },
        border: {
          soft: 'var(--color-border-soft)',
        },
        accent: {
          indigo: 'var(--color-accent-indigo)',
          purple: 'var(--color-accent-purple)',
        },
      },
    },
  },
}

