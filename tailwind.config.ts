import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Core B/W colors
        border: "#000000",
        input: "#000000",
        ring: "#000000",
        background: "#ffffff",
        foreground: "#000000",

        // Semantic tokens — B/W pairs
        primary: {
          DEFAULT: "#000000",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#000000",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "#000000",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#f5f5f5",
          foreground: "#000000",
        },
        accent: {
          DEFAULT: "#000000",
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#000000",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#000000",
        },

        // Sidebar specific (keeps semantics but with B/W values)
        sidebar: {
          DEFAULT: "#000000",
          foreground: "#ffffff",
          primary: "#000000",
          "primary-foreground": "#ffffff",
          accent: "#000000",
          "accent-foreground": "#ffffff",
          border: "#000000",
          ring: "#000000",
        },

        // Remove colored crypto palette in favor of B/W
        crypto: {
          blue: "#000000",
          purple: "#000000",
          "light-purple": "#ffffff",
          "dark-purple": "#000000",
          accent: "#ffffff",
        },
      },
      fontFamily: {
        sans: ["Inter var", "sans-serif"],
        display: ["Poppins", "sans-serif"],
      },
      borderRadius: {
        xs: "0.125rem", // 2px
        sm: "0.25rem", // 4px
        md: "0.375rem", // 6px
        lg: "0.5rem", // 8px
        xl: "0.75rem", // 12px
        "2xl": "1rem", // 16px
        "3xl": "1.5rem", // 24px
        circle: "50%", // perfect circle
        pill: "9999px", // pill-shaped
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-left": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "fade-in-right": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 3s ease-in-out infinite",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
        "fade-in": "fade-in 0.7s ease-out",
        "fade-in-left": "fade-in-left 0.7s ease-out",
        "fade-in-right": "fade-in-right 0.7s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
