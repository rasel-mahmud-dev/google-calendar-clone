/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          50: "rgb(252,252,252)",
          100: "rgb(243, 244, 246)",
          200: "rgb(234, 234, 234)",
          300: "rgb(213, 210, 210)",
          400: "rgb(152, 152, 152)",
          500: "rgb(121, 121, 121)",
          600: "rgb(98, 98, 98)",
          700: "rgb(84, 84, 84)",
          800: "rgb(79, 79, 79)",
          900: "rgb(61, 61, 61)",
        }
      }
    },
  },
  plugins: [],
}