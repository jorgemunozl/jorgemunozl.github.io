import { copyFileSync, existsSync } from 'node:fs';

const source = 'docs/index.html';
const target = 'docs/404.html';

if (!existsSync(source)) {
  console.error('Cannot create docs/404.html because docs/index.html is missing. Run the build first.');
  process.exit(1);
}

copyFileSync(source, target);
console.log('Created docs/404.html for GitHub Pages single-page app routing.');
