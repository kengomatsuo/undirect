#!/bin/bash
# Settings > Apps > Safari > Close Tabs on the pool's iPhone simulator, for x35, through the device queue:
#   bun ~/.claude/scripts/device-queue/device-queue.ts submit ios-sim --form iphone --tree <repo> --cmd 'bash <this file>' --who x-photo-posts
# The queue ends a job whose log stops growing for a minute, so a heartbeat line prints while Maestro's driver starts.
# The other iPhone screens come from rest2.yaml (job-rest2.sh) and rest3.yaml (job-rest3.sh).
HERE="$(cd "$(dirname "$0")" && pwd)"
OUT="$HERE/../src/sim"
mkdir -p "$OUT"
D="${DEVICE_QUEUE_UDID:-626CECA3-66AF-4284-921F-C7A8FD05FA08}"
export JAVA_HOME=/opt/homebrew/opt/openjdk/libexec/openjdk.jdk/Contents/Home
export PATH="$JAVA_HOME/bin:$PATH"
export MAESTRO_DRIVER_STARTUP_TIMEOUT=240000
export MAESTRO_CLI_NO_ANALYTICS=1 MAESTRO_CLI_ANALYSIS_NOTIFICATION_DISABLED=true
xcrun simctl status_bar "$D" override --time "9:41" --batteryState charged --batteryLevel 100 --cellularMode active --cellularBars 4 --wifiBars 3
"$HOME/.maestro/bin/maestro" --device "$D" test "$HERE/settings-close-tabs.yaml" 2>&1 | grep --line-buffered -v -E "^WARNING|^│|^╭|^╰" &
pid=$!
while kill -0 $pid 2>/dev/null; do sleep 15; echo "  ... close-tabs still running"; done
wait $pid
xcrun simctl io "$D" screenshot "$OUT/close-tabs.png" >/dev/null 2>&1
xcrun simctl status_bar "$D" clear
echo job-done
