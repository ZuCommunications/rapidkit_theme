## Installation

To include this theme, you need to add the following to your composer.json file:

```json
{
  "repositories": [
    {
      "type": "vcs",
      "url": "git@github.com:ZuCommunications/zu_starterkit.git"
    }
  ],
  "require": {
    "zucommunications/zu_starterkit": "dev-main"
  }
}
```

To pull in changes from this repository, you will need to run `composer update` from the command line.

The `dev-` prefix is a composer convention. In the above example, the actual branch name will be `main` on GitHub. See https://getcomposer.org/doc/05-repositories.md#loading-a-package-from-a-vcs-repository for more information.

After install, you will find the theme in `web/themes/contrib/zu_starterkit`.

### Dependencies

This theme requires the following dependencies:

```bash
composer require 'drupal/cl_server:^2.0@beta'
drush en -y cl_server sdc
```

### Enable

To enable the theme, you can run the following commands from the root of your project:

```bash
drush theme:install zu_starterkit
drush config-set system.theme default zu_starterkit -y
drush cr
```

### Disable

To disable the theme, you can run the following commands from the root of your project:

```bash
drush config-set system.theme default olivero -y
drush theme:uninstall zu_starterkit
drush cr
```

## Compilation

This theme uses [Webpack Encore](https://symfony.com/doc/current/frontend.html#webpack-encore) to compile assets.

To compile assets, you can run the following command from the root of your project:

```bash
cd web/themes/contrib/zu_starterkit
nvm use
npm install
npm run build
```

## Storybook

We are using the `@lullabot/storybook-drupal-addon` for storybook. It makes use of the `fetchStoryHtml` function provided by https://github.com/storybookjs/storybook/tree/next/code/frameworks/server-webpack5 to make a request to a running Drupal installation. The cl_server drupal module will create a route that will return markup for a given component. See https://github.com/Lullabot/storybook-drupal-addon/blob/main/src/fetchStoryHtml.ts for examples on usage.

### Setup

You need to tell storybook where to look for your backend server. Copy the example.env file to .env and update the `STORYBOOK_DRUPAL_URL` variable to point to your local Drupal installation.

Also, the storybook integration for cl_server needs CORS enable to work properly. Add this to the development.services.yml:

```yml
parameters:
  twig.config:
    debug: true
    cache: false
  cors.config:
    enabled: true
    allowedHeaders: ["*"]
    allowedMethods: []
    allowedOrigins: ["*"]
    exposedHeaders: false
    maxAge: false
    supportsCredentials: true
```

Also, each story needs to defined the full path to the story. When using lando it should look as follows:

```json
{
  "parameters": {
    "fileName": "/app/web/themes/contrib/zu_starterkit/components/alert/alert.stories.json"
  }
}
```

Also, you need to add the "Use the CL Server endpoint" to anonymous users on `/admin/people/permissions`

### Usage

To start the storybook server, you can run the following command from the root of your project:

```bash
cd web/themes/contrib/zu_starterkit
npm run storybook
```

## Linting

This theme uses [ESLint](https://eslint.org/) to lint JavaScript. We are only checking code quality rules. Please see https://prettier.io/docs/en/comparison.html for more information. You will need to [configure your editor](https://eslint.org/docs/latest/use/integrations) to run on save.

```bash
npm run lint
```

## Formatting

This theme uses [Prettier](https://prettier.io/) to format files. You will need to [configure your editor](https://prettier.io/docs/en/editors.html) to run on save.

```bash
npm run format
```

## Generate Starterkit

To generate a new custom theme using this theme as a starterkit, you can run the following command from the root of your project:

```bash
cd web
mkdir -p themes/custom
php core/scripts/drupal generate-theme duchess --starterkit "zu_starterkit" --path themes/custom
cd themes/custom/duchess
find . -type f ! -name "*.png" ! -name "*.svg" ! -name "*.gif" -exec sed -i '' -e 's/zu_starterkit/duchess/g' {} +
lando drush theme:install duchess
lando drush config-set system.theme default duchess -y
lando drush en -y sdc
lando drush cr
```
