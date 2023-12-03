module.exports = {
  darkMode: 'false',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
    },
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
        12: '0.75rem',
        15: '0.937rem',
        16: '1rem',
        18: '1.125rem',
        20: '1.25rem',
        25: '1.56rem',
        30: '1.875rem',
        35: '2.1875rem',
        50: '3.125rem',
      },
      margin: {
        5: '0.32rem',
        10: '0.625rem',
        15: '0.937rem',
        20: '1.25rem',
        25: '1.56rem',        
        50: '3.125rem',
        60: '3.75rem',

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
        '11': '0.6875rem',
        '12': '0.75rem',
        '14': '0.875rem',
        '16': '1rem',
        '18': '1.125rem',
        '20': '1.25rem',
        '22': '1.375rem',
        '28': '1.75rem',
        '45': '2.8125rem',
        '56': '3.5rem',
      },
      height: {
        21: '5.25rem',
      },
      colors: {
        white: '#FFFFFF',
        baseBackground: '#070917',
        baseForeground: '#FDFDFD',
        surfacesBackground: '#F9F9F9',
        surfacesTooltip: '#F6F6F6',
        hoverBackground: '#E9F3FF',
        hoverIcon: '#2284ED',
        error: '#F40000',
        success:'#06C270',
        backgroundSuccess:'#BDECD7',
        running:'#5BABFF',
        backgroundRunning:'#C8E2FF',
        failed: "#FF3B3B",
        backgroundFailed: '#FFD7D7',

        primary: {
          500: '#010101',
          600: '#1c3cf1',
        },
        secondary: {
          200: '#D6EAFF',
          500: '#469BF5',
          600: '#3b83d0',
          700: '#242D5B',
        },
        neutral: {
          100: '#E9E9E9',
          200: '#B8B8B8',
          300: '#F2F2F2',
          400: '#727272',
          500: '#161C38',
          700: '#0F142E',
          800: '#A2A2A2',
          900: '#EEEEEE',
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
