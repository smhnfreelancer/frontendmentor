/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  safelist: [
    'card',
    'work-card',
    'play-card',
    'study-card',
    'exercise-card',
    'social-card',
    'self_care-card',
    'col-span-3',
    'grid-cols-subgrid',
  ],
  theme: {
    extend: {
      screens: {
        sm: '375px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      fontFamily: {
        sans: ['Rubik', 'sans-serif'],
      },
      colors: {
        Blue: 'hsl(246, 80%, 60%)',
        LightRedWork: 'hsl(15, 100%, 70%)',
        SoftBluePlay: 'hsl(195, 74%, 62%)',
        LightRedStudy: 'hsl(348, 100%, 68%)',
        LimeGreenExercise: 'hsl(145, 58%, 55%)',
        VioletSocial: 'hsl(264, 64%, 52%)',
        SoftOrangeSelfcare: 'hsl(43, 84%, 65%)',
        VeryDarkBlue: 'hsl(226, 43%, 10%)',
        DarkBlue: 'hsl(235, 46%, 20%)',
        DesaturatedBlue: 'hsl(235, 45%, 61%)',
        PaleBlue: 'hsl(236, 100%, 87%)',
      },
    },
  },
  plugins: [],
};
