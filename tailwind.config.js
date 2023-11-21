module.exports = {
  darkMode: 'false',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Roboto'],
      heading: ['Roboto'],
    },
    container:{
      screens: {
        sm: '360px',
        xl: '1180px',
      },
    },
    borderRadius: {
      'none': '0',
      'micro': '0.312rem',
      'soft': '0.625rem',
      'normal': '0.937rem',
      'full': '9999px',
    },
    extend: {
      rotate: {
        4.5: '4.5deg',
      },
      gap: {
        '10': '0.625rem',
        '15': '0.937rem',
      },
      inset: { 15: '3.75rem' },
      padding: {
        5: '0.32rem',
        8: '0.5rem',
        10: '0.625rem',
        15: '0.937rem',
        20: '1.25rem',
        25: '1.56rem',
        30: '1.875rem',
        35: '2.1875rem'
      },
      margin: {
        5: '0.32rem',
        10: '0.625rem',
        20: '1.25rem',
      },
      lineHeight: {
        7.5: '1.875rem',
        13: '3.2rem',
      },
      backgroundImage: {
        'body-mask': "url('/img/backgrounds/mask.svg')",
        'body-mask-2': "url('/img/backgrounds/mask2.png')",
        'footer-mask': "url('/img/backgrounds/footer.svg')",
        'foreground-mask': "url('/img/backgrounds/mask-foreground.svg')",
        'cover-1': "url('/img/videos/video1-cover.jpg')",
        'cover-2': "url('/img/videos/video2-cover.jpg')",
      },
      fontSize: {
        'xs': '0.75rem',
        'lxs': '0.875rem',
        'sm': '1rem',
        'md': '1.125rem',
        'lg': '1.375rem',
        'xl': '1.75rem',
        '5xl': '3.5rem',
      },
      height: {
        21: '5.25rem',
      },
      colors: {
        baseBackground: '#070917',
        baseForeground: '#FDFDFD',
        error: '#F40000',

        primary: {
          500: '#010101',
          600: '#1c3cf1',
        },
        secondary: {
          200: '#D6EAFF',
          500: '#469BF5',
          600: '#3b83d0',
        },
        neutral: {
          100: '#E9E9E9',
          200: '#B8B8B8',
          300: '#F2F2F2',
          400: '#727272',
          500: '#161C38',
          700: '#0F142E',
          800: '#A2A2A2',
        },
      },
      keyframes: {
        ['mount']: {
          '0%': {
            opacity: 0,
            transform: 'translateY(50%)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        ['mount']: 'mount 0.4s linear',
      },
      boxShadow: {
        inner: 'inset 0 0 0 1000px rgba(0,0,0,.15)',
      },
    },
    plugins: [require('@tailwindcss/aspect-ratio')],
  },
}
