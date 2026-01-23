import { copyFileSync, existsSync } from 'node:fs';

const source = 'dist/index.html';
const target = 'dist/404.html';

if (!existsSync(source)) {
  console.error('Cannot create dist/404.html because dist/index.html is missing. Run the build first.');
  process.exit(1);
}

copyFileSync(source, target);
console.log('Created dist/404.html for GitHub Pages single-page app routing.');
