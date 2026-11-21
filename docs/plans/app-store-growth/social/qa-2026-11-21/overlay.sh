#!/bin/bash
# overlay.sh <kind: tiktok|story|reel> <in> <out>   draws platform UI zones (red) over a 1080x1920 frame
k=$1; in=$2; out=$3
case $k in
 tiktok) R="-draw 'rectangle 0,0 1079,239' -draw 'rectangle 0,1260 1079,1919' -draw 'rectangle 0,0 119,1919' -draw 'rectangle 961,0 1079,1919' -draw 'rectangle 780,840 1079,1919'";;
 story)  R="-draw 'rectangle 0,0 1079,269' -draw 'rectangle 0,1536 1079,1919' -draw 'rectangle 0,0 64,1919' -draw 'rectangle 1015,0 1079,1919'";;
 reel)   R="-draw 'rectangle 0,0 1079,287' -draw 'rectangle 0,1248 1079,1919' -draw 'rectangle 0,0 119,1919' -draw 'rectangle 888,0 1079,1919' -draw 'rectangle 781,840 1079,1919'";;
esac
eval magick "$in" -resize 1080x1920! -fill "'rgba(255,0,0,0.38)'" $R -resize 540x960 "$out"
