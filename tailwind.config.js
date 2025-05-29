/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
        // Primary colors
        primary: {
          DEFAULT: "#3b82f6", // blue-500
          foreground: "#ffffff",
          hover: "#2563eb", // blue-600
          light: "#93c5fd", // blue-300
        },
        // Sorting visualization colors
        sort: {
          default: "#3b82f6", // blue-500
          comparing: "#f97316", // orange-500
          swapping: "#ef4444", // red-500
          sorted: "#22c55e", // green-500
          background: "#f8fafc", // slate-50
        },
        // UI colors
        ui: {
          background: "#ffffff",
          foreground: "#1e293b", // slate-800
          muted: "#f1f5f9", // slate-100
          accent: "#e2e8f0", // slate-200
          border: "#cbd5e1", // slate-300
        },
        // Button colors
        button: {
          primary: {
            bg: "#3b82f6", // blue-500
            text: "#ffffff",
            hover: "#2563eb", // blue-600
          },
          secondary: {
            bg: "#f1f5f9", // slate-100
            text: "#1e293b", // slate-800
            hover: "#e2e8f0", // slate-200
          },
          success: {
            bg: "#22c55e", // green-500
            text: "#ffffff",
            hover: "#16a34a", // green-600
          },
          danger: {
            bg: "#ef4444", // red-500
            text: "#ffffff",
            hover: "#dc2626", // red-600
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
