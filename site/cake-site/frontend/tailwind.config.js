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
        cardColor: '#FFF7EE',
        cream: {
          DEFAULT: '#FFFBF7',
          dark: '#FFF2EB',
          deeper: '#FDEEE6',
        },
        blush: {
          DEFAULT: '#FBE9E1',
          dark: '#F5D5C8',
          muted: '#F2A89D',
        },
        cocoa: {
          DEFAULT: '#3E2A23',
          light: '#6B4A3F',
          muted: '#9C7B6E',
        },
        maroon: {
          DEFAULT: '#7C3F2E',
          dark: '#5C2E21',
          light: '#A65A44',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '1.5rem',
        cta: '1.25rem',
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(124, 63, 46, 0.25)',
        card: '0 8px 24px -10px rgba(62, 42, 35, 0.18)',
      },
    },
  },
  plugins: [],
}

