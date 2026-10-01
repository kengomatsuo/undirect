#!/usr/bin/env bash
# Build, check and publish the website.
#
#   web/deploy.sh build   generate dist/ from web/ (50 languages, sitemap, 404)
#   web/deploy.sh check   build, then validate links, hreflang and the sitemap
#   web/deploy.sh serve   build and serve dist/ at http://127.0.0.1:8790
#   web/deploy.sh web     build, check, then push dist/ to the gh-pages branch
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
GEN="$REPO_ROOT/web/_generator"
DIST="$REPO_ROOT/dist"

build() { python3 "$GEN/generate.py" --output-dir "$DIST"; }
check() { build; python3 "$GEN/validate.py" "$DIST"; }

deploy_web() {
  check
  # The CNAME rides along in dist/ because rsync --delete would otherwise wipe it
  # from gh-pages and silently unset undirect.matsuokengo.com.
  [ -f "$DIST/CNAME" ] || { echo "dist/CNAME is missing" >&2; exit 1; }
  git -C "$REPO_ROOT" fetch origin gh-pages
  WORKTREE="$(mktemp -d)"
  git -C "$REPO_ROOT" worktree add "$WORKTREE" origin/gh-pages --detach
  rsync -a --delete --exclude='.git' "$DIST/" "$WORKTREE/"
  (
    cd "$WORKTREE"
    git add -A
    if git diff --cached --quiet; then
      echo "Nothing to deploy: gh-pages is already up to date."
    else
      git commit -q -m "Deploy website $(date +%Y-%m-%d)"
      git push origin HEAD:gh-pages
      echo "Deployed."
    fi
  )
  git -C "$REPO_ROOT" worktree remove --force "$WORKTREE"
}

case "${1:-help}" in
  build) build ;;
  check) check ;;
  serve) build; cd "$DIST" && exec python3 -m http.server 8790 --bind 127.0.0.1 ;;
  web)   deploy_web ;;
  *)     sed -n '2,9p' "$0" ;;
esac
