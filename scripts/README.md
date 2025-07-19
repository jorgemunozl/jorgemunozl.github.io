# Scripts Documentation

## generate-notes.js

This script automatically scans the `src/components/Notes/` directory for `.md` files and generates TypeScript data files for your blog.

### What it does:

1. **Scans** all `.md` files in `src/components/Notes/`
2. **Parses** frontmatter (metadata at the top of markdown files)
3. **Generates** excerpts from the content
4. **Calculates** estimated read time
5. **Creates** `src/data/notes.ts` with all blog post data

### Usage:

```bash
# Generate notes data manually
npm run generate-notes

# Generate notes and start development server
npm run dev:notes
```

### Frontmatter Support:

The script supports YAML frontmatter at the top of your markdown files:

```yaml
---
title: "Custom Title"
author: "Your Name" 
date: "2025-01-15"
tags:
  - javascript
  - react
---
```

### Supported Properties:

- `title`: Custom title (defaults to filename)
- `author`: Author name
- `date`: Publication date (defaults to current date)
- `tags`: Array of tags

### Adding New Notes:

1. Create a new `.md` file in `src/components/Notes/`
2. Add frontmatter if desired
3. Run `npm run generate-notes`
4. The new note will automatically appear on your website!

### Example Workflow:

```bash
# 1. Add a new markdown file
echo "# My New Note\n\nThis is my content..." > src/components/Notes/my-new-note.md

# 2. Generate the data
npm run generate-notes

# 3. Start the dev server
npm run dev
```

Your new note will now be available on the website!
