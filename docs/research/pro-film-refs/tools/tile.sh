#!/bin/bash
# tile.sh out cw ch cols files...
out="$1"; cw="$2"; ch="$3"; cols="$4"; shift 4
n=0; ins=(); fc=""; lay=""; labels=""
for f in "$@"; do
  ins+=(-i "$f")
  fc+="[${n}:v]scale=${cw}:${ch}:force_original_aspect_ratio=decrease,pad=${cw}:${ch}:(ow-iw)/2:(oh-ih)/2:black,setsar=1[v${n}];"
  x=$(( (n % cols) * cw )); y=$(( (n / cols) * ch ))
  lay+="${x}_${y}|"; labels+="[v${n}]"
  n=$((n+1))
done
if [ "$n" -eq 1 ]; then ffmpeg -v error -y "${ins[@]}" -filter_complex "${fc%;}" -map "[v0]" -frames:v 1 -q:v 3 "$out"
else ffmpeg -v error -y "${ins[@]}" -filter_complex "${fc}${labels}xstack=inputs=${n}:layout=${lay%|}:fill=black" -frames:v 1 -q:v 3 "$out"; fi
