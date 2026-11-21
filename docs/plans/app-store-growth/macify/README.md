# Macify (macify.app, formerly findmacapps.com) submission

Macify takes new apps only as a GitHub pull request to `Beingpax/macify`, one app per pull request. Its live listings link the maker's site with `rel="noopener noreferrer"` and no robots block (read on macify.app/apps/dayflow, 2026-11-21), so a listing is a followed link.

`undirect.json` and `cutling.json` here pass the repo's own validator (`scripts/validate-catalogue.mjs`, run 2026-11-21). Both apps meet its 30-day rule (Undirect on the App Store since 2026-09-21, Cutling since 2026-02-24).

The house guard blocks `gh pr create`, so the pull requests wait for the owner. The fork `kengomatsuo/macify` already exists. Steps:

1. Copy `undirect.json` to `catalog/apps/undirect.json` in the fork, commit, and open a pull request titled "Add Undirect" using the repo's pull request template (sources: the website, the App Store listing id6810513194, github.com/kengomatsuo/undirect).
2. After that one merges, do the same for `cutling.json` (App Store id6759476314, github.com/kengomatsuo/Cutling).

Use the GitHub noreply address for the commit so no personal email shows.
