/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: "#EFEAEA",
        main_black: "#000",
        text_gray: "#999898",
        text_gray_bold: "#A5AFA8",
        greenBold: "#325A3E",
        error: "#e44836",
        greenLight: "#81D066",
        green: "#01B763",
        bgGreen: "#A2D9A1",
      },
    },
  },
  plugins: [],
};
