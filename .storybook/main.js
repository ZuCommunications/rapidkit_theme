/** @type { import('@storybook/server-webpack5').StorybookConfig } */
const config = {
  stories: ["../components/**/*.stories.@(json|js)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-styling",
    "@lullabot/storybook-drupal-addon",
  ],
  framework: {
    name: "@storybook/server-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
