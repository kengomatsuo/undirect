#!/bin/zsh
# Renders every direction's 3960x2868 picture, cuts it into frames 1-3 (1320x2868) in Support/AppStore/creative,
# and writes the strips and the comparison sheet to ~/Downloads.
#   Support/AppStore/creative/src/build.sh [d1 d2 ...]
# d1 needs ../render/dominoes-red-2640.png (and -dark- for d1b), which take minutes each:
#   bun render.mjs "pt.html?scene=dominoes&spp=400&v=red&grain=0" ../render/dominoes-red-2640.png 2640 1912
#   bun render.mjs "pt.html?scene=dominoes&spp=320&grain=0" ../render/dominoes-dark-2640.png 2640 1912
# and glass.js from place_phone.mjs whenever the scene's camera or line changes.
cd ${0:A:h}; OUT=${0:A:h:h}; DL=~/Downloads; TMP=$(mktemp -d)
RIVAL=${RIVAL:-/private/tmp/claude-501/-Users-hafang-Repositories-undirect/cacb0243-c977-47e3-8c9e-31d4729bd0e9/scratchpad/lookup/1blocker}
python3 build_parts.py >/dev/null
typeset -A PAGE NUM; PAGE=(d1 "d1.html" d1b "d1.html#dark" d2 "d2.html" d3 "d3.html" d4 "d4.html"); NUM=(d1 1 d1b 1b d2 2 d3 3 d4 4)
# a row of three frames as the store shows them: rounded, a gap between
row() { local w=${5:-660} g r f=(); (( g = w / 22, r = w / 14 ))
  for s in "$1" "$2" "$3"; do magick "$s" -resize "${w}x" -alpha set \( +clone -alpha transparent -fill white -draw "roundrectangle 0,0,%[fx:w-1],%[fx:h-1],$r,$r" \) -compose DstIn -composite "$TMP/_$#f.png"; f+=("$TMP/_$#f.png"); done
  magick "$f[1]" -background white \( -size "${g}x1" xc:white \) "$f[2]" \( -size "${g}x1" xc:white \) "$f[3]" -gravity north +append -background white -alpha remove "$4"; }
(( $# )) || set -- d1 d1b d2 d3 d4
for d in "$@"; do
  [[ $d == d1 && ! -f ../render/dominoes-red-2640.png ]] && { echo "skip d1: no render"; continue }
  [[ $d == d1b && ! -f ../render/dominoes-dark-2640.png ]] && { echo "skip d1b: no render"; continue }
  [[ $d == d1 ]] && magick ../render/dominoes-red-2640.png -statistic Median 3x3 ../render/dominoes-red-clean.png
  [[ $d == d1b ]] && magick ../render/dominoes-dark-2640.png -statistic Median 3x3 ../render/dominoes-dark-clean.png
  ./shot.sh "${PAGE[$d]}" $TMP/$d.png 3960 2868 1 >/dev/null
  magick $TMP/$d.png -crop 1320x2868 +repage -define png:compression-level=9 $OUT/direction-${NUM[$d]}-frame-%d.png
  for i in 2 1 0; do mv $OUT/direction-${NUM[$d]}-frame-$i.png $OUT/direction-${NUM[$d]}-frame-$((i+1)).png; done
  magick $OUT/direction-${NUM[$d]}-frame-1.png $OUT/direction-${NUM[$d]}-frame-2.png $OUT/direction-${NUM[$d]}-frame-3.png +append $DL/undirect-direction-${NUM[$d]}.png
  echo "$d -> $OUT/direction-${NUM[$d]}-frame-{1,2,3}.png, $DL/undirect-direction-${NUM[$d]}.png"
done
# the sheet: each direction as the store would show it, 1Blocker's frames 1-3 under them
rows=()
for n in 1 1b 2 3 4; do
  [[ -f $OUT/direction-$n-frame-1.png ]] || continue
  row $OUT/direction-$n-frame-{1,2,3}.png $TMP/row-$n.png 660
  magick -background white -fill '#111' -font "/System/Library/Fonts/Supplemental/Arial Bold.ttf" -pointsize 44 -size 2080x90 -gravity west caption:"  Undirect, direction $n" $TMP/label-$n.png
  rows+=($TMP/label-$n.png $TMP/row-$n.png)
done
row $RIVAL/0.jpg $RIVAL/1.jpg $RIVAL/2.jpg $TMP/row-r.png 660
magick -background white -fill '#111' -font "/System/Library/Fonts/Supplemental/Arial Bold.ttf" -pointsize 44 -size 2080x90 -gravity west caption:"  1Blocker, live frames 1-3" $TMP/label-r.png
magick $rows $TMP/label-r.png $TMP/row-r.png -background white -gravity center -append -bordercolor white -border 40 $DL/undirect-directions-vs-1blocker.png
echo "sheet -> $DL/undirect-directions-vs-1blocker.png"; rm -rf $TMP
