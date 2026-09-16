/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#121212',
        surface: '#1B1B1B',
        ink: '#F4F1EA',
        'ink-muted': '#9B9B9B',
        border: '#2A2A2A',
        olive: { DEFAULT: '#242424', dark: '#1A1A1A' },
        accent: { DEFAULT: '#D9822B', dark: '#B5691E' },
        trust: { DEFAULT: '#D9822B', dark: '#B5691E' },
        sale: '#D9822B',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Manrope', 'sans-serif'],
      },
      borderRadius: {
        sm: '3px',
        md: '6px',
      },
    },
  },
  plugins: [],
}
