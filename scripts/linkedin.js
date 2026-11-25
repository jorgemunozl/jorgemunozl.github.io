#!/usr/bin/env node
// Minimal LinkedIn poster. No dependencies (Node 18+).
//
//   node scripts/linkedin.js auth-url            print the URL to authorize your app
//   node scripts/linkedin.js token <code>        exchange the ?code=... for an access token
//   node scripts/linkedin.js post <noteId> [--send]   dry-run by default; --send publishes
//
// Env (put in .env.linkedin, which is git-ignored):
//   LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET
//   LINKEDIN_REDIRECT_URI   (must match the app, e.g. https://jorgemunozl.github.io/)
//   LINKEDIN_ACCESS_TOKEN   (after `token`)
//   LINKEDIN_VERSION        (optional, YYYYMM; default below)
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const envFile = join(root, '.env.linkedin');
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}
const env = (k) => {
  if (!process.env[k]) { console.error(`Missing ${k}`); process.exit(1); }
  return process.env[k];
};
const SITE = 'https://jorgemunozl.github.io';
const VERSION = process.env.LINKEDIN_VERSION || '202511';
const SCOPES = 'openid profile w_member_social';

const [cmd, arg, flag] = process.argv.slice(2);

if (cmd === 'auth-url') {
  const q = new URLSearchParams({
    response_type: 'code',
    client_id: env('LINKEDIN_CLIENT_ID'),
    redirect_uri: env('LINKEDIN_REDIRECT_URI'),
    scope: SCOPES,
    state: 'munblog',
  });
  console.log(`https://www.linkedin.com/oauth/v2/authorization?${q}`);
} else if (cmd === 'token') {
  if (!arg) { console.error('usage: token <code>'); process.exit(1); }
  const res = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: arg,
      client_id: env('LINKEDIN_CLIENT_ID'),
      client_secret: env('LINKEDIN_CLIENT_SECRET'),
      redirect_uri: env('LINKEDIN_REDIRECT_URI'),
    }),
  });
  const j = await res.json();
  if (!res.ok) { console.error(j); process.exit(1); }
  console.log(`LINKEDIN_ACCESS_TOKEN=${j.access_token}\n# expires in ${Math.round(j.expires_in / 86400)} days`);
} else if (cmd === 'post') {
  const src = readFileSync(join(root, 'src/components/data/notesMeta.ts'), 'utf8');
  const posts = JSON.parse(src.slice(src.indexOf('= [') + 2, src.lastIndexOf(']') + 1));
  const note = posts.find((p) => p.id === arg);
  if (!note) { console.error(`No note with id "${arg}". Ids: ${posts.map((p) => p.id).join(', ')}`); process.exit(1); }
  const url = `${SITE}/notes/${note.id}`;
  const commentary = `${note.title}\n\n${note.excerpt.replace(/\.\.\.$/, '…')}\n\n${url}`;
  console.log('--- post preview ---\n' + commentary + '\n--------------------');
  if (flag !== '--send') { console.log('Dry run. Add --send to publish.'); process.exit(0); }

  const token = env('LINKEDIN_ACCESS_TOKEN');
  const me = await (await fetch('https://api.linkedin.com/v2/userinfo', { headers: { Authorization: `Bearer ${token}` } })).json();
  if (!me.sub) { console.error('Could not read profile:', me); process.exit(1); }
  const res = await fetch('https://api.linkedin.com/rest/posts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Linkedin-Version': VERSION,
      'X-Restli-Protocol-Version': '2.0.0',
    },
    body: JSON.stringify({
      author: `urn:li:person:${me.sub}`,
      commentary,
      visibility: 'PUBLIC',
      distribution: { feedDistribution: 'MAIN_FEED', targetEntities: [], thirdPartyDistributionChannels: [] },
      content: { article: { source: url, title: note.title, description: note.excerpt } },
      lifecycleState: 'PUBLISHED',
      isReshareDisabledByAuthor: false,
    }),
  });
  if (res.status === 201) console.log('Posted:', res.headers.get('x-restli-id'));
  else { console.error(res.status, await res.text()); process.exit(1); }
} else {
  console.log('usage: auth-url | token <code> | post <noteId> [--send]');
}
