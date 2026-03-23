/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f6f7f2',
          100: '#eaeed9',
          200: '#d4ddb4',
          300: '#b5c585',
          400: '#93a85a',
          500: '#748d3c',
          600: '#5a6f2e',
          700: '#455726',
          800: '#374522',
          900: '#2f3b1f',
        },
        cream: '#faf8f3',
        bark: '#6b5b47',
        darkbark: '#3d3226',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Jost"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
