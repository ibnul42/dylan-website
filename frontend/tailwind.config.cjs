/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1a1b1f",
      },
      aspectRatio: {
        "4/3": "4/3",
      },
    },
  },
  plugins: [],
};
