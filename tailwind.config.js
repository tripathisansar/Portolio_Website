/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#05070d',
          900: '#0a0e1a',
          800: '#0f1424',
          700: '#161d33',
          600: '#1f2740',
        },
        frost: {
          50: '#f5f7fb',
          100: '#e7ecf5',
          200: '#c6d0e3',
          300: '#94a3c0',
          400: '#6b7896',
        },
        glacier: {
          400: '#5b8fcf',
          500: '#3d6fb5',
          600: '#2c548f',
        },
      },
      fontFamily: {
        display: ['"Inter Tight"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        fraunces: ['Fraunces', 'Georgia', 'serif'],
        geist: ['Geist', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        widest2: '0.24em',
      },
      animation: {
        'fade-up': 'fadeUp 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
