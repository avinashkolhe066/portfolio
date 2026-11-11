/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
      },
      keyframes: {
        drift: { from: { transform: "translate3d(0,0,0)" }, to: { transform: "translate3d(160vw,0,0)" } },
        twinkle: { "0%,100%": { opacity: 0.15 }, "50%": { opacity: 1 } },
        shoot: {
          "0%": { transform: "rotate(-35deg) translateX(0)", opacity: 0 },
          "4%": { opacity: 1 },
          "12%,100%": { transform: "rotate(-35deg) translateX(-450px)", opacity: 0 },
        },
        float: {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(var(--dx),var(--dy),0) scale(1.12)" },
        },
        rise: {
          "0%": { transform: "translate3d(0,0,0)", opacity: 0 },
          "50%": { opacity: 0.7 },
          "100%": { transform: "translate3d(0,-70px,0)", opacity: 0 },
        },
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        marquee: { from: { transform: "translate3d(0,0,0)" }, to: { transform: "translate3d(-50%,0,0)" } },
      },
      animation: {
        drift: "drift 70s linear infinite",
        twinkle: "twinkle 4s ease-in-out infinite",
        shoot: "shoot 9s ease-in infinite",
        float: "float 18s ease-in-out infinite",
        rise: "rise 8s ease-in-out infinite",
        "pulse-slow": "pulse 7s ease-in-out infinite",
        marquee: "marquee linear infinite",
      },
    },
  },
  plugins: [],
};
