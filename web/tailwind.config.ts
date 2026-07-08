import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Open Sans"',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],
      },
      colors: {
        blue: {
          base: '#2C46B1',
          dark: '#2C4091',
        },
        gray: {
          100: '#F9F9FB',
          200: '#E4E6EC',
          300: '#CDCFD5',
          400: '#74798B',
          500: '#4D505C',
          600: '#1F2025',
        },
        danger: '#B12C4D',
      },
      keyframes: {
        'loading-bar': {
          '0%': { left: '-33%' },
          '100%': { left: '100%' },
        },
        'toast-in': {
          '0%': { opacity: '0', transform: 'translateY(0.5rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'loading-bar': 'loading-bar 1s ease-in-out infinite',
        'toast-in': 'toast-in 0.2s ease-out',
      },
    },
  },
  plugins: [],
} satisfies Config
