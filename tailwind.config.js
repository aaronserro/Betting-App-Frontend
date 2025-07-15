/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Make sure your paths match your project structure
  ],
  theme: {
extend: {
  backgroundSize: {
    'size-200': '200% 200%',
  },
  animation: {
    gradient: 'gradient 15s ease infinite',
    gradientMove: 'gradientMove 10s ease infinite', // ✅ now it has a different name
  },
  keyframes: {
    gradient: {
      '0%': { backgroundPosition: '0% 50%' },
      '50%': { backgroundPosition: '100% 50%' },
      '100%': { backgroundPosition: '0% 50%' },
    },
    gradientMove: {
      '0%, 100%': { backgroundPosition: '0% 50%' },
      '50%': { backgroundPosition: '100% 50%' },
    },
  },
},
  },
  plugins: [],
}
