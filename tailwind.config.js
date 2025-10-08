/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          50: '#f7fee7',
          100: '#ecfccb',
          200: '#d9f99d',
          300: '#bef264',
          400: '#a3e635',
          500: '#84cc16',
          600: '#b6eb54',
          700: '#4d7c0f',
          800: '#365314',
          900: '#1a2e05',
          950: '#0a1a02',
        },
      },
    },
  },
  plugins: [],
};
