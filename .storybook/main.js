/** @type { import('@storybook/server-webpack5').StorybookConfig } */
const config = {
  stories: ["../components/**/*.mdx", "../components/**/*.stories.@(json)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-styling"
  ],
  framework: {
    name: "@storybook/server-webpack5",
    options: {
      builder: {
        useSWC: true
      }
    },
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
