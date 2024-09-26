/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          'darkbrown': '#321C2A',
          'black': '#000000',
          'lightgreen': '#E8F5E4',
          'button-color': '#4E4B49' 
        }
      },
    },
  },
  plugins: [],
};
