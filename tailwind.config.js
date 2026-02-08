/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        desktop: {
          bg: '#f3f4f6',
          dark: '#1e1e2e',
          accent: '#7aa2f7',
          sidebar: '#16161e'
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['"Space Grotesk"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
