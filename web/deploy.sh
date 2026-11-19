#!/usr/bin/env bash
# Build, check and publish the website.
#
#   web/deploy.sh build   generate the site from web/ (50 languages, sitemap, 404)
#   web/deploy.sh check   build, then validate links, hreflang and the sitemap
#   web/deploy.sh serve   build and serve the site at http://127.0.0.1:8790
#   web/deploy.sh web     build, check, then push the site to the gh-pages branch
# The site is built into <build-dir.sh>/site, a temp folder outside the repo.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
GEN="$REPO_ROOT/web/_generator"
DIST="$("$REPO_ROOT/build-dir.sh")/site"

build() { python3 "$GEN/generate.py" --output-dir "$DIST"; echo "Site built in $DIST"; }
check() { build; python3 "$GEN/validate.py" "$DIST"; }

deploy_web() {
  check
  # gh-pages becomes exactly the built site, so the CNAME must be in it or the deploy
  # silently unsets undirect.matsuokengo.com.
  [ -f "$DIST/CNAME" ] || { echo "$DIST/CNAME is missing" >&2; exit 1; }
  git -C "$REPO_ROOT" fetch origin gh-pages
  # Commit the built site onto gh-pages through a throwaway index: nothing is checked out.
  PARENT="$(git -C "$REPO_ROOT" rev-parse FETCH_HEAD)"
  INDEX="$(mktemp)"; rm -f "$INDEX"
  GIT_INDEX_FILE="$INDEX" git -C "$REPO_ROOT" --work-tree="$DIST" add -A .
  TREE="$(GIT_INDEX_FILE="$INDEX" git -C "$REPO_ROOT" write-tree)"
  rm -f "$INDEX"
  if [ "$TREE" = "$(git -C "$REPO_ROOT" rev-parse "$PARENT^{tree}")" ]; then
    echo "Nothing to deploy: gh-pages is already up to date."
  else
    COMMIT="$(git -C "$REPO_ROOT" commit-tree "$TREE" -p "$PARENT" -m "Deploy website $(date +%Y-%m-%d)")"
    git -C "$REPO_ROOT" push origin "$COMMIT:refs/heads/gh-pages"
    echo "Deployed."
    # IndexNow: a failed ping is printed, never fatal. The key file ships in the site.
    python3 "$GEN/generate.py" --output-dir "$DIST" --indexnow || echo "WARNING: IndexNow step failed"
  fi
}

case "${1:-help}" in
  build) build ;;
  check) check ;;
  serve) build; cd "$DIST" && exec python3 -m http.server 8790 --bind 127.0.0.1 ;;
  web)   deploy_web ;;
  *)     sed -n '2,8p' "$0" ;;
esac
