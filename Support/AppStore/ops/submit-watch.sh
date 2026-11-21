#!/bin/sh
# Runs on stya-prod every 15 minutes (undirect-submit-watch.timer). Submits Undirect 1.1.0 on each
# platform the moment 1.0.5 is on the store there (owner's yes, 2026-11-21), pings Discord on each new
# submission or new error, and stops its timer once both platforms are submitted.
set -u
D=/opt/undirect-watch
. /etc/stya/ops.env 2>/dev/null
out=$(cd $D && ASC_KEY_ID=8R8JCJZUNJ ASC_PRIVATE_KEY_PATH=$D/asc.p8 python3 submit_version.py 1.1.0 20 1.0.5 2>&1)
code=$?
news=$(echo "$out" | grep -E "just now|ERROR")
if [ -n "$news" ] && [ "$news" != "$(cat $D/submit-last 2>/dev/null)" ]; then
  echo "$news" > $D/submit-last
  msg="Undirect 1.1.0 store submission: $(echo "$news" | tr '\n' ' ') ${OPS_DISCORD_PING:-}"
  python3 -c 'import json,sys;print(json.dumps({"content":sys.argv[1]}))' "$msg" | curl -fsS -H 'Content-Type: application/json' -d @- "$OPS_DISCORD_WEBHOOK_URL"
fi
echo "$out"
[ $code -eq 0 ] && systemctl disable --now undirect-submit-watch.timer
exit 0
