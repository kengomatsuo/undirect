#!/bin/bash
# Check every locale folder against Apple's limits: name and subtitle 30
# characters, keywords 100 UTF-8 bytes, promotional text 170 characters,
# description 4000 characters, release notes 4000 characters.
# Usage: ./fastlane/verify_metadata.sh
set -uo pipefail
cd "$(dirname "$0")/.."
python3 - fastlane/metadata fastlane/metadata_mac <<'PYEOF'
import os, sys
chars = {"name.txt": 30, "subtitle.txt": 30, "promotional_text.txt": 170,
         "description.txt": 4000, "release_notes.txt": 4000}
required = list(chars) + ["keywords.txt", "support_url.txt", "privacy_url.txt"]
errors = 0
total = 0
for root in sys.argv[1:]:
    for loc in sorted(os.listdir(root)):
        d = os.path.join(root, loc)
        if not os.path.isdir(d):
            continue
        total += 1
        for f in required:
            p = os.path.join(d, f)
            if not os.path.isfile(p):
                print(f"FAIL {root}/{loc}/{f} missing"); errors += 1; continue
            text = open(p, encoding="utf-8").read().rstrip("\n")
            if not text:
                print(f"FAIL {root}/{loc}/{f} empty"); errors += 1; continue
            if f == "keywords.txt":
                n = len(text.encode("utf-8"))
                if n > 100:
                    print(f"FAIL {root}/{loc}/{f} {n}/100 bytes"); errors += 1
            elif f in chars and len(text) > chars[f]:
                print(f"FAIL {root}/{loc}/{f} {len(text)}/{chars[f]} chars"); errors += 1
print(f"{total} locale folders checked, {errors} error(s)")
sys.exit(1 if errors else 0)
PYEOF
