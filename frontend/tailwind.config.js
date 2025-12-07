/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neon: {
          purple: '#c77dff',
          dark: '#5a189a',
          light: '#e0aaff',
          darker: '#3c096c',
          bright: '#e0aaff',
        },
      },
      boxShadow: {
        neon: '0 0 20px rgba(199, 125, 255, 0.5)',
        'neon-dark': '0 0 30px rgba(224, 170, 255, 0.4)',
      },
    },
  },
  plugins: [],
};
