/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      black:'#000',
      white:'#fff',
      red:'red',
      primary:{
        main: 'rgb(229, 9, 20)',
        shade:'rgb(193, 17, 25)'
      },
    }
  },
  plugins: [],
}