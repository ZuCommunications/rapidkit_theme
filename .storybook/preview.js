/** @type { import('@storybook/server').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    server: {
      // Replace this with your Drupal site URL, or an environment variable.
      url: 'https://drupal',
    },
  },
  globals: {
    drupalTheme: 'olivero',
    supportedDrupalThemes: {
      olivero: {title: 'Olivero'}
    },
  }
};

export default preview;
