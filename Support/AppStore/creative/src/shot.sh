#!/bin/zsh
# shot.sh <page.html[?query][#hash]> <out.png> <css width> <css height> [scale]: one headless Chrome screenshot of a page.
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
P=$(mktemp -d); F=${1%%[?#]*}; R=${1#$F}
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --no-sandbox --force-color-profile=srgb --allow-file-access-from-files \
  --user-data-dir="$P" --force-device-scale-factor=${5:-1} --window-size=$3,$4 --virtual-time-budget=8000 \
  --screenshot="$2" "file://${F:A}$R" >/dev/null 2>&1
rm -rf "$P"; ls -la "$2" | awk '{print $5, $9}'
