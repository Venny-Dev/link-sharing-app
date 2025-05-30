/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Instrument Sans', 'sans-serif']
      }
    }
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none'
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          display: 'none'
        },
        '.scrollbar-thin': {
          'scrollbar-width': 'thin'
        },
        '.scrollbar-thin::-webkit-scrollbar': {
          width: '8px'
        },
        '.scrollbar-thumb': {
          'scrollbar-color': '#888 #f1f1f1'
        },
        '.scrollbar-thumb::-webkit-scrollbar-thumb': {
          backgroundColor: '#888',
          borderRadius: '4px'
        },
        '.scrollbar-thumb:hover::-webkit-scrollbar-thumb': {
          backgroundColor: '#555'
        }
      }

      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ]
}
