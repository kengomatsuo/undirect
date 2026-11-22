#!/bin/sh
# Pings Discord once when Undirect 1.0.5 reads READY_FOR_SALE on iOS, then stops its timer.
set -u
D=/opt/undirect-watch
state=$(ASC_PRIVATE_KEY_PATH=$D/asc.p8 python3 $D/asc_state.py 1.0.5 2>&1) || exit 0
. /etc/stya/ops.env 2>/dev/null
msg="Undirect 1.0.5 is LIVE on iOS ($(echo "$state" | tr '\n' ' ')). Release-day list: docs/plans/app-store-growth/undirect-105-launch.md in the undirect repo. ${OPS_DISCORD_PING:-}"
python3 -c 'import json,sys;print(json.dumps({"content":sys.argv[1]}))' "$msg" | curl -fsS -H 'Content-Type: application/json' -d @- "$OPS_DISCORD_WEBHOOK_URL" && systemctl disable --now undirect-release-watch.timer
