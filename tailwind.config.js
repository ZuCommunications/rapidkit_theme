/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./templates/**/*.twig",
    "./components/**/*.{twig,js}",
    "./node_modules/flowbite/**/*.js",
  ],
  darkMode: ["class", '[data-mode="dark"]'],
  theme: {
    extend: {
      container: {
        padding: "2rem",
        center: true,
      },
      colors: {
        // https://uicolors.app/create with #005a9c (endeavour)
        "endeavour-50": "#f0f8ff",
        "endeavour-100": "#dff0ff",
        "endeavour-200": "#b9e1fe",
        "endeavour-300": "#7bcbfe",
        "endeavour-400": "#34b0fc",
        "endeavour-500": "#0a97ed",
        "endeavour-600": "#0077cb",
        "endeavour-700": "#005a9c",
        "endeavour-800": "#055187",
        "endeavour-900": "#0a4370",
      },
      fontFamily: {
        // custom: ['Custom', "sans-serif"],
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/container-queries"),
    require("flowbite/plugin"),
  ],
};
