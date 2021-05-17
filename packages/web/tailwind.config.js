module.exports = {
  darkMode: 'class',
  purge: [

  ],
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
    },
    extend: {
      spacing:{
        rs: '150px',
        rsw: '500px'
      },
      minHeight:{
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        '9/10': '90%'
      },
      backgroundColor:{
        resortSecondary: "#141923"
      },
        textColor: {
      secondary: "#828282"
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
        },
        primary: {
          DEFAULT: 'var(--color-primary)',
          light: 'var(--color-primary-light)',
          lighter: 'var(--color-primary-lighter)',
        },
      },
    },
  },
  plugins: [],
};
