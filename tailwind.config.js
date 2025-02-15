/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        noto: ["Noto Sans Thai", "sans-serif"],
      },
      fontSize: {
        base: "2rem",
        xxl: "1.5rem",
        xxxl: "2rem",
      },
    },
  },
  plugins: [],
};
