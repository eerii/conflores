dev:
    watchexec -e css,html,md,toml soupault &
    cd build && live-server -p 6969 -o

build:
    soupault

img PATH NAME:
    magick {{PATH}} -define webp:method=6 -quality 70 site/images/$(date +%Y)/{{NAME}}.webp

highlight:
    cd site/style && highlight -o html --config-file $(dirname $(which highlight))/../share/highlight/themes/base16/monokai.theme --print-style
