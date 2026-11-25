#!/bin/zsh
# Installs the LaunchAgent that runs x-reply-sitting.sh at 19:13 and 21:47 local time every day.
# Remove: launchctl bootout gui/$(id -u)/co.monholt.x-replies; rm ~/Library/LaunchAgents/co.monholt.x-replies.plist
P="$HOME/Library/LaunchAgents/co.monholt.x-replies.plist"
cat > "$P" <<PL
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>Label</key><string>co.monholt.x-replies</string>
  <key>ProgramArguments</key><array><string>$HOME/Repositories/undirect/Support/social/x-reply-sitting.sh</string></array>
  <key>StartCalendarInterval</key><array>
    <dict><key>Hour</key><integer>19</integer><key>Minute</key><integer>13</integer></dict>
    <dict><key>Hour</key><integer>21</integer><key>Minute</key><integer>47</integer></dict>
  </array>
  <key>StandardErrorPath</key><string>$HOME/Library/Logs/monholt-x-replies.err</string>
</dict></plist>
PL
launchctl bootout gui/$(id -u)/co.monholt.x-replies 2>/dev/null
launchctl bootstrap gui/$(id -u) "$P" && launchctl print gui/$(id -u)/co.monholt.x-replies | grep -E "state|path"
