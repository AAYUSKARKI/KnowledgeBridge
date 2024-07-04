/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Specify the paths to your source files
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        "spin-around": "spin-around calc(var(--speed) * 2) infinite linear", // Define spin-around animation with dynamic speed
        slide: "slide var(--speed) ease-in-out infinite alternate", // Define slide animation with dynamic speed
      },
      keyframes: {
        "spin-around": {
          "0%": {
            transform: "translateZ(0) rotate(0)", // Start at 0 degrees
          },
          "15%, 35%": {
            transform: "translateZ(0) rotate(90deg)", // Rotate to 90 degrees
          },
          "65%, 85%": {
            transform: "translateZ(0) rotate(270deg)", // Rotate to 270 degrees
          },
          "100%": {
            transform: "translateZ(0) rotate(360deg)", // Complete a full rotation
          },
        },
        slide: {
          to: {
            transform: "translate(calc(100cqw - 100%), 0)", // Slide element horizontally
          },
        },
      },
    },
  },
  plugins: [],
}
