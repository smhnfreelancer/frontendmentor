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
        Tomato: 'hsl(4, 100%, 67%)',
        DarkSlateGrey: 'hsl(234, 29%, 20%)',
        CharcoalGrey: 'hsl(235, 18%, 26%)',
        Grey: 'hsl(231, 7%, 60%)',
        White: 'hsl(0, 0%, 100%)',
        Grey25: 'hsla(243, 28%, 13%, 0.25)',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
