/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  theme: {
    screens: {
      sm: '375px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        VeryDarkGrayishBlue: 'hsl(217, 19%, 35%)',
        DesaturatedDarkBlue: 'hsl(214, 17%, 51%)',
        GrayishBlue: 'hsl(212, 23%, 69%)',
        LightGrayishBlue: 'hsl(210, 46%, 95%)',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
