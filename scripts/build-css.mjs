#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const input = join(root, 'assets/css/tailwind-input.css');
const twOut = join(root, 'assets/css/app.tailwind.css');
const styles = join(root, 'assets/css/styles.css');
const out = join(root, 'assets/css/app.css');

const candidates = [
  join(root, 'node_modules/.bin/tailwindcss'),
  join(root, 'scripts/bin/tailwindcss'),
];
const bin = candidates.find((p) => existsSync(p));
if (!bin) {
  console.error('Tailwind CLI not found. Run: npm install');
  process.exit(1);
}

execFileSync(bin, ['-i', input, '-o', twOut, '--minify'], {
  stdio: 'inherit',
  cwd: root,
});

const css = `${readFileSync(twOut, 'utf8')}\n${readFileSync(styles, 'utf8')}\n`;
writeFileSync(out, css);
console.log(`Wrote ${out} (${Buffer.byteLength(css)} bytes)`);
