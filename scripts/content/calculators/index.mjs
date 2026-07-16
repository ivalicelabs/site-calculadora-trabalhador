/** Per-calculator SEO content registry (co-located; same texts as before). */

import adicionalNoturno from './adicional-noturno.mjs';
import decimoTerceiro from './decimo-terceiro.mjs';
import ferias from './ferias.mjs';
import fgts from './fgts.mjs';
import horaExtra from './hora-extra.mjs';
import inss from './inss.mjs';
import irrf from './irrf.mjs';
import rescisao from './rescisao.mjs';
import salarioLiquido from './salario-liquido.mjs';
import seguroDesemprego from './seguro-desemprego.mjs';

export const CALCULATOR_CONTENT = [
  salarioLiquido,
  fgts,
  ferias,
  decimoTerceiro,
  rescisao,
  horaExtra,
  adicionalNoturno,
  inss,
  seguroDesemprego,
  irrf,
];

export function buildHowToBySlug() {
  return Object.fromEntries(CALCULATOR_CONTENT.map((c) => [c.slug, c.howto]));
}

export function buildRelatedBySlug() {
  return Object.fromEntries(CALCULATOR_CONTENT.map((c) => [c.slug, c.related]));
}

export function buildFaqBySlug(year) {
  return Object.fromEntries(
    CALCULATOR_CONTENT.map((c) => [c.slug, typeof c.faqs === 'function' ? c.faqs(year) : c.faqs]),
  );
}

export function getCalculatorContent(slug) {
  return CALCULATOR_CONTENT.find((c) => c.slug === slug);
}
