import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0A0E14",
          elevated: "#10151D",
          panel: "#141A23",
          glass: "rgba(16, 21, 29, 0.6)",
        },
        ink: {
          DEFAULT: "#E4E7EB",
          muted: "#8B95A5",
          faint: "#4B5563",
        },
        signal: {
          DEFAULT: "#FF6B35",
          dim: "#FF6B3526",
          bright: "#FF8759",
          glow: "rgba(255, 107, 53, 0.15)",
        },
        success: {
          DEFAULT: "#3ECF8E",
          dim: "#3ECF8E1F",
        },
        line: {
          DEFAULT: "#1C2430",
          light: "#232D3B",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "hero-mobile": ["3.25rem", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "hero-desktop": ["7.5rem", { lineHeight: "0.93", letterSpacing: "-0.035em" }],
      },
      maxWidth: {
        content: "1200px",
      },
      transitionTimingFunction: {
        signal: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        "gradient-x": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        blink: "blink 1.1s step-end infinite",
        shimmer: "shimmer 2.5s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "gradient-x": "gradient-x 8s ease infinite",
        "slide-up": "slide-up 0.5s ease-out forwards",
      },
      backgroundSize: {
        "200%": "200% auto",
        "400%": "400% 400%",
      },
    },
  },
  plugins: [],
};
export default config;
