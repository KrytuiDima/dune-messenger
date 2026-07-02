/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#020617", // slate-950
        panel: "#09090b", // zinc-950
        'panel-raised': "#18181b", // zinc-900
        hover: "#27272a", // zinc-800
        'border-subtle': "#1e293b", // slate-800
        accent: "#3b82f6", // blue-500
        'accent-dim': "#2563eb", // blue-600
        'bubble-self': "#3b82f6", // blue-500
        'bubble-other': "#18181b", // zinc-900
      }
    },
  },
  plugins: [],
}
