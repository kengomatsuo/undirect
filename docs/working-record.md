# Working rules: the record

- **Push in the same turn as every commit.** The owner said "always push" on 2026-09-22. The push is preceded by the repo's check and reported as a pushed range.
- **Commit paths come from this session's own edits**, diffed against `git status` before the commit, because `git status --short` also lists other agents' files. Commit 13e83f4 (2026-10-01) swept in the promo-video agent's unfinished `web/demo/index.html`.
