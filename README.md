## Usage

We are using a [private repository](https://getcomposer.org/doc/05-repositories.md#using-private-repositories) for this project.
To use it, you need to add the following to your composer.json file:

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

The branch name of `dev-main` is the default branch name for this repository. If you are using a different branch name, you will need to update the `require` section of your composer.json file to match.






