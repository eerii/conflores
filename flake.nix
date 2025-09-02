{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    systems.url = "github:nix-systems/default";
  };

  outputs =
    { self, ... }@inputs:
    {
      devShells = inputs.nixpkgs.lib.genAttrs (import inputs.systems) (
        system:
        let
          pkgs = import inputs.nixpkgs { inherit system; };
        in
        {
          default = pkgs.mkShell {
            packages = with pkgs; [
              soupault
              cmark
              live-server
              watchexec
              just
              imagemagick
              highlight
            ];
          };
        }
      );
    };
}
