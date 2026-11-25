#!/bin/zsh
# One @monholtco X reply sitting, started by launchd (co.monholt.x-replies). Opens Chrome when it is closed,
# because the replies go through Claude in Chrome on the owner's signed-in X session.
set -u
REPO="$HOME/Repositories/undirect"
LOG="$HOME/Library/Logs/monholt-x-replies.log"
export PATH="$HOME/.local/bin:$HOME/.bun/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin"
echo "=== $(date '+%F %T') start" >> "$LOG"
if ! pgrep -x "Google Chrome" >/dev/null; then
  open -g -a "Google Chrome" && sleep 20
fi
cd "$REPO" && git pull -q --no-rebase >> "$LOG" 2>&1
bun "$HOME/.claude/scripts/limit.ts" 3600 claude -p --chrome --permission-mode auto \
  "$(cat "$REPO/Support/social/x-reply-sitting.md")" >> "$LOG" 2>&1
echo "=== $(date '+%F %T') end ($?)" >> "$LOG"
