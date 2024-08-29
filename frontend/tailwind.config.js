/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        'colors':'color, background-color, text-decoration-color, fill, stroke',
        'border':'border-color',
        'fonts':'font',
      },
      colors:{
        n:{
         
          1:'#BF00FF',
          2:'#EBEBEB',
          3:'#a463ff',
          4:'#78716c', // stone color paragraph


        }
      },
      fontFamily:{
        "primary":['Inter','sans-serif'],
        'secondly':['Jost','sans-serif'],
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        '4xl':'0 15px 60px -15px rgba(0, 0, 0, 0.3)'
      }
    },
  },
  plugins: [],
}

