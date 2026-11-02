/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#008F45", dark: "#006B32", bright: "#009B4D" },
        deep: "#063B23",
        accent: { DEFAULT: "#F4C430", light: "#FFF4C2" },
        ink: "#111111",
        charcoal: "#222222",
        mist: "#F7F9F5",
        line: "#E5E7EB",
      },
      fontFamily: {
        heading: ["Poppins", "system-ui", "sans-serif"],
        body: ['"Open Sans"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
