/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Deep photographic tones
          "black": "#111210",
          "jungle": "#1B2218",
          "jungle-deep": "#0C110A",
          // Earthy greens (muted, not neon)
          "green": "#4A7C2E",
          "green-soft": "#6B9B4A",
          "green-pale": "#E8EFE0",
          // Warm neutrals
          "cream": "#FAF8F3",
          "warm-white": "#F5F2EB",
          // Gold accents
          "gold": "#C49B2A",
          "amber": "#B88B20",
          "amber-bg": "#FDF6E7",
          // Text
          "text-dark": "#1E1E1C",
          "text-mid": "#555550",
          "text-light": "#8A8A82",
        },
      },
      fontFamily: {
        // Display: Fraunces — warm, organic, editorial serif
        display: ['"Fraunces"', "Georgia", "serif"],
        // Body: Geist — refined, modern sans from Vercel
        sans: ['"Geist"', "system-ui", "-apple-system", "sans-serif"],
        // Mono for small-caps labels
        mono: ['"Geist Mono"', "ui-monospace", "monospace"],
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "float": "float 3s ease-in-out infinite",
        "grain": "grain 8s steps(10) infinite",
        "spin-slow": "spin 1.5s linear infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "30%": { transform: "translate(3%, -15%)" },
          "50%": { transform: "translate(12%, 9%)" },
          "70%": { transform: "translate(9%, 4%)" },
          "90%": { transform: "translate(-1%, 7%)" },
        },
      },
      backdropBlur: {
        "xl": "20px",
      },
    },
  },
  plugins: [],
};
