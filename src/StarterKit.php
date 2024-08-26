<?php

namespace Drupal\rapidkit_theme;

use Drupal\Component\Serialization\Yaml;
use Drupal\Core\Theme\StarterKitInterface;

final class StarterKit implements StarterKitInterface {

  /**
   * {@inheritdoc}
   */
  public static function postProcess(string $working_dir, string $machine_name, string $theme_name): void {
    $starterkit_machine_name = 'rapidkit_theme';
    $starterkit_theme_name = 'RapidKit';

    // Process webpack.config.js file
    $webpack_file = "$working_dir/webpack.config.js";
    $webpack = file_get_contents($webpack_file);
    $webpack = str_replace(
        [$starterkit_machine_name, '/contrib/'],
        [$machine_name, '/custom/'],
        $webpack
    );
    file_put_contents($webpack_file, $webpack);

    // Process lando.yml file
    if(array_key_exists('LANDO', $_ENV) && $_ENV['LANDO'] === 'ON') {
        $lando_file = "/app/.lando.yml";
        $lando = file_get_contents($lando_file);
        $lando = str_replace(
            [$starterkit_machine_name, '/contrib/'],
            [$machine_name, '/custom/'],
            $lando
        );
        file_put_contents($lando_file, $lando);
    } else {
        echo "Whao! You tried to generate a theme outside of lando! All good!\nJust make sure your custom commands in your .lando.yml file uses the new theme name!\n\n";
    }

    // Process package.json file
    $package_json_file = "/app/package.json";
    $package_json = file_get_contents($package_json_file);
    $package_json = str_replace(
        [$starterkit_machine_name, '/contrib/'],
        [$machine_name, '/custom/'],
        $package_json
    );
    file_put_contents($package_json_file, $package_json);

    // Process .storybook/preview.js file
    $storybook_file = "$working_dir/.storybook/preview.js";
    $storybook = file_get_contents($storybook_file);
    $storybook = str_replace(
        [$starterkit_machine_name, $starterkit_theme_name],
        [$machine_name, $theme_name],
        $storybook
    );
    file_put_contents($storybook_file, $storybook);

    // Remove files and directories
    array_map('unlink', array_filter((array) array_merge(glob("$working_dir/.github/workflows/*")))); // Remove all files in .github/workflows directory
    rmdir("$working_dir/.github/workflows"); // Remove .github/workflows directory
    array_map('unlink', array_filter((array) array_merge(glob("$working_dir/.github/*")))); // Remove all files in .github directory
    rmdir("$working_dir/.github"); // Remove .github directory
  }
}
