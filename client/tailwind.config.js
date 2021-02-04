module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: { min: '300px', max: '475px' },
    },
    extend: {
      colors: {
        primary: {
          100: '#6d3d6d',
          200: '#3c1f3c',
        },
        secondary: {
          100: '#333',
          200: '#000',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
