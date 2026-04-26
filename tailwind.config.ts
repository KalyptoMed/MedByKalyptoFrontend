import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "sans-serif"],
      },
      colors: {
        brand: {
          DEFAULT: "#004D4A",
          50: "#E6F5F5",
          100: "#CCEBEB",
          200: "#99D7D6",
          300: "#66C4C2",
          400: "#33B0AE",
          500: "#004D4A",
          600: "#003E3C",
          700: "#002E2D",
          800: "#001F1E",
          900: "#000F0F",
        },
        lime: {
          DEFAULT: "#D0FF71",
          50: "#F7FFE5",
          100: "#EFFFCC",
          200: "#DFFF99",
          300: "#D0FF71",
          400: "#BEFF3D",
          500: "#AAFF00",
        },
        mint: "#EBFFF5",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-in-right": "slideInRight 0.4s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(100%)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #004D4A 0%, #006B67 50%, #004D4A 100%)",
        "hero-gradient": "linear-gradient(135deg, #003836 0%, #005C58 40%, #007A75 100%)",
        "card-gradient": "linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
      },
      boxShadow: {
        "brand": "0 4px 24px rgba(0, 77, 74, 0.25)",
        "lime": "0 4px 24px rgba(208, 255, 113, 0.35)",
        "card": "0 2px 20px rgba(0, 0, 0, 0.08)",
        "card-hover": "0 8px 40px rgba(0, 0, 0, 0.16)",
        "glass": "0 8px 32px rgba(0, 0, 0, 0.12)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};
export default config;
