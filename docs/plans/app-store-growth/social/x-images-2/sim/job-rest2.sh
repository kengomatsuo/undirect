#!/bin/bash
# The iPhone captures after the nine tabs, in one Maestro run (rest2.yaml), through the device queue:
#   bun ~/.claude/scripts/device-queue/device-queue.ts submit ios-sim --form iphone --tree <repo> --cmd 'bash <this file>' --who x-photo-posts --cap 45
# A heartbeat line keeps the job's log growing while Maestro's driver starts, or the queue ends the job as idle;
# grep runs line-buffered so the log shows each step as it happens.
HERE="$(cd "$(dirname "$0")" && pwd)"
OUT="$HERE/../src/sim"
mkdir -p "$OUT"
D="${DEVICE_QUEUE_UDID:-626CECA3-66AF-4284-921F-C7A8FD05FA08}"
export JAVA_HOME=/opt/homebrew/opt/openjdk/libexec/openjdk.jdk/Contents/Home
export PATH="$JAVA_HOME/bin:$PATH"
export MAESTRO_DRIVER_STARTUP_TIMEOUT=300000
export MAESTRO_CLI_NO_ANALYTICS=1 MAESTRO_CLI_ANALYSIS_NOTIFICATION_DISABLED=true
xcrun simctl status_bar "$D" override --time "9:41" --batteryState charged --batteryLevel 100 --cellularMode active --cellularBars 4 --wifiBars 3
printf 'https://en.wikipedia.org/wiki/Banana_bread' | xcrun simctl pbcopy "$D"
cd "$OUT"
touch "$OUT/.rest2-start"
"$HOME/.maestro/bin/maestro" --device "$D" test "$HERE/rest2.yaml" 2>&1 | grep --line-buffered -v -E "^WARNING|^│|^╭|^╰" &
pid=$!
while kill -0 $pid 2>/dev/null; do sleep 15; echo "  ... rest2 still running"; done
wait $pid
xcrun simctl io "$D" screenshot "$OUT/rest2-end.png" >/dev/null 2>&1
find "$HERE" "$HOME/.maestro/tests" -name 'rest-*.png' -newer "$OUT/.rest2-start" -exec cp {} "$OUT/" \; 2>/dev/null
xcrun simctl status_bar "$D" clear
ls "$OUT"
echo job-done
