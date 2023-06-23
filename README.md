## Installation

To include this theme, you need to add the following to your composer.json file:

```json
{
    "repositories": [
        {
            "type": "vcs",
            "url":  "git@github.com:ZuCommunications/zu_starterkit.git"
        }
    ],
    "require": {
        "zucommunications/zu_starterkit": "dev-main"
    }
}
```

To pull in changes from this repository, you will need to run `composer update` from the command line.

The `dev-` prefix is a composer convention.  In the above example, the actual branch name will be `main` on GitHub. See https://getcomposer.org/doc/05-repositories.md#loading-a-package-from-a-vcs-repository for more information.

After install, you will find the theme in `web/themes/contrib/zu_starterkit`.

To enable this theme, you can run the following commands from the root of your project:

```bash
drush theme:install zu_starterkit
drush config-set system.theme default zu_starterkit -y
drush en -y sdc
drush cr
```

## Compilation

This theme uses [Webpack Encore](https://symfony.com/doc/current/frontend.html#webpack-encore) to compile assets.

To compile assets, you can run the following command from the root of your project:

```bash
cd web/themes/contrib/zu_starterkit
npm install
npm run build
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
