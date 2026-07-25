/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        wine: '#c41e5e',
        winedark: '#a11650',
        pinklight: '#f472b6',
        ink: '#1a0b14',
        muted: '#6b5560',
      },
      fontFamily: {
        title: ['"Playfair Display"', 'serif'],
        body: ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
