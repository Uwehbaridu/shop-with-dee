/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        espresso: {
          DEFAULT: "#2A1B12",
          dark: "#180F0A",
          light: "#3D2A1C",
        },
        gold: {
          DEFAULT: "#C7992E",
          light: "#E4C878",
          pale: "#F1E3BE",
        },
        berry: "#9C1E4E",
        cream: "#F8F3E9",
        ink: "#1C1410",
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        script: ["'Cormorant Garamond'", "serif"],
        body: ["'Manrope'", "sans-serif"],
      },
      backgroundImage: {
        "grain": "url('/noise.png')",
      },
      boxShadow: {
        gold: "0 0 0 1px rgba(199,153,46,0.35)",
      },
      letterSpacing: {
        widest2: "0.35em",
      },
    },
  },
  plugins: [],
}

