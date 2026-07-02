/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#0d1117",
        panel: "#131a22",
        'panel-raised': "#1a2330",
        hover: "#212c3b",
        'border-subtle': "#232f3e",
        accent: "#4fa3ff",
        'accent-dim': "#2c6bb0",
        'bubble-self': "#235282",
        'bubble-other': "#1c2530",
      }
    },
  },
  plugins: [],
}
