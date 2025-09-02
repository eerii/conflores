dev:
    watchexec -e css,html,md,toml soupault &
    cd build && live-server -p 6969 -o

build:
    soupault

img PATH NAME:
    magick {{PATH}} -define webp:method=6 -quality 70 site/images/$(date +%Y)/{{NAME}}.webp
