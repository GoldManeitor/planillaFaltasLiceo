const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [ 
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
    "./node_modules/tailwind-datepicker-react/dist/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'custom-bg': '#F2F2F2',
        'custom-darkbg': '#0B0B0B',
        'custom-vi': '#6200EE',
        'custom-darkvi': '#BB86FC',
        // Agrega más colores personalizados aquí
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

