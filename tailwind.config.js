/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "primary": "#9146FF",
        "background": "#1E1E1E",
        "accent": "#00D2FF",
        "secondaryBackground": "#2E0D5E",
        "textPrimary": "#F1F1F1",
        "textSecondary": "#A1A1A1",
        "hover": "#BB86FC",
        "border": "#3A3A3A"
      }
    },

  },
  plugins: [require("tailwindcss-animate")],
}