/** @type {import('tailwindcss').Config} */
export default {
  // App controls theme; system setting won't override.
  darkMode: 'class',

  // Make sure these paths fit your project
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,html}',
  ],

  theme: {
    extend: {
      backgroundSize: {
        'size-200': '200% 200%',
      },
      animation: {
        gradient: 'gradient 15s ease infinite',
        gradientMove: 'gradientMove 10s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%':   { backgroundPosition: '0% 50%' },
          '50%':  { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        gradientMove: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
      },
    },
  },

  plugins: [],

};
module.exports = {
  theme: {
    extend: {
      colors: {
        gold: "#FFD700",
      },
    },
  },
};

