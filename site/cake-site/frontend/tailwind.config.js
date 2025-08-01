/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        roseCustom: '#F48CBA',
        blueCustom: '#8ACDD7',
        cardColor: '#FFF7EE'
      }
    },
  },
  plugins: [],
}

