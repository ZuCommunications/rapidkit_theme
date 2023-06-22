/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./templates/**/*.twig",
    "./components/**/*.twig",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      container: {
        padding: "2rem",
        center: true,
      },
      colors: {
        // "turquoise-500": "#337f93",
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
