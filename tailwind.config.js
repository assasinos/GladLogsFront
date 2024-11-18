/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}"],
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
        primary: "#9146FF",
        background: "#1E1E1E",
        accent: "#00D2FF",
        secondaryBackground: "#2E0D5E",
        textPrimary: "#F1F1F1",
        textSecondary: "#A1A1A1",
        hover: "#BB86FC",
        border: "#3A3A3A",
      },
      animation: {
        border: "border 4s linear infinite",
      },
      keyframes: {
        border: {
          to: { "--border-angle": "360deg" },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }) {
      addUtilities({
        ".border-gradient": {
          background:
            "linear-gradient(45deg, theme(colors.background), theme(colors.background) 50%, theme(colors.background)) padding-box, conic-gradient(from var(--border-angle), theme(colors.slate.600/.48) 80%, theme(colors.indigo.500) 86%, theme(colors.primary) 90%, theme(colors.accent) 94%, theme(colors.slate.600/.48)) border-box",
        },
      });
    },
  ],
};
