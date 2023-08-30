<?php

namespace Drupal\rapidkit_theme;

use Drupal\Component\Serialization\Yaml;
use Drupal\Core\Theme\StarterKitInterface;

final class StarterKit implements StarterKitInterface {

  /**
   * {@inheritdoc}
   */
  public static function postProcess(string $working_dir, string $machine_name, string $theme_name): void {
    // Process info.yml file.
    $info_file = "$working_dir/$machine_name.info.yml";
    $info = Yaml::decode(file_get_contents($info_file));
    unset($info['hidden']);
    unset($info['starterkit']);
    file_put_contents($info_file, Yaml::encode($info));

    // Process webpack.config.js file
    $webpack_file = "$working_dir/webpack.config.js";
    $webpack = file_get_contents($webpack_file);
    $webpack = str_replace('rapidkit_theme', $machine_name, $webpack);
    file_put_contents($webpack_file, $webpack);

    // Remove files and directories
    $github_files = glob("$working_dir/.github/*");
    array_map('unlink', array_filter((array) array_merge($github_files))); // Remove all files in .github directory
    rmdir("$working_dir/.github"); // Remove .github directory
    unlink("$working_dir/composer.json"); // Remove composer.json
    unlink("$working_dir/src/StarterKit.php"); // Remove StarterKit.php
  }
}
