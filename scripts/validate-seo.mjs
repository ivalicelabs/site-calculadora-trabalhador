/**
 * Validação local de sitemap + JSON-LD (sem rede).
 * Uso: node scripts/validate-seo.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];

function walkHtml(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules' || name === '.git') continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walkHtml(p, out);
    else if (name === 'index.html') out.push(p);
  }
  return out;
}

const sitemap = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
const locs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
if (locs.length < 20) errors.push(`sitemap too small: ${locs.length}`);

const pages = walkHtml(ROOT);
for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(ROOT, file);
  if (!html.includes('rel="canonical"')) errors.push(`${rel}: missing canonical`);
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
  for (const m of blocks) {
    try {
      const data = JSON.parse(m[1]);
      const type = Array.isArray(data) ? data.map((d) => d['@type']).join(',') : data['@type'];
      if (!type) errors.push(`${rel}: ld+json without @type`);
    } catch (e) {
      errors.push(`${rel}: invalid JSON-LD (${e.message})`);
    }
  }
}

const calcDir = path.join(ROOT, 'calculadoras');
for (const slug of fs.readdirSync(calcDir)) {
  const html = fs.readFileSync(path.join(calcDir, slug, 'index.html'), 'utf8');
  const faq = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
    .map((m) => JSON.parse(m[1]))
    .find((d) => d['@type'] === 'FAQPage');
  if (!faq || !faq.mainEntity || faq.mainEntity.length < 8) {
    errors.push(`calculadoras/${slug}: FAQPage needs >= 8 items`);
  }
  if (!html.includes('id="calc-form"')) errors.push(`calculadoras/${slug}: missing form`);
}

const salvos = fs.readFileSync(path.join(ROOT, 'salvos/index.html'), 'utf8');
if (!/name="robots" content="noindex/.test(salvos)) errors.push('salvos: expected noindex robots');
if (/name="googlebot" content="index/.test(salvos)) errors.push('salvos: googlebot still index');

for (const name of fs.readdirSync(ROOT)) {
  if (!name.startsWith('salario-liquido-') || name === 'salario-liquido') continue;
  const file = path.join(ROOT, name, 'index.html');
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, 'utf8');
  const rel = `${name}/index.html`;
  if (!html.includes('/calculadoras/salario-liquido/')) {
    errors.push(`${rel}: missing CTA to salario-liquido calculator`);
  }
  const types = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(
    (m) => JSON.parse(m[1])['@type'],
  );
  if (!types.includes('WebPage')) errors.push(`${rel}: missing WebPage`);
  if (!types.includes('BreadcrumbList')) errors.push(`${rel}: missing BreadcrumbList`);
}

if (errors.length) {
  console.error('FAIL');
  for (const e of errors) console.error(' -', e);
  process.exit(1);
}
console.log('OK', { pages: pages.length, sitemap: locs.length });
