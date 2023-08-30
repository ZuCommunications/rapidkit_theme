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

    // Process info.yml file.
    $info_file = "$working_dir/$machine_name.info.yml";
    $info = Yaml::decode(file_get_contents($info_file));
    unset($info['hidden']);
    unset($info['starterkit']);
    file_put_contents($info_file, Yaml::encode($info));

    // Process webpack.config.js file
    $webpack_file = "$working_dir/webpack.config.js";
    $webpack = file_get_contents($webpack_file);
    $webpack = str_replace($starterkit_machine_name, $machine_name, $webpack);
    $webpack = str_replace('/contrib/', '/custom/', $webpack);
    file_put_contents($webpack_file, $webpack);

    // Process lando.yml file
      if(array_key_exists('LANDO', $_ENV) && $_ENV['LANDO'] == 'ON') {
        $lando_file = "/app/.lando.yml";
        $lando = file_get_contents($lando_file);
        $lando = str_replace($starterkit_machine_name, $machine_name, $lando);
        file_put_contents($lando_file, $lando);
      } else {
        echo "Whao! You tried to generate a theme outside of lando! All good!\nJust make sure your custom commands in your .lando.yml file uses the new theme name!\n\n";
      }

    // Process .storybook/preview.js file
    $storybook_file = "$working_dir/.storybook/preview.js";
    $storybook = file_get_contents($storybook_file);
    $storybook = str_replace($starterkit_machine_name, $machine_name, $storybook);
    $storybook = str_replace($starterkit_theme_name, $theme_name, $storybook);
    file_put_contents($storybook_file, $storybook);

    // Process component files
    $component_files = glob("$working_dir/components/*/*");
    foreach ($component_files as $component_file) {
      $file = file_get_contents($component_file);
      if(str_contains($file, $starterkit_machine_name)) {
          $file = str_replace($starterkit_machine_name, $machine_name, $file);
      }
      if(str_contains($file, $starterkit_theme_name)) {
          $file = str_replace($starterkit_theme_name, $theme_name, $file);
      }
      if(str_contains($file, '/contrib/')) {
          $file = str_replace('/contrib/', '/custom/', $file);
      }
      file_put_contents($component_file, $file);
    }

    // Remove files and directories
    $github_files = glob("$working_dir/.github/*");
    array_map('unlink', array_filter((array) array_merge($github_files))); // Remove all files in .github directory
    rmdir("$working_dir/.github"); // Remove .github directory
    unlink("$working_dir/composer.json"); // Remove composer.json
    unlink("$working_dir/src/StarterKit.php"); // Remove StarterKit.php
  }
}
