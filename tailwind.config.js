module.exports = {
  mode: 'jit',
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './modules/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        dark: '#1d1f21',
        'dark-secondary': '#222428',
        'dark-tertiary': '#2c3035',
        'dark-lighter': 'rgba(105, 100, 119, 0.175)',
        'dark-text': '#f9f8ff',
        'dark-link': '#8ad6f1',
      },
      boxShadow: {
        outline: '0 0 0.5pt 0.5pt white',
      },
      maxWidth: {
        '3/4': '75%',
      },
      screens: {
        '3xl': '1792px',
      },
      spacing: {
        128: '32rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
