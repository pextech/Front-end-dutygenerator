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
          100: '#2F3136',
          200: '#37393F',
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
};
