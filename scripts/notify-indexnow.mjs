/**
 * Notifica IndexNow (Bing/Yandex/etc.) com as URLs do sitemap.
 * Uso: node scripts/notify-indexnow.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { INDEXNOW_KEY } from './content-seo.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const HOST = 'clt.ivalice.com.br';
const keyLocation = `https://${HOST}/${INDEXNOW_KEY}.txt`;

const xml = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const body = JSON.stringify({
  host: HOST,
  key: INDEXNOW_KEY,
  keyLocation,
  urlList,
});

const endpoints = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow',
];

for (const endpoint of endpoints) {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body,
    });
    console.log(endpoint, res.status, await res.text().then((t) => t.slice(0, 120)));
  } catch (err) {
    console.error(endpoint, err.message);
  }
}

console.log(`Submitted ${urlList.length} URLs`);
