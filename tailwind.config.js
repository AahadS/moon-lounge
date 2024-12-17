/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lounge': {
          'purple': '#4B2BBA',  // Bright purple color from the image
          'purple-dark': '#2D1B69',  // Darker variant
          'black': '#0A0A0A',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
} 