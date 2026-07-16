/** HTML helpers shared by generate.mjs */

export function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function ldScript(blocks) {
  const list = Array.isArray(blocks) ? blocks : blocks ? [blocks] : [];
  return list
    .map((block) => `<script type="application/ld+json">${JSON.stringify(block)}</script>`)
    .join('\n  ');
}
