dev:
    watchexec -e css,html,md,toml soupault &
    cd build && live-server -p 6969 -o
