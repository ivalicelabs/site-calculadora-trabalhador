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

/** Formata digitos digitados da direita (centavos): "4000" → "40,00" */
export function maskCurrencyDigits(raw) {
  const digits = String(raw ?? '').replace(/\D/g, '').slice(0, 15);
  if (!digits) return '';
  const cents = Number.parseInt(digits, 10);
  if (Number.isNaN(cents)) return '';
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

export function parseBRLInput(raw) {
  const s = String(raw ?? '').trim();
  if (!s) return 0;
  // Digitos crus = entrada por centavos (ex.: "4000" → R$ 40,00)
  if (/^\d+$/.test(s)) {
    return Number.parseInt(s, 10);
  }
  const cleaned = s
    .replace(/[^\d,.-]/g)
    .replace(/\./g, '')
    .replace(',', '.');
  const n = Number.parseFloat(cleaned);
  if (Number.isNaN(n)) return 0;
  return fromReais(n);
}

/** Aplica máscara automática em inputs com data-currency. */
export function bindCurrencyMasks(root = document) {
  root.querySelectorAll('input[data-currency]').forEach((input) => {
    if (input.dataset.currencyBound === '1') return;
    input.dataset.currencyBound = '1';
    input.setAttribute('inputmode', 'numeric');
    input.setAttribute('autocomplete', 'off');

    const apply = () => {
      const next = maskCurrencyDigits(input.value);
      if (input.value !== next) {
        input.value = next;
      }
      const len = input.value.length;
      try {
        input.setSelectionRange(len, len);
      } catch {
        /*ignore*/
      }
    };

    input.addEventListener('input', apply);
    input.addEventListener('blur', () => {
      if (!input.value.trim()) return;
      input.value = maskCurrencyDigits(input.value);
    });
  });
}
