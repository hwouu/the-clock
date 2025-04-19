/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["JetBrains Mono", "Menlo", "Monaco", "Courier New", "monospace"],
      },
      animation: {
        "spin-slow": "spin 10s linear infinite",
        "ping-slow": "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      minWidth: {
        10: "2.5rem",
      },
      boxShadow: {
        clock: "0 0 20px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
