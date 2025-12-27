/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        heading: ['"GillSans-Extended"', 'sans-serif'],
      },
      colors: {
        'fortis-gold': '#D99414',
        'rich-black': '#001F3F',
        'beige': '#F5F5DC',
        'black': '#000000',
        yellow: {
          '50': '#fefce8',
          '100': '#fef9c3',
          '200': '#fef08a',
          '300': '#fde047',
          '400': '#facc15',
          '500': '#eab308',
          '600': '#ca8a04',
          '700': '#a16207',
          '800': '#854d0e',
          '900': '#713f12',
          '950': '#422006',
        },
      },
    },
  },
  plugins: [],
}
