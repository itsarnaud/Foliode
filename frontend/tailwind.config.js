/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderColor: {
        custom: '#2C2D33',
      },
      borderWidth: {
        '1': '1px',
      },
      borderRadius: {
        '13': '13px',
      },
      fontSize: {
        '14': '14px',
        '16': '16px',
        '20': '20px',
        '26': '26px', 
      },
      // components: {
      //   '.btn-form': {
      //     '@apply py-10 bg-foreground text-[#717680] rounded-[8px] border-[1px] border-[#262626] ': {},
      //   },  
      //   '.btn-secondary': {
      //     '@apply px-4 py-2 border-1 border-custom text-white rounded-13 hover:bg-foreground transition-colors': {},
      //   },
      // }
    },  
  },
  darkMode: "class",
  plugins: [nextui({

    themes:{
      
        "dayMode": {
          colors: {
          background: "#ffffff",
          foreground: "#191919",
          primary: {
              DEFAULT: '#3E3F92',
              100: '#4E529E',
              200: '#5F65A9',
              300: '#7177B5',
              400: '#838AC0',
              500: '#979DCB',
              600: '#ABB0D5',
              700: '#BFC4E0',
              800: '#D4D7EA',
              900: '#E9EBF5',
          },
      }},
      "nightMode": {
        colors: {
          background: "#0C0C0C",
          foreground: "#191919",
          primary: {
              DEFAULT: '#3E3F92',
              100: '#4E529E',
              200: '#5F65A9',
              300: '#7177B5',
              400: '#838AC0',
              500: '#979DCB',
              600: '#ABB0D5',
              700: '#BFC4E0',
              800: '#D4D7EA',
              900: '#E9EBF5',
          },
        }
      }
      }
    }
    
  )],
}