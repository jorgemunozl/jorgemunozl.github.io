# Site content maintenance

This is the **canonical guide** for updating [jorgemunozl.github.io](https://jorgemunozl.github.io/). Paths are relative to the repo root.

---

## Dev, build, and deploy

| Command | What it does |
|--------|----------------|
| `npm install` | Install dependencies (first time or after dependency changes). |
| `npm run dev` | Runs `generate-notes`, then starts Vite dev server (see `package.json`). |
| `npm run build` | Runs `generate-notes`, then production build into `docs/`. |
| `npm run preview` | Serves the last build locally. |
| `npm run generate-notes` | Regenerates note metadata and graph only (same step `dev`/`build` run first). |
| `npm run deploy` | Runs `scripts/deploy-master.sh`: **`pnpm run build`**, commits `docs/` if changed, pushes. |

**GitHub Pages:** deploy from branch **master**, folder **`/docs`** (see comment in `scripts/deploy-master.sh`).

---

## Static assets (PDFs, images)

Vite copies everything under [`public/`](public/) into the site root in the build output (`docs/`). Use **root-relative URLs** in code:

- PDFs: put files in `public/pdfs/`, reference as `/pdfs/your-file.pdf`.
- Images for About, Timeline, portfolio heroes, etc.: put files in `public/images/`, reference as `/images/your-file.jpg`.

**Rule of thumb:** If a URL starts with `/`, the file should exist under `public/` (not only inside committed `docs/`, which is overwritten on each build). Keeping sources in `public/` avoids broken links after a clean build.

---

## Portfolio projects

**File:** [`src/components/data/projects.ts`](src/components/data/projects.ts)

1. Add or edit an object in the `projects` array.
2. **Paper button:** set `paperPdf` to a path like `/pdfs/my-paper.pdf` and add the PDF under `public/pdfs/`. Omit `paperPdf` if a project should not show Paper.
3. **arXiv icon next to “Paper”:** `showArxivLogo: false` hides only the icon; the Paper label stays. If omitted, the icon shows (same as `true`).
4. **Hero media:** optional `heroVideo` (URL or path); optional `heroImage` (often used as video `poster` in the UI). If there is no video, the card uses `heroImage` as a still.
5. **Detail page:** same data drives `/portfolio/:projectId` via [`src/pages/ProjectDetail.tsx`](src/pages/ProjectDetail.tsx).

The portfolio grid lives in [`src/components/Portfolio.tsx`](src/components/Portfolio.tsx).

---

## About page facts

**File:** [`src/content/aboutFacts.ts`](src/content/aboutFacts.ts)

Each fact needs: `id`, `title`, `body`, `image` (root-relative path), `imageAlt`. Use images under `public/images/` as described above.

---

## Timeline

**File:** [`src/pages/Timeline.tsx`](src/pages/Timeline.tsx)

Events are in the `timelineSections` array. Each event can include `title`, `description`, `image`, `imageAlt`, and optional `date` (`YYYY-MM-DD`). Same image URL rules as About facts.

---

## Notes (add, update, featured)

### Where the markdown lives

[`scripts/generate-notes.js`](scripts/generate-notes.js) scans:

1. **`src/components/Featured Notes/`** — featured posts (folder name includes a space).
2. **`src/components/Notes/`** — non-featured posts (folder may be empty; the script skips missing dirs).

Only **`.md`** files are picked up.

### After you add or edit a note

Run **`npm run dev`** or **`npm run build`**, or manually:

```bash
npm run generate-notes
```

You normally **commit** the generated outputs together with your `.md` changes so the site and CI stay in sync.

### What gets generated (do not hand-edit)

| Output | Purpose |
|--------|---------|
| [`src/components/data/notesMeta.ts`](src/components/data/notesMeta.ts) | Exports `blogPostsMeta` (titles, excerpts, dates, read times, ids, featured flag, etc.). |
| [`src/components/data/prebuiltGraph.ts`](src/components/data/prebuiltGraph.ts) | Wiki-link graph data for the notes graph view. |
| `public/notes/<id>.json` | One JSON file per note with the **markdown body** (fetched at runtime). |

### Frontmatter

Optional YAML at the top of a note:

```yaml
---
title: "Custom title"
date: "2026-04-30"
---
```

If `title` is omitted, the script derives a title from the filename. If `date` is omitted, it uses today’s date (see `generate-notes.js`).

### Wiki links and the graph

Use Obsidian-style links in the markdown body:

```markdown
See [[Some Other Note Title]] for details.
```

The graph builder resolves targets by normalized title / filename. Link text can use `[[Target|display text]]`.

### Images inside notes

- Standard markdown: `![alt](relative-path.png)`.
- The script also normalizes some Obsidian-style image syntax and copies resolved image files into **`public/notes-assets/<note-slug>/`** and rewrites URLs in the stored body. Keep images next to the `.md` or use paths the script can resolve (see `rewriteAndCopyImages` in `generate-notes.js`).

---

## Optional: `analyze-notes`

**Command:** `npm run analyze-notes`

**Script:** [`scripts/analyze-notes.js`](scripts/analyze-notes.js)

This tool only reads **`src/components/Notes/`** (not `Featured Notes/`). Use it as a quick stats pass; the **full** pipeline for the live site is **`npm run generate-notes`**.

---

## Awards, certifications, extra PDFs

| What | Where to edit |
|------|----------------|
| Awards / certification PDFs on About | [`src/content/credentials.ts`](src/content/credentials.ts) — add entries with `pdfUrl` like `/pdfs/...` and place files in `public/pdfs/`. |
| “Additional contents” PDF list | [`src/pages/AdditionalContents.tsx`](src/pages/AdditionalContents.tsx) — top-of-file array (paths under `public/pdfs/` or URLs). |

---

## Quick checklist

- [ ] New PDF → `public/pdfs/` + correct `/pdfs/...` path in data/TSX.
- [ ] New image for About/Timeline/portfolio → `public/images/` + `/images/...` in TS.
- [ ] New or edited note → `.md` in `Featured Notes` or `Notes` → `npm run generate-notes` (or `npm run dev` / `npm run build`) → commit `notesMeta.ts`, `prebuiltGraph.ts`, `public/notes/*.json`, and any `public/notes-assets/` changes.
- [ ] Deploy → `npm run deploy` (requires `pnpm` for the build step inside the script) or run `npm run build` and commit `docs/` yourself.
