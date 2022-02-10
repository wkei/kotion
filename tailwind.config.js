module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        FSC: ['Fira Sans Condensed', 'sans-serif'],
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          '@apply px-8 mx-auto': {},
          maxWidth: '42rem',
        },
      })
    },
    require('@tailwindcss/typography'),
  ],
}
