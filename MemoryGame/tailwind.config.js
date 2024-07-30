/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // Scans the root HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // Scans all JS, TS, JSX, and TSX files in the src directory
  ],
  theme: {
    extend: {
      backgroundImage: {
        bgImage:
          "url('https://img.itch.zone/aW1nLzE1MTIwODAwLnBuZw==/original/qyU4w1.png')",
      },
      colors: {
        secondaryColor: "#D3FFE9",
        timeColor: "#344966",
        startColor: "#FF8E72",
      },
    },
  },
  plugins: [],
};
