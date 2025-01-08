{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.11";
    nixpkgs-ruby = {
      url = "github:bobvanderlinden/nixpkgs-ruby";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    bundix = {
      url = "github:inscapist/bundix/main";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    ruby-nix = {
      url = "github:inscapist/ruby-nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    systems.url = "github:nix-systems/default";
  };

  nixConfig = {
    extra-substituters = "https://nixpkgs-ruby.cachix.org";
    extra-trusted-public-keys = "nixpkgs-ruby.cachix.org-1:vrcdi50fTolOxWCZZkw0jakOnUI1T19oYJ+PRYdK4SM=";
  };

  outputs =
    { self, ... }@inputs:
    let
      pkgs = import inputs.nixpkgs {
        system = "x86_64-linux";
        overlays = [
          inputs.nixpkgs-ruby.overlays.default
        ];
      };

      # TODO: https://github.com/jekyll/jekyll/pull/9736
      ruby = pkgs."ruby-3.3";
      gemset = if builtins.pathExists ./gemset.nix then import ./gemset.nix else { };
      inherit
        (inputs.ruby-nix.lib pkgs {
          inherit gemset ruby;
          name = "conflores";
          gemConfig = pkgs.defaultGemConfig;
        })
        env
        ;

      bundix-cli = system: inputs.bundix.packages.${system}.default;
      bundle-setup =
        system:
        pkgs.writeShellScriptBin "bundle-setup" ''
          export BUNDLE_PATH=vendor/bundle
          bundle lock
          ${bundix-cli system}/bin/bundix
        '';

      eachSystem = inputs.nixpkgs.lib.genAttrs (import inputs.systems);
    in
    {
      devShells = eachSystem (system: {
        default = pkgs.mkShell {
          packages = [
            env
            ruby
            (bundle-setup system)
            (bundix-cli system)
          ];

          shellHook = ''
            export BUNDLE_PATH=vendor/bundle
          '';
        };
      });
    };
}
