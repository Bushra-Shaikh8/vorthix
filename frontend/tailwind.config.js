/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: "#6C3BD4",
          blue: "#1B98D6",
          mid: "#3D6FE8",
        },
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
        display: ["'Syne'", "sans-serif"],
      },
    },
  },
  plugins: [],
};