module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  safelist: ['text-success', 'bg-success', 'border-success'],
  theme: {
    fontFamily: {
      sans: ['Aileron'],
      heading: ['impactreg']
    },
    extend: {
      visibility: ['group-hover'],

      colors: {
        primary: '#00A9BB',
        secondary: '#da606c',
        background: '#ECF3F4',
        error: '#F40000',
        failed: '#F40000',
        warning: '#ef9b0f',
        success: '#0AA65B',
        neutral: {
          100: '#FFFFFF',
          300: '#D0D0D0',
          600: '#636363',
          900: '#000000'
        }
      }
    },
    plugins: []
  }
}
