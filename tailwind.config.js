/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#1B4332',
          light: '#2D6A4F',
          accent: '#40916C',
          gold: '#D4AF37',
        },
        prithvi: '#C97B4A',
        jal: '#1B6B93',
        agni: '#D9822B',
        vayu: '#6FA8C9',
        akash: '#7A6C9E',
        status: {
          healthy: '#52A373',
          moderate: '#E0A02D',
          stressed: '#C4554D',
        },
        paper: '#FAF8F3',
        charcoal: '#12181A',
        surface: {
          light: '#FFFFFF',
          dark: '#1A2326',
        }
      },
      fontFamily: {
        serif: ['Fraunces', 'Source Serif 4', 'Georgia', 'serif'],
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        hindi: ['Noto Sans Devanagari', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glow-element': '0 0 20px rgba(82, 163, 115, 0.25)',
      }
    },
  },
  plugins: [],
}
