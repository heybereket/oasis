module.exports = {
  mode: 'jit',
  darkMode: 'class',
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './src/**/*.{tsx,jsx,js,ts}',
      '../ui/**/*.{tsx,jsx,js,ts}',
      '../parser/**/*.{tsx,jsx,js,ts}',
      '../mobile/**/*.{tsx,jsx,js,ts}',
    ],
  },
  theme: {
    flexShrink: {
      0: 0,
    },

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
    screens: {
      'sm-50': '350px',
      // 0px to 640px (mobile design with bottom bar)
      md: '641px',
      // 641px to 1048px (desktop design with compact elements)
      'md-50': '806px',
      // extra breakpoint for expandable search bar/other things.
      lg: '1049px',
      // 897px to 1280px (full desktop design)
      xl: '1281px',
      // 1281px and over (max-width the webpage content to 1280px with container and center it)
      '2xl': '1500px',
    },
    extend: {
      minHeight: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
      maxWidth: {
        580: '580px',
        530: '530px',
        200: '200px',
        nav: '112rem',
      },
      backgroundColor: {
        resortSecondary: '#141923',
      },
      textColor: {
        secondary: '#828282',
      },
      gridTemplateColumns: {
        'three-new': '280px 1fr 280px',
        two: '370px 500px',
        three: '370px 570px 470px',
      },
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0px)',
          },
        },
        'fade-out-up': {
          from: {
            opacity: '1',
            transform: 'translateY(0px)',
          },
          to: {
            opacity: '0',
            visibility: 'hidden',
            transform: 'translateY(-10px)',
          },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.2s ease-out',
        'fade-out-up': 'fade-out-up 0.2s ease-out',
      },
      colors: {
        gray: {
          100: 'var(--color-gray-100)',
          200: 'var(--color-gray-200)',
          300: 'var(--color-gray-300)',
          400: 'var(--color-gray-400)',
          500: 'var(--color-gray-500)',
          600: 'var(--color-gray-600)',
          700: 'var(--color-gray-700)',
          800: 'var(--color-gray-800)',
          900: 'var(--color-gray-900)',
          light: '#0C111B',
          dark: '#141923',
          '2dark': '#202225',
          text: '#BDBDBD',
          bg: '#232936',
        },
        primary: {
          DEFAULT: 'var(--color-primary)',
          light: 'var(--color-primary-light)',
          lighter: 'var(--color-primary-lighter)',
        },
        light: 'var(--color-text-light)',
        dim: 'rgba(0,0,0,0.6)',
        'home-bg': '#2F343F',
        'home-sides': '#232831',
      },
    },
  },
  plugins: [require('tailwind-scrollbar'), require('@tailwindcss/typography')],
};
