/** @type { import('@storybook/server').Preview } */
import { withThemeByDataAttribute } from "@storybook/addon-styling";
const preview = {
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
      attributeName: "data-mode",
    }),
  ],
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
      // To customize the HTML returned by Drupal, uncomment the following:
      // import * as drupalPreview from "@lullabot/storybook-drupal-addon/preview";
      // fetchStoryHtml: async (url, path, params, context) => {
      //   const html = await drupalPreview.parameters.server.fetchStoryHtml(
      //     url,
      //     path,
      //     params,
      //     context
      //   );
      //   return `<div class="dark:bg-[#2d2d2d]">${html}</div>`;
      // },
    },
  },
  globals: {
    drupalTheme: 'zu_starterkit',
    supportedDrupalThemes: {
      zu_starterkit: {title: 'zu Starterkit'}
    },
  }
};

export default preview;
