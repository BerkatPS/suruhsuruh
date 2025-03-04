/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Tidak diperlukan karena kita hanya menggunakan dark mode
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#fa8029',
          dark: '#e06717',
          light: '#ffa45c',
        },
        secondary: {
          DEFAULT: '#1f212f',
          dark: '#151621',
          light: '#2c2f43',
        },
        dark: {
          bg: '#121212', // Background utama
          card: '#1e1e1e', // Background kartu/komponen
          border: '#2a2a2a', // Border components
          text: '#e0e0e0', // Teks utama
          textSecondary: '#9e9e9e', // Teks sekunder
        },
        lightGray: '#1e1e24', // Untuk area yang membutuhkan sedikit kontras
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
        'button': '0 4px 6px -1px rgba(250, 128, 41, 0.3)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-delay-1': 'fadeIn 0.5s ease-in-out 0.2s forwards',
        'fade-in-delay-2': 'fadeIn 0.5s ease-in-out 0.4s forwards',
        'fade-in-delay-3': 'fadeIn 0.5s ease-in-out 0.6s forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        }
      },
    },
  },
  plugins: [],
}