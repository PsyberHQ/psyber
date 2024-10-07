import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        urbanist: ['var(--font-urbanist)', 'sans-serif'],
        gliker: ['var(--font-gliker)', 'serif'],
      },
      boxShadow: {
        'custom-light': '4px 4px 10px rgba(0, 0, 0, 0.3)',
        'custom-dark': '8px 8px 15px rgba(0, 0, 0, 0.5)',
      },
      colors: {
        brand: {
          darkbrown: '#321C2A',
          black: '#000000',
          lightgreen: '#E8F5E4',
          'button-color': '#4E4B49',
          'button-purple': '#BA68C8',
        },
      },
      screens: {
        xs: '325px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
};
export default config;
