#!/bin/zsh
# One @monholtco reply sitting on one platform, started by launchd (co.monholt.<platform>-replies).
# Usage: reply-sitting.sh <platform>   runs the brief <platform>-reply-sitting.md beside this file.
# Opens Chrome when it is closed, because replies go through Claude in Chrome on the owner's signed-in session;
# a cloud routine cannot reach it.
set -u
NAME="${1:-x}"
REPO="$HOME/Repositories/undirect"
BRIEF="$REPO/Support/social/$NAME-reply-sitting.md"
LOG="$HOME/Library/Logs/monholt-$NAME-replies.log"
export PATH="$HOME/.local/bin:$HOME/.bun/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin"
echo "=== $(date '+%F %T') start" >> "$LOG"
if ! pgrep -x "Google Chrome" >/dev/null; then
  open -g -a "Google Chrome" && sleep 20
fi
cd "$REPO" && git pull -q --no-rebase >> "$LOG" 2>&1
bun "$HOME/.claude/scripts/limit.ts" 3600 claude -p --chrome --permission-mode auto "$(cat "$BRIEF")" >> "$LOG" 2>&1
echo "=== $(date '+%F %T') end ($?)" >> "$LOG"
