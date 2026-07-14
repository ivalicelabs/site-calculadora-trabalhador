/** Valores em centavos (Money). */

export function fromReais(value) {
  return Math.round(value * 100);
}

export function toReais(cents) {
  return cents / 100;
}

export function formatBRL(cents) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(cents / 100);
}

export function parseBRLInput(raw) {
  const cleaned = String(raw ?? '')
    .replace(/[^\d,.-]/g)
    .replace(/\./g, '')
    .replace(',', '.');
  const n = Number.parseFloat(cleaned);
  if (Number.isNaN(n)) return 0;
  return fromReais(n);
}
