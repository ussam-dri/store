/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"  ],
  theme: {
    extend: {
      fontFamily: {
        adihausdin: ['"AdihausDIN"', 'sans-serif'],

        // montserrat: ['"Montserrat"', 'sans-serif'],
      },
      width: {
        '108px': '108px',
      },
      height: {
        '238px': '238px', // rounded from 237.6px
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio')
    ,require('@tailwindcss/forms'),
],
}