#!/bin/bash
# Vendors the Noto families the localized store screenshots need into
# .shots/noto/ (untracked, like the rest of .shots). Source: github.com/google/fonts, ofl/.
set -euo pipefail
cd "$(dirname "$0")/../.."
mkdir -p .shots/noto
base="https://raw.githubusercontent.com/google/fonts/main/ofl"
get() { # dir remote-file local-name
  [ -s ".shots/noto/$3.ttf" ] || curl -fsSL "$base/$1/$(printf '%s' "$2" | sed 's/\[/%5B/;s/\]/%5D/;s/,/%2C/')" -o ".shots/noto/$3.ttf"
}
get notosans "NotoSans[wdth,wght].ttf" NotoSans
get notosansarabic "NotoSansArabic[wdth,wght].ttf" NotoSansArabic
get notosanshebrew "NotoSansHebrew[wdth,wght].ttf" NotoSansHebrew
get notosansdevanagari "NotoSansDevanagari[wdth,wght].ttf" NotoSansDevanagari
get notosansbengali "NotoSansBengali[wdth,wght].ttf" NotoSansBengali
get notosansgujarati "NotoSansGujarati[wdth,wght].ttf" NotoSansGujarati
get notosansgurmukhi "NotoSansGurmukhi[wdth,wght].ttf" NotoSansGurmukhi
get notosanskannada "NotoSansKannada[wdth,wght].ttf" NotoSansKannada
get notosansmalayalam "NotoSansMalayalam[wdth,wght].ttf" NotoSansMalayalam
get notosansoriya "NotoSansOriya[wdth,wght].ttf" NotoSansOriya
get notosanstamil "NotoSansTamil[wdth,wght].ttf" NotoSansTamil
get notosanstelugu "NotoSansTelugu[wdth,wght].ttf" NotoSansTelugu
get notosansthai "NotoSansThai[wdth,wght].ttf" NotoSansThai
get notosanssc "NotoSansSC[wght].ttf" NotoSansSC
get notosanstc "NotoSansTC[wght].ttf" NotoSansTC
get notosansjp "NotoSansJP[wght].ttf" NotoSansJP
get notosanskr "NotoSansKR[wght].ttf" NotoSansKR
get notonastaliqurdu "NotoNastaliqUrdu[wght].ttf" NotoNastaliqUrdu
ls -la .shots/noto
