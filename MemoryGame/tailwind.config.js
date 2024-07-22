/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // Scans the root HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // Scans all JS, TS, JSX, and TSX files in the src directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
