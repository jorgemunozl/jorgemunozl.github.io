#!/usr/bin/env bash
# Build the site into docs/, commit if there are changes, and push master.
# GitHub Pages: Settings → Pages → Deploy from branch → master → /docs
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

pnpm run build
git add docs
if git diff --staged --quiet; then
  echo "No changes under docs/ to commit (site already up to date)."
  exit 0
fi

git commit -m "chore: deploy site to GitHub Pages (docs/)"
git push origin HEAD
