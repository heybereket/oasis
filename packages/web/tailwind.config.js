module.exports = {
  mode: 'jit',
  darkMode: "class",
  purge: ["./src/**/*.tsx", "./public/index.html"],
  theme: {
    fontFamily: {
      sans: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica',
        'Arial',
        'sans-serif',
      ],
    },
    colors: {
      transparent: 'transparent',
      white: 'var(--color-white)',
      gray: {
        100: 'var(--color-gray-100)',
        200: 'var(--color-gray-200)',
        300: 'var(--color-gray-300)',
        400: 'var(--color-gray-400)',
        500: 'var(--color-gray-500)',
        600: 'var(--color-gray-600)',
        700: 'var(--color-gray-700)',
        800: 'var(--color-gray-800)',
      },
      primary: {
        DEFAULT: 'var(--color-primary)',
        light: 'var(--color-primary-light)',
        lighter: 'var(--color-primary-lighter)',
      },
    },
    extend: {
      keyframes: {
        'fade-in-down': {
            '0%': {
                opacity: '0',
                transform: 'translateY(-10px)'
            },
            '100%': {
                opacity: '1',
                transform: 'translateY(0)'
            },
        },
        'fade-out-up': {
          '100%': {
              opacity: '0',
              visibility: 'hidden',
              transform: 'translateY(-10px)'
          },
          '0%': {
              opacity: '1',
              transform: 'translateY(0)'
          },
      },
        
        
    },
    animation: {
        'fade-in-down': 'fade-in-down 0.1s ease-out',
        'fade-out-up': 'fade-out-up 0.1s ease-out'
    }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
