## Usage

We are using a [private repository](https://getcomposer.org/doc/05-repositories.md#using-private-repositories) for this project.

To use private repositories in composer you need to setup a personal access token in github with the `repo` scope. You can then use this token as your password when composer asks for it.

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

To pull in changes from this repository, you will need to run `composer update` from the command line.  The `dev-` prefix is a composer convention, whatever comes after this will be the actual branch name on GitHub. See https://getcomposer.org/doc/05-repositories.md#loading-a-package-from-a-vcs-repository for more information.

After install you will find the theme in `web/themes/contrib/zu_starterkit`.

To enable this theme, you can run the following commands from the root of your project:

```bash
lando drush theme:install zu_starterkit
lando drush config-set system.theme default zu_starterkit -y
lando drush en -y sdc
lando drush cr
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
