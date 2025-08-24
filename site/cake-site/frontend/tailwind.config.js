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
        darkRoseCustom: '#ca1969ff',
        blueCustom: '#8ACDD7',
        darkBlueCustom: '#1e717eff',
        cardColor: '#FFF7EE'
      }
    },
  },
  plugins: [],
}

