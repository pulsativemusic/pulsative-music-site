import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

// ponytail: Sanity Studio needs unsafe-inline/eval; Astro CSP would brick /admin
const adminHtmlPath = resolve('dist/admin/index.html');
if (!existsSync(adminHtmlPath)) {
  process.exit(0);
}

const html = readFileSync(adminHtmlPath, 'utf8');
const stripped = html.replace(
  /<meta\s+http-equiv=["']content-security-policy["'][^>]*>\s*/gi,
  '',
);

if (stripped !== html) {
  writeFileSync(adminHtmlPath, stripped);
  console.log('[build] Stripped CSP meta from dist/admin/index.html');
}
