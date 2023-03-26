/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{html,js}',
    './pages/**/*.{html,js}',
    './index.html',
  ],
  theme: {
    extend: {
      colors: {
        'fg-buff': '#EBAD87',
        'fg-powder': '#FDFAF6',
        'fg-gunmetal': '#282D39',
        'fg-green': '#90FE01',
        'fg-blue': '#66FFFF'
        
      },
      fontFamily: {
        grotesk: 'Hanken Grotesk',
        montserrat: 'Montserrat',
        silk: 'Silkscreen'
      }
    },
  },
  plugins: [],
}