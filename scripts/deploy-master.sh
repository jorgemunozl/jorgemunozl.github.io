#!/usr/bin/env bash
# Build the site into docs/, commit if there are changes, and push master.
# GitHub Pages: Settings → Pages → Deploy from branch → master → /docs
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

pnpm run build
git add docs
if git diff --staged --quiet; then
  echo "docs/ is identical to the last commit — rebuild matched, so there is nothing new to commit."
  echo "That is normal if you have not changed the app or notes since the last deploy."
else
  git commit -m "chore: deploy site to GitHub Pages (docs/)"
fi

git push origin HEAD
