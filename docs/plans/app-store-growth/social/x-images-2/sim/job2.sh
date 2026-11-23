#!/bin/bash
# Real iPhone captures for the X pictures, run through the device queue on the pool's iPhone simulator:
#   bun ~/.claude/scripts/device-queue/device-queue.ts submit ios-sim --tree <repo> --cmd 'bash <this file> [steps]' --who x-photo-posts
# Steps (default all): tabs paste globe replace closetabs news; also: back
# Every step saves screenshots in ../src/sim/. The queue kills a job whose log stops growing for a minute, so Maestro's
# output goes to this log and a heartbeat line prints while a flow waits for Maestro's driver.
HERE="$(cd "$(dirname "$0")" && pwd)"
OUT="$HERE/../src/sim"
mkdir -p "$OUT"
D="${DEVICE_QUEUE_UDID:-626CECA3-66AF-4284-921F-C7A8FD05FA08}"
export JAVA_HOME=/opt/homebrew/opt/openjdk/libexec/openjdk.jdk/Contents/Home
export PATH="$JAVA_HOME/bin:$PATH"
export MAESTRO_DRIVER_STARTUP_TIMEOUT=240000
export MAESTRO_CLI_NO_ANALYTICS=1 MAESTRO_CLI_ANALYSIS_NOTIFICATION_DISABLED=true
M="$HOME/.maestro/bin/maestro"
STEPS="${*:-tabs paste globe replace closetabs news}"
GUARDIAN="https://www.theguardian.com/games/2026/nov/19/tips-for-playing-grand-theft-auto-vi"

shot() { xcrun simctl io "$D" screenshot "$OUT/$1.png" >/dev/null 2>&1; echo "shot $1"; }
flow() {
  echo "flow $1"
  "$M" --device "$D" test "$HERE/$1.yaml" 2>&1 | grep -v -E "^WARNING|^│|^╭|^╰" &
  local pid=$!
  while kill -0 $pid 2>/dev/null; do sleep 15; echo "  ... $1 still running"; done
  wait $pid; echo "flow $1 done"
}
has() { [[ " $STEPS " == *" $1 "* ]]; }

xcrun simctl status_bar "$D" override --time "9:41" --batteryState charged --batteryLevel 100 --cellularMode active --cellularBars 4 --wifiBars 3
shot start

if has tabs; then
  flow safari-close-all; shot tabs-1-closed
  flow safari-type-first; shot tabs-2-first
  for u in "https://en.m.wikipedia.org/wiki/Banana_bread" "https://weather.com/weather/today/l/40.75,-73.99" "https://www.nps.gov/yose/index.htm" "https://news.ycombinator.com" "https://www.openstreetmap.org/#map=15/40.7411/-73.9897" "https://developer.mozilla.org/en-US/docs/Web/API/Window/open" "https://support.apple.com/guide/iphone/open-and-close-tabs-iph489b9313f/ios" "https://en.m.wiktionary.org/wiki/tab"; do
    xcrun simctl openurl "$D" "$u"; echo "opened $u"; sleep 5
  done
  sleep 5; shot tabs-3-last-page
  flow safari-overview; sleep 2; shot tabs-overview
fi

if has paste; then
  printf 'https://en.m.wikipedia.org/wiki/Banana_bread' | xcrun simctl pbcopy "$D"
  flow notes-paste; shot paste-notes
fi

if has globe; then
  flow notes-globe; shot globe-menu
fi

if has replace; then
  flow settings-text-replacement; shot text-replacement
fi

if has closetabs; then
  flow settings-close-tabs; shot close-tabs
fi

if has news; then
  xcrun simctl openurl "$D" "$GUARDIAN"; echo "opened guardian"; sleep 14; shot news-guardian
  xcrun simctl openurl "$D" "https://www.independent.co.uk/tech/siri-apple-iphone-personal-agent-meta-muse-b3088666.html"; echo "opened independent"; sleep 14; shot news-independent
fi

if has back; then
  xcrun simctl openurl "$D" "https://undirect.matsuokengo.com/demo/back/"; echo "opened kickoff"; sleep 8; shot back-0-page
  flow back-list; shot back-list
fi

xcrun simctl status_bar "$D" clear
echo job-done
