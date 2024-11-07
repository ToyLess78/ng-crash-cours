/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      animation: {
        loader: "loader 1.5s infinite ease-in-out",
      },
      keyframes: {
        loader: {
          "0%, 50%, 100%": {
            height: "0.375rem",
            transform: "translateY(0)",
            backgroundColor: "rgba(0, 0, 0, 0.25)",
          },
          "25%": {
            height: "2rem",
            transform: "translateY(1rem)",
            backgroundColor: "#000000",
          },
        },
      },
    },
  },
  plugins: [],
};
