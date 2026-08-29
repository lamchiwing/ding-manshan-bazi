/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#2B2D2F",
        ivory: "#F4EFEA",
        deepblue: "#1E3A5F",
        amber: "#D97706",
        secondary: "#A4B3C6",
      },
      fontFamily: {
        serif: ['"Noto Serif TC"', '"Cormorant Garamond"', '"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"Noto Sans TC"', 'Inter', 'Manrope', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.45s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
