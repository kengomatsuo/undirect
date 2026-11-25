#!/bin/zsh
# Installs the LaunchAgent that runs reply-sitting.sh <platform> at the given local times every day.
# Usage: install-reply-sittings.sh <platform> HH:MM [HH:MM ...]
#   X:       install-reply-sittings.sh x 19:13 21:47
#   Threads: install-reply-sittings.sh threads 07:41 16:53 23:09
# launchd's own processes may not read ~/Repositories (macOS answers "Operation not permitted"), so the agent only asks
# the running tmux server, which started from the terminal and may, to open a detached session that runs the sitting.
# A sitting still running keeps its session name, so the next start fails instead of overlapping it.
# Remove: launchctl bootout gui/$(id -u)/co.monholt.<platform>-replies; rm ~/Library/LaunchAgents/co.monholt.<platform>-replies.plist
set -eu
NAME="$1"; shift
LABEL="co.monholt.$NAME-replies"
P="$HOME/Library/LaunchAgents/$LABEL.plist"
TIMES=""
for t in "$@"; do
  TIMES+="    <dict><key>Hour</key><integer>$((10#${t%%:*}))</integer><key>Minute</key><integer>$((10#${t##*:}))</integer></dict>
"
done
cat > "$P" <<PL
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>Label</key><string>$LABEL</string>
  <key>ProgramArguments</key><array><string>/opt/homebrew/bin/tmux</string><string>new-session</string><string>-d</string><string>-s</string><string>$NAME-sitting</string><string>$HOME/Repositories/undirect/Support/social/reply-sitting.sh $NAME</string></array>
  <key>StartCalendarInterval</key><array>
$TIMES  </array>
  <key>StandardErrorPath</key><string>$HOME/Library/Logs/monholt-$NAME-replies.err</string>
</dict></plist>
PL
plutil -lint "$P"
launchctl bootout gui/$(id -u)/$LABEL 2>/dev/null || true
launchctl bootstrap gui/$(id -u) "$P" && launchctl print gui/$(id -u)/$LABEL | grep -E "state|path"
