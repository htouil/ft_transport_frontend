/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./pages/**/*.html", "./src/**/*.{ts,js}"],
  theme: {
    extend: {
      screens: {
        xs: {
          max: '639px',
        },
        'max-521': {
          max: '521px',
        },
        'max-503': {
          max: '503px',
        },
        'min-860': {
          min: '860px',
        },
        'min-890': {
          min: '890px',
        },
        'min-980': {
          min: '980px',
        },
        'min-1060': {
          min: '1060px',
        },
        'min-1234': {
          min: '1234px',
        },
      },
      fontSize: {
        '2xs': ['0.625rem', {
          lineHeight: '1rem',
        }],
        '3xs': ['0.5rem', {
          lineHeight: '1rem',
        }],
        '4xs': ['0.375rem', {
          lineHeight: '1rem',
        }],
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
}

// 860:w-60
// 890:w-64
// 980:w-72
// 1060:w-80
// 1234:w-96