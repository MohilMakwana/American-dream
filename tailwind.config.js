/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: '#c9a96e',
          'gold-light': '#e8d5a3',
          blue: '#4a7fd4',
          purple: '#8b5cf6',
          black: '#000000',
          bg: '#07070f',
          white: '#f5f5f0',
        }
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'sans-serif'],
        space: ['"Space Grotesk"', 'sans-serif'],
      },
      backgroundImage: {
        'glass-grad': 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
      }
    },
  },
  plugins: [],
}
