# conflores 🌼

## run locally ❄️

Using the provided nix flake, enter the development environment:

```sh
nix develop
# or using direnv
echo "use flake" > .envrc
direnv allow

bundle-setup
```

For updates:

```sh
bundle-update # Create and update Gemfile.lock
bundix # Create gemset.nix
```
