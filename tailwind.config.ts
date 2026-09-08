import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FFFFFF",
          50: "#FFFFFF",
          100: "#FAFAFA",
          200: "#F4F4F5",
          300: "#E4E4E7",
        },
        ink: {
          DEFAULT: "#09090B",
          muted: "#52525B",
          faint: "#A1A1AA",
        },
        accent: {
          DEFAULT: "#18181B",
          hover: "#000000",
          light: "#F4F4F5",
          muted: "#E4E4E7",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F4F4F5",
          border: "#E4E4E7",
        },
      },
      fontFamily: {
        display: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      fontSize: {
        hero: ["clamp(2.8rem, 6.5vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "section-xl": ["clamp(2rem, 3.8vw, 3rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
      },
      spacing: {
        section: "clamp(6rem, 10vw, 8rem)",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        "card-hover": "0 10px 25px -5px rgba(0,0,0,0.08), 0 8px 10px -6px rgba(0,0,0,0.04)",
        "card-lg": "0 12px 30px -10px rgba(0,0,0,0.08)",
        accent: "0 4px 14px rgba(0,0,0,0.15)",
      },
      animation: {
        "fade-up": "fadeUp 0.55s ease-out forwards",
        "underline-in": "underlineIn 0.3s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        underlineIn: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
