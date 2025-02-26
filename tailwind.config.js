/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./pages/**/*.html", "./src/**/*.{ts,js}"],
  theme: {
    extend: {
      screens: {
        xs: {
          max: '639px',
        },
      },
      fontSize: {
        '2xs': ['0.625rem', {
          lineHeight: '1rem',
        }],
        '3xs': ['0.5rem', {
          lineHeight: '1rem',
        }]
      },
    },
  },
  plugins: [],
}

