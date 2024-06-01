/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    fontFamily: {
      'megrim': ['Megrim', 'system-ui'],
    },
    container: {
      center: true,
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    extend: {
      colors: {
        'primary': '#080F41',
        'primary-light': '#57B9E9',
        'success': '#7e5bef',
        'blue': '#8CAFF6',
        'warning': '#F3A549',
        'danger': '#F6AAA9',
      },
    },
  },
  plugins: [],
}