/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty:{
        'colors':'color, background-color,text-decoration-color,fill, stroke',
        'border':'border-color',
      },
      colors:{
        n:{
          1:'#f97316',
          2:'#ffffff',
          3:' #fb923c',
          4:'#d1d5db',

        }
      },
      fontFamily:{
        "primary":['Inter','sans-serif'],
      }
    },
  },
  plugins: [],
}

