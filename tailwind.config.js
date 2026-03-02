/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#060A12',
          900: '#0A1020',
          800: '#101A30',
          700: '#172646',
        },
      },
    },
  },
  plugins: [],
}
