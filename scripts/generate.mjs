/**
 * Gera páginas estáticas do site (HTML puro + Tailwind CDN).
 * Executar: node scripts/generate.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  HOWTO_BY_SLUG,
  INDEXNOW_KEY,
  RELATED_BY_SLUG,
  guides,
  tabelasBody,
} from './content-seo.mjs';
import { buildFaqBySlug, getCalculatorContent } from './content/calculators/index.mjs';
import PROFISSOES_SALARIO_LIQUIDO from './content/programmatic/salario-liquido/profissoes.mjs';
import { esc, ldScript } from './lib/html.mjs';
import {
  articleLd,
  breadcrumbLd,
  collectionPageLd,
  faqPageLd,
  webApplicationLd,
  webPageLd,
  webSiteLd,
} from './lib/schema.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const SALARIOS_DATA = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, 'content/programmatic/salario-liquido/salarios.json'),
    'utf8',
  ),
);

function formatBrl(n) {
  return Number(n).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function salaryForSlug(slug) {
  const row = SALARIOS_DATA.bySlug?.[slug];
  if (!row) return null;
  return { ...row, meta: SALARIOS_DATA.meta };
}

const LEGISLATION_YEAR = 2026;
const TODAY = new Date().toISOString().slice(0, 10);
const CALCULATOR_COUNT = 10;

const SITE = {
  name: 'Guia do Trabalhador Brasileiro',
  url: 'https://clt.ivalice.com.br',
  description:
    'Guia do Trabalhador Brasileiro com calculadoras CLT gratuitas, salário líquido, FGTS, férias, rescisão, INSS, 13º salário e direitos trabalhistas.',
  organizationDescription: 'Portal brasileiro de calculadoras CLT e informações trabalhistas.',
  tagline: 'Calculadoras CLT, direitos trabalhistas e informações para trabalhadores brasileiros.',
  footerBlurb:
    'O portal completo para trabalhadores brasileiros encontrarem calculadoras CLT, direitos trabalhistas e informações atualizadas.',
  email: 'contato@ivalice.com.br',
  org: 'Ivalice Labs',
  version: '3.5.0',
  logo: 'https://clt.ivalice.com.br/assets/img/logo.png',
};

const EDITORIAL_DISCLAIMER =
  'O Guia do Trabalhador Brasileiro oferece informações educativas e ferramentas de cálculo. Os resultados são estimativas e podem variar conforme contrato, legislação vigente e condições específicas de trabalho.';

const CALCULATORS = [
  {
    slug: 'salario-liquido',
    id: 'salario_liquido',
    title: 'Salário Líquido',
    blurb: 'Quanto sobra após todos os descontos em folha.',
    keywords: 'calculadora salário líquido, salário líquido CLT',
    resultLabel: 'Salário Líquido',
    icon: 'banknote',
    home: true,
  },
  {
    slug: 'fgts',
    id: 'fgts',
    title: 'FGTS',
    blurb: 'Cálculo do Fundo de Garantia por Tempo de Serviço.',
    keywords: 'calculadora FGTS, depósito FGTS',
    resultLabel: 'Depósito mensal',
    icon: 'landmark',
    home: true,
  },
  {
    slug: 'ferias',
    id: 'ferias',
    title: 'Férias',
    blurb: 'Provisão de férias com 1/3 constitucional.',
    keywords: 'calculadora férias, terço constitucional',
    resultLabel: 'Líquido de férias',
    icon: 'sun',
    home: true,
  },
  {
    slug: 'decimo-terceiro',
    id: 'decimo_terceiro',
    title: '13° Salário',
    blurb: 'Estimativa das parcelas do décimo terceiro.',
    keywords: 'calculadora 13º salário',
    resultLabel: 'Total líquido',
    icon: 'gift',
    home: true,
  },
  {
    slug: 'rescisao',
    id: 'rescisao',
    title: 'Rescisão',
    blurb: 'Simulação completa do contrato de trabalho.',
    keywords: 'calculadora rescisão trabalhista',
    resultLabel: 'Total a receber',
    icon: 'file-x',
    home: true,
  },
  {
    slug: 'hora-extra',
    id: 'hora_extra',
    title: 'Hora Extra',
    blurb: 'Cálculo de 50%, 100% e adicionais.',
    keywords: 'calculadora hora extra',
    resultLabel: 'Total bruto',
    icon: 'clock',
    home: true,
  },
  {
    slug: 'adicional-noturno',
    id: 'adicional_noturno',
    title: 'Adicional Noturno',
    blurb: 'Adicional por trabalho entre 22h e 5h.',
    keywords: 'calculadora adicional noturno',
    resultLabel: 'Total da jornada noturna',
    icon: 'moon',
    home: true,
  },
  {
    slug: 'inss',
    id: 'inss',
    title: 'INSS',
    blurb: 'Tabela atualizada de contribuição previdenciária.',
    keywords: 'calculadora INSS',
    resultLabel: 'Contribuição INSS',
    icon: 'shield',
    home: true,
  },
  {
    slug: 'seguro-desemprego',
    id: 'seguro_desemprego',
    title: 'Seguro Desemprego',
    blurb: 'Cálculo de parcelas e elegibilidade.',
    keywords: 'calculadora seguro-desemprego',
    resultLabel: 'Valor da parcela',
    icon: 'umbrella',
    home: true,
  },
  {
    slug: 'irrf',
    id: 'irrf',
    title: 'IRRF',
    blurb: 'Imposto de Renda Retido na Fonte com dependentes.',
    keywords: 'calculadora IRRF',
    resultLabel: 'Imposto devido',
    icon: 'file',
    home: true,
  },
];

const ICONS = {
  banknote: `<svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/></svg>`,
  landmark: `<svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 21h18M10 8v8M14 8v8M6 8v8M18 8v8M12 3l9 5H3l9-5z"/></svg>`,
  sun: `<svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>`,
  gift: `<svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13M3 12h18M12 8c-2-3.5-5.5-3-5.5-1.5S8.5 9 12 8c2-3.5 5.5-3 5.5-1.5S15.5 9 12 8z"/></svg>`,
  'file-x': `<svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M10 12l4 4M14 12l-4 4"/></svg>`,
  clock: `<svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
  moon: `<svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 14.5A8.5 8.5 0 1 1 9.5 3 7 7 0 0 0 21 14.5z"/></svg>`,
  shield: `<svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3l8 4v5c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V7l8-4z"/><path d="M9 12l2 2 4-4"/></svg>`,
  umbrella: `<svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 13v7a2 2 0 0 1-4 0"/><path d="M12 3a9 9 0 0 1 9 9H3a9 9 0 0 1 9-9z"/></svg>`,
  file: `<svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></svg>`,
};

const FAQ_BY_SLUG = buildFaqBySlug(LEGISLATION_YEAR);

function head({
  title,
  description,
  keywords = '',
  canonical,
  active = '',
  jsonLd = null,
  robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  ogType = 'website',
}) {
  const fullTitle = title.includes(SITE.name) ? title : `${title} | ${SITE.name}`;
  const absolute = `${SITE.url}${canonical}`;
  const blocks = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];
  const allLd = blocks.length ? blocks : [webSiteLd(SITE)];
  const googlebot = robots.includes('noindex') ? 'noindex, follow' : 'index, follow';
  return `<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(fullTitle)}</title>
  <meta name="description" content="${esc(description)}">
  ${keywords ? `<meta name="keywords" content="${esc(keywords)}">` : ''}
  <meta name="theme-color" content="#1b5e3b">
  <meta name="robots" content="${robots}">
  <meta name="googlebot" content="${googlebot}">
  <meta name="author" content="${esc(SITE.org)}">
  <link rel="canonical" href="${absolute}">
  <link rel="alternate" hreflang="pt-BR" href="${absolute}">
  <link rel="alternate" hreflang="x-default" href="${absolute}">
  <meta property="og:type" content="${ogType}">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:title" content="${esc(fullTitle)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${absolute}">
  <meta property="og:site_name" content="${esc(SITE.name)}">
  <meta property="og:image" content="${SITE.logo}">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${esc(fullTitle)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${SITE.logo}">
  <link rel="icon" href="/assets/img/logo.png" type="image/png">
  <link rel="preload" href="/assets/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/poppins-700.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/css/app.css" as="style">
  <link rel="stylesheet" href="/assets/css/app.css">
  ${ldScript(allLd)}
</head>
<body class="min-h-screen bg-page text-ink antialiased" data-active="${active}">`;
}

function logoBlock() {
  return `<a href="/" class="flex items-center gap-3 shrink-0">
    <img src="/assets/img/logo.png" alt="${esc(SITE.name)}" width="38" height="40" class="h-10 w-[38px] object-contain">
    <span class="leading-tight">
      <span class="block font-display text-[15px] font-extrabold tracking-wide text-brand sm:text-[18px]">GUIA DO TRABALHADOR</span>
      <span class="block text-[10px] font-semibold uppercase tracking-wide text-ink-muted sm:text-[11px]">Brasileiro</span>
    </span>
  </a>`;
}

function header(active) {
  const link = (id, href, label) => {
    const on = active === id;
    return `<a href="${href}" class="relative font-display text-[15px] ${on ? 'nav-active font-semibold text-brand' : 'font-medium text-ink-muted hover:text-brand'}">${label}</a>`;
  };
  return `<header class="sticky top-0 z-50 border-b border-line bg-white">
    <div class="mx-auto flex h-16 max-w-site items-center justify-between gap-4 px-4 sm:h-20 sm:px-8 lg:px-12">
      ${logoBlock()}
      <nav class="hidden items-center gap-4 lg:flex xl:gap-6" aria-label="Principal">
        ${link('home', '/', 'Início')}
        ${link('calcs', '/#calculadoras', 'Calculadoras CLT')}
        ${link('direitos', '/#direitos', 'Direitos Trabalhistas')}
        ${link('salarios', '/#salarios', 'Salários por Profissão')}
        ${link('guides', '/guias/', 'Guias')}
        ${link('tables', `/tabelas-${LEGISLATION_YEAR}/`, 'Tabelas')}
      </nav>
      <div class="hidden items-center gap-4 xl:flex">
        <div class="relative">
          <label class="relative flex h-12 w-64 items-center gap-3 rounded-xl border border-line bg-white px-4 2xl:w-80">
            <svg class="h-5 w-5 shrink-0 text-ink-faint" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3-3"/></svg>
            <input type="search" data-header-search placeholder="Buscar no site..." class="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint" autocomplete="off" aria-autocomplete="list" aria-controls="header-search-results">
          </label>
          <div id="header-search-results" data-header-search-results class="absolute right-0 z-50 mt-2 hidden w-[min(100vw-2rem,22rem)] rounded-2xl border border-line bg-white p-2 shadow-card" role="listbox"></div>
        </div>
      </div>
      <button type="button" data-mobile-toggle class="mobile-toggle relative z-[60] inline-flex h-11 w-11 items-center justify-center rounded-xl text-ink hover:bg-page lg:hidden" aria-expanded="false" aria-controls="mobile-nav" aria-label="Abrir menu">
        <span class="mobile-toggle-icon" aria-hidden="true">
          <span class="mobile-toggle-line"></span>
          <span class="mobile-toggle-line"></span>
          <span class="mobile-toggle-line"></span>
        </span>
      </button>
    </div>
    <div data-mobile-backdrop class="mobile-backdrop lg:hidden" hidden></div>
    <div id="mobile-nav" data-mobile-nav class="mobile-nav lg:hidden" hidden>
      <div class="mobile-nav-inner">
        <div class="mobile-nav-search">
          <label class="flex h-12 items-center gap-3 rounded-xl border border-line bg-page px-4">
            <svg class="h-5 w-5 shrink-0 text-ink-faint" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3-3"/></svg>
            <input type="search" data-mobile-search placeholder="Buscar no site..." class="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint" autocomplete="off">
          </label>
          <div data-mobile-search-results class="mt-2 hidden rounded-2xl border border-line bg-white p-1" role="listbox"></div>
        </div>
        <nav class="mobile-nav-links" aria-label="Menu mobile">
          <p class="mobile-nav-label">Navegação</p>
          <a href="/" data-mobile-link class="mobile-nav-link${active === 'home' ? ' is-active' : ''}">Início</a>
          <a href="/#calculadoras" data-mobile-link class="mobile-nav-link${active === 'calcs' ? ' is-active' : ''}">Calculadoras CLT</a>
          <a href="/#direitos" data-mobile-link class="mobile-nav-link${active === 'direitos' ? ' is-active' : ''}">Direitos Trabalhistas</a>
          <a href="/#salarios" data-mobile-link class="mobile-nav-link${active === 'salarios' ? ' is-active' : ''}">Salários por Profissão</a>
          <a href="/guias/" data-mobile-link class="mobile-nav-link${active === 'guides' ? ' is-active' : ''}">Guias</a>
          <a href="/tabelas-${LEGISLATION_YEAR}/" data-mobile-link class="mobile-nav-link${active === 'tables' ? ' is-active' : ''}">Tabelas ${LEGISLATION_YEAR}</a>
          <p class="mobile-nav-label">Institucional</p>
          <a href="/sobre/" data-mobile-link class="mobile-nav-link">Sobre nós</a>
          <a href="/contato/" data-mobile-link class="mobile-nav-link">Contato</a>
          <a href="/privacidade/" data-mobile-link class="mobile-nav-link">Privacidade</a>
          <a href="/termos/" data-mobile-link class="mobile-nav-link">Termos de Uso</a>
        </nav>
        <div class="mobile-nav-foot">
          <a href="mailto:${SITE.email}" class="text-sm font-semibold text-brand">${esc(SITE.email)}</a>
          <p class="mt-1 text-xs text-ink-faint">${esc(SITE.tagline)}</p>
        </div>
      </div>
    </div>
  </header>`;
}

function footer() {
  const guideList = guides(LEGISLATION_YEAR);
  const calcLinks = CALCULATORS.map(
    (c) => `<a href="/calculadoras/${c.slug}/" class="block text-ink-soft hover:text-brand">${esc(c.title)}</a>`,
  ).join('\n              ');
  const guideLinks = guideList
    .map(
      (g) =>
        `<a href="/guias/${g.slug}/" class="block text-ink-soft hover:text-brand">${esc(g.title)}</a>`,
    )
    .join('\n              ');
  const professionLinks = PROFISSOES_SALARIO_LIQUIDO.map(
    (p) =>
      `<a href="/salario-liquido-${p.slug}/" class="block text-ink-soft hover:text-brand">${esc(p.profissao)}</a>`,
  ).join('\n              ');

  return `<footer class="mt-auto border-t border-line bg-white px-6 pb-10 pt-16 sm:px-12 lg:px-12">
    <div class="mx-auto flex max-w-site flex-col gap-12">
      <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-8">
        <div class="space-y-4 sm:col-span-2 lg:col-span-2">
          ${logoBlock()}
          <p class="max-w-sm text-sm leading-relaxed text-ink-soft">${esc(SITE.footerBlurb)}</p>
          <p class="text-sm text-ink-soft">${esc(SITE.tagline)}</p>
          <div class="space-y-2 text-sm">
            <a href="mailto:${SITE.email}" class="block font-semibold text-brand hover:underline">${esc(SITE.email)}</a>
            <a href="https://ivalice.com.br/" rel="noopener" class="block text-ink-soft hover:text-brand">Ivalice Labs</a>
            <!-- App Android — reativar quando o foco de aquisição voltar ao app:
            <a href="https://play.google.com/store/apps/details?id=br.com.calctrabalhador" rel="noopener" class="block text-ink-soft hover:text-brand">App Android na Play Store</a>
            -->
          </div>
        </div>

        <div class="space-y-4 text-sm">
          <p class="font-bold text-ink">Calculadoras CLT</p>
          <div class="flex flex-col gap-2.5">
              <a href="/#calculadoras" class="block font-semibold text-brand hover:underline">Todas as calculadoras</a>
              ${calcLinks}
          </div>
        </div>

        <div class="space-y-4 text-sm">
          <p class="font-bold text-ink">Conteúdo</p>
          <div class="flex flex-col gap-2.5">
              <a href="/guias/" class="block font-semibold text-brand hover:underline">Guias trabalhistas</a>
              ${guideLinks}
              <a href="/tabelas-${LEGISLATION_YEAR}/" class="block text-ink-soft hover:text-brand">Tabelas ${LEGISLATION_YEAR}</a>
              <a href="/#direitos" class="block text-ink-soft hover:text-brand">Direitos Trabalhistas</a>
              <a href="/#salarios" class="block text-ink-soft hover:text-brand">Salários por Profissão</a>
          </div>
        </div>

        <div class="space-y-4 text-sm">
          <p class="font-bold text-ink">Salários</p>
          <div class="flex flex-col gap-2.5">
              <a href="/#salarios" class="block font-semibold text-brand hover:underline">Ver profissões</a>
              ${professionLinks}
          </div>
        </div>

        <div class="space-y-8 text-sm">
          <div class="space-y-4">
            <p class="font-bold text-ink">Institucional</p>
            <div class="flex flex-col gap-2.5">
              <a href="/sobre/" class="block text-ink-soft hover:text-brand">Sobre nós</a>
              <a href="/contato/" class="block text-ink-soft hover:text-brand">Contato</a>
              <a href="/privacidade/" class="block text-ink-soft hover:text-brand">Privacidade</a>
              <a href="/termos/" class="block text-ink-soft hover:text-brand">Termos de Uso</a>
            </div>
          </div>
          <div class="space-y-4">
            <p class="font-bold text-ink">Outros produtos</p>
            <div class="flex flex-col gap-2.5">
              <a href="https://financiamento.ivalice.com.br/" rel="noopener" class="block text-ink-soft hover:text-brand">Financiamento</a>
              <a href="https://investir.ivalice.com.br/" rel="noopener" class="block text-ink-soft hover:text-brand">Investir</a>
              <a href="https://mei.ivalice.com.br/" rel="noopener" class="block text-ink-soft hover:text-brand">MEI</a>
              <a href="https://churrasco.ivalice.com.br/" rel="noopener" class="block text-ink-soft hover:text-brand">Churrasco</a>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col justify-between gap-3 border-t border-line pt-6 text-sm text-ink-faint sm:flex-row sm:items-center">
        <p>© ${new Date().getFullYear()} ${esc(SITE.name)}. Produto da ${esc(SITE.org)}. Todos os direitos reservados.</p>
        <p class="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span>Versão ${SITE.version}</span>
          <span class="inline-flex items-center gap-2 text-brand"><span class="h-2 w-2 rounded-full bg-brand"></span> Sistema Online</span>
          <a href="/llms.txt" class="hover:text-brand">llms.txt</a>
          <a href="/sitemap.xml" class="hover:text-brand">Sitemap</a>
        </p>
      </div>
    </div>
  </footer>`;
}

function scripts(extra = '') {
  return `<script src="/assets/js/currency-mask.js" defer></script>
  <script type="module" src="/assets/js/main.js"></script>${extra}
</body>
</html>`;
}

function write(rel, content) {
  const full = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, 'utf8');
  console.log('wrote', rel);
}

/** Placeholders for future /salarios/ and /direitos/ hubs — no empty indexable pages. */
function portalAreaPlaceholders() {
  const professionChips = PROFISSOES_SALARIO_LIQUIDO
    .map((p) => {
      const s = salaryForSlug(p.slug);
      const avg = s ? ` · ${formatBrl(s.brutoMedio)}` : '';
      return `<a href="/salario-liquido-${p.slug}/" class="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-brand hover:border-brand/40">${esc(p.profissao)}${esc(avg)}</a>`;
    })
    .join('\n            ');
  return `<section class="mx-auto max-w-site px-4 pb-20 sm:px-8 lg:px-12" aria-label="Áreas do portal">
      <div class="grid gap-4 md:grid-cols-2">
        <div id="salarios" class="scroll-mt-28 rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6">
          <h2 class="font-display text-lg font-bold text-ink">Salários por Profissão</h2>
          <p class="mt-2 text-sm leading-relaxed text-ink-muted">Consulte informações e ferramentas específicas para diferentes profissões brasileiras.</p>
          <div class="mt-4 flex flex-wrap gap-2">
            ${professionChips}
          </div>
          <p class="mt-4 text-xs text-ink-faint">Hub completo em breve em <span class="font-medium">/salarios/</span></p>
        </div>
        <div id="direitos" class="scroll-mt-28 rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6">
          <h2 class="font-display text-lg font-bold text-ink">Direitos Trabalhistas</h2>
          <p class="mt-2 text-sm leading-relaxed text-ink-muted">Entenda seus direitos previstos na legislação trabalhista brasileira.</p>
          <div class="mt-4 flex flex-wrap gap-2">
            <a href="/guias/" class="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-brand hover:border-brand/40">Guias</a>
            <a href="/tabelas-${LEGISLATION_YEAR}/" class="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-brand hover:border-brand/40">Tabelas ${LEGISLATION_YEAR}</a>
            <a href="/calculadoras/ferias/" class="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink-soft hover:border-brand/40">Férias</a>
            <a href="/calculadoras/fgts/" class="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink-soft hover:border-brand/40">FGTS</a>
            <a href="/calculadoras/inss/" class="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink-soft hover:border-brand/40">INSS</a>
            <a href="/calculadoras/rescisao/" class="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink-soft hover:border-brand/40">Aviso / Rescisão</a>
          </div>
          <p class="mt-4 text-xs text-ink-faint">Hub completo em breve em <span class="font-medium">/direitos/</span></p>
        </div>
      </div>
    </section>`;
}

function homePage() {
  const cards = CALCULATORS.filter((c) => c.home)
    .map(
      (c) => `<a href="/calculadoras/${c.slug}/" class="calc-card group">
              <div class="icon-box">${ICONS[c.icon]}</div>
              <div>
                <h3 class="font-display text-lg font-bold text-ink">${esc(c.title)}</h3>
                <p class="mt-1 text-sm leading-relaxed text-ink-muted">${esc(c.blurb)}</p>
              </div>
              <span class="mt-auto inline-flex items-center gap-1 text-[13px] font-semibold text-brand">
                Calcular agora
                <svg class="h-3.5 w-3.5 transition group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M9 6l6 6-6 6"/></svg>
              </span>
            </a>`,
    )
    .join('\n            ');

  const rights = [
    { title: 'Férias', text: 'Entenda o direito a 30 dias e o terço constitucional.', href: '/calculadoras/ferias/', icon: 'sun' },
    { title: '13º Salário', text: 'Como funciona o pagamento em duas parcelas.', href: '/calculadoras/decimo-terceiro/', icon: 'gift' },
    { title: 'FGTS', text: 'Depósito mensal de 8% e saques permitidos.', href: '/calculadoras/fgts/', icon: 'shield' },
    { title: 'Horas Extras', text: 'Adicionais de 50% e 100% previstos na CLT.', href: '/calculadoras/hora-extra/', icon: 'clock' },
  ]
    .map(
      (r) => `<a href="${r.href}" class="flex items-center gap-4 rounded-2xl border border-line bg-white p-4 shadow-card transition hover:border-brand/30">
              <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-mint text-brand">${ICONS[r.icon].replace('h-7 w-7', 'h-5 w-5')}</span>
              <span class="min-w-0 flex-1">
                <span class="block font-display text-sm font-semibold text-ink">${esc(r.title)}</span>
                <span class="mt-0.5 line-clamp-1 block text-xs text-ink-muted">${esc(r.text)}</span>
              </span>
              <svg class="h-4 w-4 shrink-0 text-ink-faint" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>
            </a>`,
    )
    .join('\n            ');

  return `${head({
    title: `${SITE.name} — Calculadoras CLT e Direitos Trabalhistas ${LEGISLATION_YEAR}`,
    description: SITE.description,
    keywords: `calculadora trabalhista ${LEGISLATION_YEAR}, salário líquido, FGTS, férias, 13º, rescisão, INSS, IRRF, CLT, direitos trabalhistas`,
    canonical: '/',
    active: 'home',
    jsonLd: [
      webSiteLd(SITE, { description: SITE.description }),
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Calculadoras trabalhistas',
        numberOfItems: CALCULATORS.length,
        itemListElement: CALCULATORS.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: c.title,
          url: `${SITE.url}/calculadoras/${c.slug}/`,
        })),
      },
    ],
  })}
  <div class="flex min-h-screen flex-col">
    ${header('home')}
    <main class="flex-1">
      <section class="flex flex-col items-center gap-8 px-4 pb-10 pt-12 sm:px-8 sm:pt-16">
        <div class="max-w-3xl text-center">
          <h1 class="font-display text-3xl font-bold text-ink sm:text-[40px]" data-greeting>Boa noite! <span aria-hidden="true">🌙</span></h1>
          <p class="mt-2 font-display text-base text-ink-muted sm:text-lg">Informações e ferramentas para ajudar o trabalhador brasileiro.</p>
          <p class="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">O Guia do Trabalhador Brasileiro reúne calculadoras CLT, explicações sobre direitos trabalhistas e ferramentas para entender melhor sua remuneração.</p>
        </div>
        <form data-hero-search class="hero-search flex w-full max-w-[720px] items-center gap-3 rounded-[20px] border-2 border-brand bg-white px-4 py-3 sm:px-6 sm:h-16">
          <svg class="h-6 w-6 shrink-0 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3-3"/></svg>
          <input name="q" type="search" placeholder="Ex: salário líquido, FGTS, enfermeiro, rescisão..." class="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-ink-faint" autocomplete="off">
          <a href="#calculadoras" role="button" data-hero-search-submit class="shrink-0 rounded-xl bg-brand px-5 py-2.5 text-xs font-semibold text-white no-underline">Buscar</a>
        </form>
        <div data-search-results class="hidden w-full max-w-[720px] rounded-2xl border border-line bg-white p-2 shadow-card"></div>
      </section>

      <section id="calculadoras" class="mx-auto grid max-w-site gap-12 px-4 pb-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12 lg:px-12">
        <div class="space-y-8">
          <div class="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 class="font-display text-2xl font-bold text-ink">Calculadoras CLT</h2>
              <p class="mt-1 text-sm text-ink-muted">Selecione uma ferramenta para começar</p>
            </div>
            <a href="#calculadoras" class="inline-flex items-center gap-2 text-sm font-semibold text-brand">
              Ver todas as ${CALCULATOR_COUNT} calculadoras
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </a>
          </div>
          <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3" data-calc-grid>
            ${cards}
          </div>
        </div>

        <aside class="space-y-4">
          <div>
            <h2 class="font-display text-xl font-bold text-ink">Direitos Trabalhistas</h2>
            <p class="mt-1 text-sm text-ink-muted">Informação é poder! Fique por dentro.</p>
          </div>
          <div class="flex flex-col gap-3">${rights}</div>
          <a href="/tabelas-${LEGISLATION_YEAR}/" class="block rounded-2xl bg-brand-deep p-5 text-white shadow-card transition hover:brightness-105">
            <p class="font-display text-base font-bold">Tabelas ${LEGISLATION_YEAR}</p>
            <p class="mt-1 text-sm text-white/80">INSS, IRRF e seguro-desemprego atualizados.</p>
          </a>
          <a href="/guias/" class="block rounded-2xl border border-line bg-white p-5 shadow-card transition hover:border-brand/30">
            <p class="font-display text-base font-bold text-ink">Guias práticos</p>
            <p class="mt-1 text-sm text-ink-muted">Salário líquido, rescisão e mais — passo a passo.</p>
          </a>
          <div class="ad-slot rounded-2xl border border-dashed border-line bg-white p-6 text-center text-xs text-ink-faint" data-ads="off" data-ad-slot="home-sidebar">
            Espaço para anúncio
          </div>
        </aside>
      </section>

      ${portalAreaPlaceholders()}
    </main>
    ${footer()}
  </div>
${scripts()}`;
}

function formFields(id) {
  const money = (name, label, { required = false, placeholder = '0,00' } = {}) =>
    `<label class="block min-w-0 flex-1"><span class="field-label">${label}</span><input class="field js-currency" name="${name}" type="text" inputmode="numeric" data-currency autocomplete="off" value="" placeholder="${placeholder}" ${required ? 'required' : ''}></label>`;
  const number = (name, label, { min = '0', max = '', required = false, placeholder = '' } = {}) =>
    `<label class="block min-w-0 flex-1"><span class="field-label">${label}</span><input class="field" name="${name}" type="number" min="${min}" ${max ? `max="${max}"` : ''} value="" placeholder="${placeholder || min}" ${required ? 'required' : ''}></label>`;

  const forms = {
    salario_liquido: `
      <div class="grid gap-6 sm:grid-cols-2">
        ${money('gross', 'Salário bruto (R$)', { required: true, placeholder: 'Ex: 3.000,00' })}
        ${money('overtime', 'Horas extras (R$)', { placeholder: '0,00' })}
      </div>
      <div class="grid gap-6 sm:grid-cols-2">
        <div>
          <span class="field-label">Dependentes</span>
          <div class="field flex items-center justify-between" style="padding-right:8px;padding-left:8px">
            <button type="button" class="stepper-btn" data-step="-1" aria-label="Diminuir">−</button>
            <input name="dependents" type="number" min="0" max="20" value="0" class="w-16 border-0 bg-transparent text-center text-lg font-semibold outline-none">
            <button type="button" class="stepper-btn" data-step="1" aria-label="Aumentar">+</button>
          </div>
        </div>
        ${money('otherDeductions', 'Outros descontos (R$)', { placeholder: '0,00' })}
      </div>`,
    fgts: `
      <div class="grid gap-6 sm:grid-cols-2">
        ${money('gross', 'Salário bruto (R$)', { required: true, placeholder: 'Ex: 3.000,00' })}
        ${number('months', 'Meses de depósito', { min: '1', required: true, placeholder: 'Ex: 12' })}
      </div>
      <label class="flex items-center gap-3 text-sm text-ink-soft">
        <input type="checkbox" name="includeFine" class="h-4 w-4 rounded border-line text-brand">
        Incluir multa rescisória (40%)
      </label>`,
    ferias: `
      <div class="grid gap-6 sm:grid-cols-2">
        ${money('gross', 'Salário bruto (R$)', { required: true, placeholder: 'Ex: 3.000,00' })}
        ${money('avgOvertime', 'Média de horas extras (R$)', { placeholder: '0,00' })}
      </div>
      <div class="grid gap-6 sm:grid-cols-2">
        ${number('days', 'Dias de férias', { min: '1', max: '30', required: true, placeholder: 'Ex: 30' })}
        <label class="flex items-end gap-3 pb-4 text-sm text-ink-soft">
          <input type="checkbox" name="sellOneThird" class="h-4 w-4 rounded border-line text-brand">
          Vender 1/3 (10 dias)
        </label>
      </div>`,
    decimo_terceiro: `
      <div class="grid gap-6 sm:grid-cols-2">
        ${money('gross', 'Salário bruto (R$)', { required: true, placeholder: 'Ex: 3.000,00' })}
        ${number('months', 'Meses trabalhados no ano', { min: '1', max: '12', required: true, placeholder: 'Ex: 12' })}
      </div>
      <div class="grid gap-6 sm:grid-cols-2">
        ${number('dependents', 'Dependentes', { min: '0', max: '20', placeholder: '0' })}
        ${money('paid', '1ª parcela já paga (R$)', { placeholder: '0,00' })}
      </div>`,
    rescisao: `
      <div class="grid gap-6 sm:grid-cols-2">
        ${money('gross', 'Salário bruto (R$)', { required: true, placeholder: 'Ex: 3.000,00' })}
        ${number('dependents', 'Dependentes', { min: '0', max: '20', placeholder: '0' })}
      </div>
      <div class="grid gap-6 sm:grid-cols-2">
        <label class="block min-w-0 flex-1"><span class="field-label">Data de admissão</span><input class="field" name="admission" type="date" required></label>
        <label class="block min-w-0 flex-1"><span class="field-label">Data de demissão</span><input class="field" name="dismissal" type="date" required></label>
      </div>
      <div class="grid gap-6 sm:grid-cols-2">
        <label class="block min-w-0 flex-1"><span class="field-label">Tipo de demissão</span>
          <select class="field" name="dismissalType" required>
            <option value="" disabled selected>Selecione</option>
            <option value="WITHOUT_JUST_CAUSE">Sem justa causa</option>
            <option value="AGREEMENT">Acordo</option>
            <option value="WITH_JUST_CAUSE">Com justa causa</option>
            <option value="RESIGNATION">Pedido de demissão</option>
          </select>
        </label>
        ${number('vacationDays', 'Saldo de férias (dias)', { min: '0', max: '60', placeholder: '0' })}
      </div>
      ${money('fgtsBalance', 'Saldo FGTS atual (R$) — opcional', { placeholder: 'Se vazio, estimamos 8% × meses' })}
      <div class="flex flex-col gap-3 text-sm text-ink-soft">
        <label class="flex items-center gap-3"><input type="checkbox" name="workedNotice" class="h-4 w-4 rounded border-line"> Aviso prévio trabalhado</label>
        <label class="flex items-center gap-3"><input type="checkbox" name="includeFgts" class="h-4 w-4 rounded border-line"> Incluir saque FGTS</label>
      </div>`,
    hora_extra: `
      <div class="grid gap-6 sm:grid-cols-2">
        ${money('gross', 'Salário bruto (R$)', { required: true, placeholder: 'Ex: 3.000,00' })}
        ${number('hours', 'Horas extras', { min: '0', required: true, placeholder: 'Ex: 10' })}
      </div>
      <div class="grid gap-6 sm:grid-cols-2">
        <label class="block min-w-0 flex-1"><span class="field-label">Tipo</span>
          <select class="field" name="overtimeType" required>
            <option value="" disabled selected>Selecione</option>
            <option value="WEEKDAY">50% (dias úteis)</option>
            <option value="SUNDAY_HOLIDAY">100% (domingo/feriado)</option>
          </select>
        </label>
        ${number('nightHours', 'Horas com adicional noturno', { min: '0', placeholder: '0' })}
      </div>`,
    adicional_noturno: `
      <div class="grid gap-6 sm:grid-cols-2">
        ${money('gross', 'Salário bruto (R$)', { required: true, placeholder: 'Ex: 3.000,00' })}
        ${number('nightHours', 'Horas noturnas', { min: '0', required: true, placeholder: 'Ex: 22' })}
      </div>`,
    seguro_desemprego: `
      <div class="grid gap-6 sm:grid-cols-2">
        ${money('avgSalary', 'Salário médio (R$)', { required: true, placeholder: 'Ex: 2.500,00' })}
        ${number('months', 'Meses trabalhados (últimos 36)', { min: '0', max: '36', required: true, placeholder: 'Ex: 18' })}
      </div>
      ${number('previous', 'Solicitações anteriores', { min: '0', max: '5', placeholder: '0' })}`,
    inss: `
      ${money('gross', 'Salário de contribuição (R$)', { required: true, placeholder: 'Ex: 3.000,00' })}`,
    irrf: `
      <div class="grid gap-6 sm:grid-cols-2">
        ${money('gross', 'Rendimento bruto (R$)', { required: true, placeholder: 'Ex: 5.000,00' })}
        ${money('inss', 'INSS já descontado (R$)', { placeholder: '0,00' })}
      </div>
      <div class="grid gap-6 sm:grid-cols-2">
        ${number('dependents', 'Dependentes', { min: '0', max: '20', placeholder: '0' })}
        ${money('otherDed', 'Outras deduções (R$)', { placeholder: '0,00' })}
      </div>`,
  };
  return forms[id] || '';
}

function educationHtml(sections) {
  if (!sections?.length) return '';
  return `<section class="space-y-8 rounded-3xl border border-line bg-white p-6 shadow-card sm:p-8" aria-labelledby="education-heading">
          <h2 id="education-heading" class="font-display text-xl font-semibold text-ink">Guia completo</h2>
          <div class="space-y-10 text-sm leading-relaxed text-ink-soft">
            ${sections
              .map(
                (s) => `<div id="${esc(s.id)}">
              <h2 class="font-display text-lg font-bold text-ink">${esc(s.title)}</h2>
              <div class="mt-3 space-y-3">${s.html}</div>
            </div>`,
              )
              .join('\n            ')}
          </div>
        </section>`;
}

function calcPage(c) {
  const canonical = `/calculadoras/${c.slug}/`;
  const absolute = `${SITE.url}${canonical}`;
  const seoTitle = `Calculadora de ${c.title} CLT ${LEGISLATION_YEAR}`;
  const seoDescription = `${c.blurb} Calculadora gratuita com tabelas ${LEGISLATION_YEAR}. Resultado no navegador, sem cadastro.`;
  const content = getCalculatorContent(c.slug);
  const faqs = content ? (typeof content.faqs === 'function' ? content.faqs(LEGISLATION_YEAR) : content.faqs) : FAQ_BY_SLUG[c.slug] || [];
  const howto = content?.howto || HOWTO_BY_SLUG[c.slug] || '';
  const relatedSlugs = content?.related || RELATED_BY_SLUG[c.slug] || [];
  const sections =
    content && typeof content.sections === 'function'
      ? content.sections(LEGISLATION_YEAR)
      : content?.sections || [];
  const relatedHtml = relatedSlugs.length
    ? `<section class="space-y-3" aria-labelledby="related-heading">
          <h2 id="related-heading" class="font-display text-xl font-semibold text-ink">Calculadoras relacionadas</h2>
          <div class="flex flex-wrap gap-2">
            ${relatedSlugs
              .map((slug) => {
                const rel = CALCULATORS.find((x) => x.slug === slug);
                if (!rel) return '';
                return `<a href="/calculadoras/${rel.slug}/" class="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-brand hover:border-brand/40">${esc(rel.title)}</a>`;
              })
              .join('\n            ')}
            <a href="/tabelas-${LEGISLATION_YEAR}/" class="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink-soft hover:border-brand/40">Tabelas ${LEGISLATION_YEAR}</a>
          </div>
        </section>`
    : '';
  const howtoHtml = howto
    ? `<section class="space-y-2 rounded-3xl border border-line bg-white p-6 shadow-card sm:p-8" aria-labelledby="howto-heading">
          <h2 id="howto-heading" class="font-display text-xl font-semibold text-ink">Como funciona</h2>
          <p class="text-sm leading-relaxed text-ink-soft">${esc(howto)}</p>
          <p class="text-sm text-ink-muted"><a class="font-semibold text-brand underline" href="/guias/">Ver todos os guias</a> · <a class="font-semibold text-brand underline" href="/tabelas-${LEGISLATION_YEAR}/">Tabelas ${LEGISLATION_YEAR}</a></p>
        </section>`
    : '';
  const breadcrumbLdBlock = breadcrumbLd([
    { name: 'Início', item: SITE.url + '/' },
    { name: 'Calculadoras', item: `${SITE.url}/#calculadoras` },
    { name: c.title, item: absolute },
  ]);
  const appLd = webApplicationLd({
    name: seoTitle,
    url: absolute,
    description: seoDescription,
    dateModified: TODAY,
    site: SITE,
  });
  const faqLd = faqPageLd(faqs);
  const faqHtml = faqs.length
    ? `<section class="space-y-4 rounded-3xl bg-white p-6 shadow-card sm:p-8" aria-labelledby="faq-heading">
          <h2 id="faq-heading" class="font-display text-xl font-semibold text-ink">Perguntas frequentes</h2>
          <div class="space-y-4">
            ${faqs
              .map(
                (f) => `<div>
              <h3 class="font-semibold text-ink">${esc(f.q)}</h3>
              <p class="mt-1 text-sm leading-relaxed text-ink-soft">${esc(f.a)}</p>
            </div>`,
              )
              .join('\n            ')}
          </div>
        </section>`
    : '';

  return `${head({
    title: seoTitle,
    description: seoDescription,
    keywords: `${c.keywords}, ${c.title} ${LEGISLATION_YEAR}, calculadora CLT`,
    canonical,
    active: 'calcs',
    jsonLd: [appLd, breadcrumbLdBlock, faqLd].filter(Boolean),
  })}
  <div class="flex min-h-screen flex-col">
    ${header('calcs')}
    <main class="flex-1 px-4 py-10 sm:px-8 sm:py-12">
      <div class="mx-auto w-full max-w-calc space-y-8">
        <nav class="flex flex-wrap items-center gap-2 text-sm text-ink-soft" aria-label="Breadcrumb">
          <a href="/" class="hover:text-brand">Início</a>
          <span class="text-ink-faint">&gt;</span>
          <a href="/#calculadoras" class="hover:text-brand">Calculadoras</a>
          <span class="text-ink-faint">&gt;</span>
          <span class="font-semibold text-brand-deep">${esc(c.title)}</span>
        </nav>

        <div>
          <h1 class="font-display text-3xl font-bold text-ink sm:text-[32px]">Calculadora de ${esc(c.title)}</h1>
          <p class="mt-2 text-lg text-ink-soft">${esc(c.blurb)} Tabelas de referência ${LEGISLATION_YEAR}.</p>
        </div>

        <div class="ad-slot" data-ads="off" data-ad-slot="calc-top"></div>

        <form id="calc-form" data-calc-id="${c.id}" class="space-y-8 rounded-3xl bg-white p-6 shadow-card sm:p-10" novalidate>
          ${formFields(c.id)}
          <a href="#results" role="button" data-calc-submit class="btn-primary">Calcular</a>
        </form>

        <section id="results" class="result-panel space-y-8" hidden>
          <div class="rounded-3xl bg-brand-deep px-6 py-8 text-center text-white">
            <p class="text-base font-medium opacity-80" data-result-label>${esc(c.resultLabel)}</p>
            <p class="mt-2 font-display text-4xl font-bold sm:text-[40px]" data-result-value>—</p>
          </div>
          <div>
            <h2 class="font-display text-xl font-semibold text-ink">Detalhamento</h2>
            <div class="mt-2 divide-y divide-line" data-breakdown></div>
            <p class="mt-4 text-sm italic text-ink-faint">* Estimativa com tabelas INSS/IRRF/Seguro ${LEGISLATION_YEAR}. Não substitui TRCT, contador ou advogado. Confira a legislação vigente.</p>
          </div>
          <div class="flex justify-center">
            <a href="#" role="button" data-share class="btn-primary inline-flex h-14 w-full max-w-md text-base sm:w-auto sm:min-w-[240px]">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M12 3v12M8 7l4-4 4 4"/></svg>
              Compartilhar
            </a>
          </div>
        </section>

        ${howtoHtml}
        <div class="ad-slot" data-ads="off" data-ad-slot="calc-mid"></div>
        ${educationHtml(sections)}
        ${faqHtml}
        ${relatedHtml}
        <div class="ad-slot" data-ads="off" data-ad-slot="calc-bottom"></div>
        ${sections.length ? backToTopHtml() : ''}
      </div>
    </main>
    ${footer()}
  </div>
${scripts(`\n  <script type="module" src="/assets/js/calc-page.js"></script>${sections.length ? `\n  <script type="module">document.querySelector("[data-back-to-top]")?.addEventListener("click", (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); });</script>` : ''}`)}`;
}

function legalPage(kind) {
  const isPrivacy = kind === 'privacy';
  const title = isPrivacy ? 'Política de Privacidade' : 'Termos de Uso';
  const canonical = isPrivacy ? '/privacidade/' : '/termos/';
  const body = isPrivacy
    ? `<p>A <strong>${SITE.org}</strong> (“nós”, “nosso”) opera o site <a class="text-brand underline" href="${SITE.url}">${SITE.url}</a> e o aplicativo móvel <strong>Calculadora do Trabalhador Brasileiro</strong> (Android, pacote <code>br.com.calctrabalhador</code>). Esta Política de Privacidade explica como tratamos dados pessoais no site e no aplicativo, em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).</p>
      <p class="mt-3">Contato do controlador: <a class="text-brand underline" href="mailto:${SITE.email}">${SITE.email}</a>.</p>

      <h2 class="mt-8 font-display text-xl font-bold">1. Escopo</h2>
      <p class="mt-3">Esta política aplica-se ao uso do site institucional do produto e do aplicativo Android disponibilizado na Google Play. O site institucional da ${SITE.org} (<a class="text-brand underline" href="https://ivalice.com.br">ivalice.com.br</a>) pode ter política própria.</p>

      <h2 class="mt-8 font-display text-xl font-bold">2. Dados que tratamos</h2>
      <p class="mt-3"><strong>Cálculos trabalhistas.</strong> Os valores que você informa (salário, dependentes, datas etc.) são processados localmente: no navegador (site) ou no dispositivo (aplicativo). <strong>Não enviamos esses dados de cálculo para nossos servidores.</strong> No aplicativo, histórico e favoritos podem ser armazenados apenas no próprio aparelho (banco local).</p>
      <p class="mt-3"><strong>Contato.</strong> Se você nos escrever por e-mail, trataremos nome, e-mail e o conteúdo da mensagem para responder.</p>
      <p class="mt-3"><strong>Dados técnicos.</strong> Podemos receber, por meio de hospedagem ou parceiros, dados como endereço IP, tipo de dispositivo/navegador, páginas ou telas acessadas, data/hora e identificadores técnicos necessários à segurança e ao funcionamento.</p>
      <p class="mt-3"><strong>Publicidade.</strong> Quando anúncios estiverem ativos, parceiros de publicidade podem tratar identificadores de publicidade, cookies, identificadores de dispositivo e dados de uso para exibir, medir e personalizar anúncios (detalhes na seção 4).</p>

      <h2 class="mt-8 font-display text-xl font-bold">3. Finalidades e bases legais</h2>
      <ul class="mt-3 list-disc space-y-2 pl-5">
        <li>Prestar o serviço de calculadoras e manter o app/site funcionando (execução de contrato / legítimo interesse);</li>
        <li>Responder contatos e suporte (procedimento preliminar a pedido do titular / legítimo interesse);</li>
        <li>Segurança, prevenção a abuso e melhoria do produto (legítimo interesse);</li>
        <li>Cumprimento de obrigações legais;</li>
        <li>Exibição de publicidade, inclusive personalizada quando permitido, com base em legítimo interesse e/ou consentimento, conforme a legislação e as opções apresentadas a você (ex.: formulário de consentimento de anúncios no app ou configurações de cookies no site).</li>
      </ul>

      <h2 class="mt-8 font-display text-xl font-bold">4. Publicidade — Google AdSense (site) e Google AdMob (aplicativo)</h2>
      <p class="mt-3">Podemos exibir anúncios para manter o produto gratuito:</p>
      <ul class="mt-3 list-disc space-y-2 pl-5">
        <li><strong>Site:</strong> Google AdSense e tecnologias semelhantes. Podem ser usados cookies e tecnologias de rastreamento de terceiros para veicular anúncios, limitar frequência, medir desempenho e, quando autorizado, personalizar conteúdo publicitário.</li>
        <li><strong>Aplicativo:</strong> Google AdMob (e SDKs relacionados da Google). Podem ser usados o Identificador de Publicidade do Android (GAID), dados de uso do app e identificadores técnicos para exibir anúncios (incluindo intersticiais/recompensados, quando habilitados).</li>
      </ul>
      <p class="mt-3">A Google e demais redes/parceiros de anúncios podem tratar dados como operadores/controladores independentes, segundo suas próprias políticas. Consulte também:</p>
      <ul class="mt-3 list-disc space-y-2 pl-5">
        <li><a class="text-brand underline" href="https://policies.google.com/privacy" rel="noopener noreferrer" target="_blank">Política de Privacidade da Google</a></li>
        <li><a class="text-brand underline" href="https://policies.google.com/technologies/ads" rel="noopener noreferrer" target="_blank">Como a Google usa dados de anúncios</a></li>
        <li><a class="text-brand underline" href="https://support.google.com/adsense/answer/7549925" rel="noopener noreferrer" target="_blank">Informações sobre AdSense / cookies de anúncios</a></li>
      </ul>
      <p class="mt-3">Você pode gerenciar preferências de anúncios personalizados nas configurações da conta Google / dispositivo e, no app, por meio de eventuais telas de consentimento (UMP) quando forem exibidas. A desativação de cookies ou do identificador de publicidade pode reduzir a personalização, mas anúncios genéricos ainda podem aparecer.</p>

      <h2 class="mt-8 font-display text-xl font-bold">5. Cookies e armazenamento local (site)</h2>
      <p class="mt-3">Utilizamos armazenamento local do navegador para preferências técnicas no próprio aparelho. Cookies essenciais e de terceiros (CDN, fontes, AdSense) podem ser carregados. Você pode limpar ou bloquear cookies nas configurações do navegador.</p>

      <h2 class="mt-8 font-display text-xl font-bold">6. Compartilhamento</h2>
      <p class="mt-3">Não vendemos dados pessoais. Podemos compartilhar dados com: (a) prestadores de infraestrutura (ex.: hospedagem GitHub Pages); (b) Google e parceiros de publicidade, conforme a seção 4; (c) autoridades, quando houver obrigação legal.</p>

      <h2 class="mt-8 font-display text-xl font-bold">7. Transferências internacionais</h2>
      <p class="mt-3">Como utilizamos serviços da Google e hospedagem que podem operar fora do Brasil, dados técnicos e de publicidade podem ser transferidos internacionalmente, com salvaguardas previstas na LGPD e nas políticas dos fornecedores.</p>

      <h2 class="mt-8 font-display text-xl font-bold">8. Retenção</h2>
      <p class="mt-3">Dados de cálculo permanecem no seu dispositivo até você apagá-los (ou desinstalar o app / limpar o navegador). Mensagens de contato são retidas pelo tempo necessário ao atendimento e às obrigações legais. Dados de publicidade seguem as políticas e prazos dos parceiros.</p>

      <h2 class="mt-8 font-display text-xl font-bold">9. Segurança</h2>
      <p class="mt-3">Adotamos medidas razoáveis de segurança. Nenhum sistema é isento de risco. Em incidente relevante, procederemos conforme a legislação aplicável.</p>

      <h2 class="mt-8 font-display text-xl font-bold">10. Crianças e adolescentes</h2>
      <p class="mt-3">O serviço não é direcionado a crianças menores de 13 anos. Não coletamos intencionalmente dados de crianças. Se souber de coleta indevida, contate-nos para remoção quando aplicável.</p>

      <h2 class="mt-8 font-display text-xl font-bold">11. Seus direitos (LGPD)</h2>
      <p class="mt-3">Você pode solicitar confirmação de tratamento, acesso, correção, anonimização, bloqueio ou eliminação, portabilidade quando cabível, informação sobre compartilhamentos, revogação de consentimento e oposição ao legítimo interesse, nos termos da lei. Escreva para <a class="text-brand underline" href="mailto:${SITE.email}">${SITE.email}</a> com o assunto “LGPD”. Você também pode reclamar à ANPD.</p>

      <h2 class="mt-8 font-display text-xl font-bold">12. Alterações</h2>
      <p class="mt-3">Podemos atualizar esta política. A versão vigente estará sempre nesta página, com a data de atualização abaixo.</p>

      <h2 class="mt-8 font-display text-xl font-bold">13. Contato</h2>
      <p class="mt-3">${SITE.org} — <a class="text-brand underline" href="mailto:${SITE.email}">${SITE.email}</a></p>
      <p class="mt-6 text-sm text-ink-muted">Última atualização: 14 de julho de 2026.</p>`
    : `<p>Ao acessar o site <a class="text-brand underline" href="${SITE.url}">${SITE.url}</a> ou o aplicativo <strong>Calculadora do Trabalhador Brasileiro</strong> (Android), você concorda com estes Termos de Uso. Se não concordar, não utilize os serviços.</p>
      <p class="mt-3">Os serviços são oferecidos pela <strong>${SITE.org}</strong> (<a class="text-brand underline" href="mailto:${SITE.email}">${SITE.email}</a>).</p>

      <h2 class="mt-8 font-display text-xl font-bold">1. Descrição do serviço</h2>
      <p class="mt-3">Disponibilizamos calculadoras e conteúdos informativos relacionados a direitos e obrigações trabalhistas no Brasil (CLT e tabelas de referência). Os resultados são <strong>estimativas educativas</strong> e <strong>não substituem</strong> parecer de contador, advogado, sindicato ou orientação oficial de órgãos públicos.</p>

      <h2 class="mt-8 font-display text-xl font-bold">2. Conta e idade</h2>
      <p class="mt-3">Não é obrigatório criar conta. O serviço não é destinado a menores de 13 anos.</p>

      <h2 class="mt-8 font-display text-xl font-bold">3. Uso permitido</h2>
      <p class="mt-3">Você pode usar o site e o app para fins pessoais e informativos. É proibido: abusar da infraestrutura; tentar comprometer a segurança; fazer engenharia reversa indevida; usar os serviços de forma ilícita; ou republicar conteúdo de forma que sugira endosso oficial do governo ou da ${SITE.org} sem autorização.</p>

      <h2 class="mt-8 font-display text-xl font-bold">4. Publicidade</h2>
      <p class="mt-3">Os serviços podem exibir anúncios por meio do <strong>Google AdSense</strong> (site) e do <strong>Google AdMob</strong> (aplicativo), inclusive anúncios personalizados quando permitido. A presença de publicidade faz parte do modelo gratuito do produto. O uso de dados para anúncios está descrito na <a class="text-brand underline" href="/privacidade/">Política de Privacidade</a>.</p>

      <h2 class="mt-8 font-display text-xl font-bold">5. Isenção de responsabilidade</h2>
      <p class="mt-3">Tabelas, alíquotas e regras legais mudam com frequência. Não garantimos adequação a um caso concreto, ausência de erros ou atualização permanente de todas as normas. Você é responsável por validar resultados antes de qualquer decisão financeira, trabalhista ou fiscal. Na máxima extensão permitida pela lei, a ${SITE.org} não responde por danos decorrentes do uso das estimativas.</p>

      <h2 class="mt-8 font-display text-xl font-bold">6. Propriedade intelectual</h2>
      <p class="mt-3">Marca, layout, textos e código do produto pertencem à ${SITE.org} ou a licenciadores, salvo indicação em contrário. O uso do serviço não transfere direitos de propriedade intelectual.</p>

      <h2 class="mt-8 font-display text-xl font-bold">7. Disponibilidade</h2>
      <p class="mt-3">Podemos alterar, suspender ou descontinuar funcionalidades, anúncios ou o próprio serviço, com ou sem aviso prévio, na medida permitida.</p>

      <h2 class="mt-8 font-display text-xl font-bold">8. Privacidade</h2>
      <p class="mt-3">O tratamento de dados pessoais regese pela <a class="text-brand underline" href="/privacidade/">Política de Privacidade</a>.</p>

      <h2 class="mt-8 font-display text-xl font-bold">9. Alterações destes termos</h2>
      <p class="mt-3">Podemos atualizar estes Termos. A versão vigente estará nesta página. O uso continuado após a publicação constitui aceitação das alterações, quando a lei assim permitir.</p>

      <h2 class="mt-8 font-display text-xl font-bold">10. Lei aplicável</h2>
      <p class="mt-3"> Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da comarca do domicílio do usuário consumidor, sem prejuízo de outros direitos legais.</p>

      <h2 class="mt-8 font-display text-xl font-bold">11. Contato</h2>
      <p class="mt-3"><a class="text-brand underline" href="mailto:${SITE.email}">${SITE.email}</a></p>
      <p class="mt-6 text-sm text-ink-muted">Última atualização: 14 de julho de 2026.</p>`;

  return `${head({
    title,
    description: `${title} da ${SITE.name} — site e aplicativo Android.`,
    canonical,
    active: '',
  })}
  <div class="flex min-h-screen flex-col">
    ${header('')}
    <main class="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-8">
      <h1 class="font-display text-3xl font-bold text-ink">${esc(title)}</h1>
      <div class="prose-calc mt-8 space-y-3 text-base leading-relaxed text-ink-soft">${body}</div>
    </main>
    ${footer()}
  </div>
${scripts()}`;
}

function simplePage(title, canonical, html, { active = '', noindex = false, extraScripts = '', jsonLd = null } = {}) {
  const robots = noindex
    ? 'noindex, follow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  return `${head({
    title,
    description: `${title} — ${SITE.name}`,
    canonical,
    active,
    robots,
    jsonLd: jsonLd
      ? jsonLd
      : noindex
        ? [
            webPageLd({
              name: title,
              url: `${SITE.url}${canonical}`,
            }),
          ]
        : null,
  })}
  <div class="flex min-h-screen flex-col">
    ${header(active)}
    <main class="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-8">
      <h1 class="font-display text-3xl font-bold text-ink">${esc(title)}</h1>
      <div class="mt-8 space-y-4 text-base leading-relaxed text-ink-soft">${html}</div>
    </main>
    ${footer()}
  </div>
${scripts(extraScripts)}`;
}

function enrichGuideBody(body) {
  let i = 0;
  const headings = [];
  const withIds = String(body).replace(/<h2(\s[^>]*)?>([\s\S]*?)<\/h2>/g, (full, attrs = '', inner) => {
    i += 1;
    const id = `sec-${i}`;
    const plain = inner.replace(/<[^>]+>/g, '').trim();
    headings.push({ id, text: plain });
    if (/\sid=/.test(attrs)) return full;
    return `<h2${attrs} id="${id}">${inner}</h2>`;
  });
  const words = withIds.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return { body: withIds, headings, minutes };
}

function backToTopHtml() {
  return `<p class="mt-10"><a href="#" class="text-sm font-semibold text-brand underline" data-back-to-top>Voltar ao topo</a></p>`;
}

function salarySectionHtml(p, salary) {
  if (!salary) return '';
  const meta = salary.meta || SALARIOS_DATA.meta;
  const nota = salary.nota || meta.fonteNota;
  const medio = formatBrl(salary.brutoMedio);
  const mediana = formatBrl(salary.mediana);
  const piso = formatBrl(salary.piso);
  const teto = formatBrl(salary.teto);
  return `<section class="space-y-4 rounded-3xl border border-line bg-white p-6 shadow-card sm:p-8" aria-labelledby="salary-heading">
          <div class="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 id="salary-heading" class="font-display text-xl font-semibold text-ink">Salário médio no Brasil</h2>
              <p class="mt-1 text-sm text-ink-muted">${esc(salary.cboLabel)} · CBO ${esc(String(salary.cbo).replace(/(\d{4})(\d{2})/, '$1-$2'))}</p>
            </div>
            <p class="text-xs text-ink-faint">Atualizado em ${esc(salary.atualizadoEm || meta.atualizadoEm)}</p>
          </div>
          <div>
            <p class="font-display text-3xl font-bold text-brand-deep sm:text-4xl">${esc(medio)}</p>
            <p class="mt-1 text-sm text-ink-muted">média nacional CLT · jornada ~${esc(String(salary.jornadaHoras))}h/semana</p>
          </div>
          <dl class="grid gap-3 sm:grid-cols-3">
            <div class="rounded-2xl bg-page px-4 py-3">
              <dt class="text-xs font-semibold uppercase tracking-wide text-ink-faint">Mediana</dt>
              <dd class="mt-1 font-display text-lg font-bold text-ink">${esc(mediana)}</dd>
            </div>
            <div class="rounded-2xl bg-page px-4 py-3">
              <dt class="text-xs font-semibold uppercase tracking-wide text-ink-faint">Piso (ref.)</dt>
              <dd class="mt-1 font-display text-lg font-bold text-ink">${esc(piso)}</dd>
            </div>
            <div class="rounded-2xl bg-page px-4 py-3">
              <dt class="text-xs font-semibold uppercase tracking-wide text-ink-faint">Teto (ref.)</dt>
              <dd class="mt-1 font-display text-lg font-bold text-ink">${esc(teto)}</dd>
            </div>
          </dl>
          <p class="text-xs leading-relaxed text-ink-muted">${esc(nota)} Período ${esc(salary.periodo || meta.periodoPadrao)}. Fonte: ${esc(meta.fonte)}${salary.amostra ? ` · amostra ${Number(salary.amostra).toLocaleString('pt-BR')} vínculos` : ''}.</p>
          <a href="/calculadoras/salario-liquido/?gross=${Number(salary.brutoMedio).toFixed(2)}" class="btn-primary inline-flex h-12 px-6 text-sm" style="width:auto">Simular líquido com a média (${esc(medio)})</a>
          <p class="text-xs text-ink-faint">Abre a calculadora já com ${esc(medio)} no salário bruto. Ajuste se o seu holerite for diferente.</p>
        </section>`;
}

function professionPage(p) {
  const canonical = `/salario-liquido-${p.slug}/`;
  const absolute = `${SITE.url}${canonical}`;
  const salary = salaryForSlug(p.slug);
  const calcHref = salary
    ? `/calculadoras/salario-liquido/?gross=${Number(salary.brutoMedio).toFixed(2)}`
    : '/calculadoras/salario-liquido/';
  const salaryFaqs = salary
    ? [
        {
          q: `Qual o salário médio de ${p.profissao.toLowerCase()} no Brasil?`,
          a: `Com base em dados CAGED processados pelo Portal Salário, a média nacional de salário-base CLT para ${salary.cboLabel} (CBO ${String(salary.cbo).replace(/(\d{4})(\d{2})/, '$1-$2')}) é cerca de ${formatBrl(salary.brutoMedio)} (período ${salary.periodo}). Esse valor não inclui adicionais variáveis do mês.`,
        },
      ]
    : [];
  const faqs = [...salaryFaqs, ...(p.faq || [])];
  const relatedSlugs = p.relatedCalcs || ['salario-liquido', 'inss', 'irrf'];
  const relatedHtml = relatedSlugs
    .map((slug) => CALCULATORS.find((c) => c.slug === slug))
    .filter(Boolean)
    .map(
      (c) =>
        `<a href="/calculadoras/${c.slug}/" class="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-brand hover:border-brand/40">${esc(c.title)}</a>`,
    )
    .join('\n            ');
  const diffList = (p.diferenciais || [])
    .map((d) => `<li>${esc(d)}</li>`)
    .join('\n          ');
  const faqHtml = faqs.length
    ? `<section class="space-y-4 rounded-3xl bg-white p-6 shadow-card sm:p-8" aria-labelledby="faq-heading">
          <h2 id="faq-heading" class="font-display text-xl font-semibold text-ink">Perguntas frequentes</h2>
          <div class="space-y-4">
            ${faqs
              .map(
                (f) => `<div>
              <h3 class="font-semibold text-ink">${esc(f.q)}</h3>
              <p class="mt-1 text-sm leading-relaxed text-ink-soft">${esc(f.a)}</p>
            </div>`,
              )
              .join('\n            ')}
          </div>
        </section>`
    : '';
  const jsonLd = [
    webPageLd({
      name: p.title,
      url: absolute,
      dateModified: TODAY,
      description: p.description,
    }),
    breadcrumbLd([
      { name: SITE.name, item: `${SITE.url}/` },
      { name: 'Salários por Profissão', item: `${SITE.url}/#salarios` },
      { name: p.profissao, item: absolute },
    ]),
    faqPageLd(faqs),
  ].filter(Boolean);

  return `${head({
    title: p.title,
    description: p.description,
    keywords: p.keywords || `salário líquido ${p.profissao}, ${p.profissao} CLT`,
    canonical,
    active: 'salarios',
    jsonLd,
  })}
  <div class="flex min-h-screen flex-col">
    ${header('salarios')}
    <main class="flex-1 px-4 py-10 sm:px-8 sm:py-12">
      <div class="mx-auto w-full max-w-calc space-y-8">
        <nav class="flex flex-wrap items-center gap-2 text-sm text-ink-soft" aria-label="Breadcrumb">
          <a href="/" class="hover:text-brand">${esc(SITE.name)}</a>
          <span class="text-ink-faint">&gt;</span>
          <a href="/#salarios" class="hover:text-brand">Salários por Profissão</a>
          <span class="text-ink-faint">&gt;</span>
          <span class="font-semibold text-brand-deep" aria-current="page">${esc(p.profissao)}</span>
        </nav>

        <div>
          <p class="text-xs font-semibold uppercase tracking-wide text-ink-muted">Salários por Profissão</p>
          <h1 class="mt-1 font-display text-3xl font-bold text-ink sm:text-[32px]">Salário líquido de ${esc(p.profissao)} CLT</h1>
          <p class="mt-2 text-lg text-ink-soft">${esc(p.description)}</p>
          ${
            salary
              ? `<p class="mt-3 text-sm font-semibold text-brand-deep">Média nacional (bruto): ${esc(formatBrl(salary.brutoMedio))} <span class="font-normal text-ink-muted">· CAGED / Portal Salário</span></p>`
              : ''
          }
        </div>

        <div class="ad-slot" data-ads="off" data-ad-slot="prog-top"></div>

        ${salarySectionHtml(p, salary)}

        <section class="space-y-3 rounded-3xl border border-line bg-white p-6 shadow-card sm:p-8">
          <h2 class="font-display text-xl font-semibold text-ink">Visão geral</h2>
          <p class="text-sm leading-relaxed text-ink-soft">${esc(p.intro)}</p>
          ${
            diffList
              ? `<h3 class="pt-2 font-semibold text-ink">Pontos comuns na categoria</h3>
          <ul class="list-disc space-y-1 pl-5 text-sm text-ink-soft">
          ${diffList}
          </ul>`
              : ''
          }
        </section>

        <section class="space-y-3 rounded-3xl border border-line bg-white p-6 shadow-card sm:p-8">
          <h2 class="font-display text-xl font-semibold text-ink">Como simular o seu líquido</h2>
          <p class="text-sm leading-relaxed text-ink-soft">${esc(p.howTo)}</p>
          <a href="${calcHref}" class="btn-primary mt-2 inline-flex h-12 px-6 text-sm" style="width:auto">Abrir calculadora de salário líquido</a>
          <p class="text-xs text-ink-muted">${esc(EDITORIAL_DISCLAIMER)}</p>
        </section>

        ${faqHtml}

        <section class="space-y-3" aria-labelledby="related-heading">
          <h2 id="related-heading" class="font-display text-xl font-semibold text-ink">Calculadoras relacionadas</h2>
          <div class="flex flex-wrap gap-2">
            ${relatedHtml}
            <a href="/tabelas-${LEGISLATION_YEAR}/" class="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink-soft hover:border-brand/40">Tabelas ${LEGISLATION_YEAR}</a>
            <a href="/guias/como-calcular-salario-liquido/" class="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink-soft hover:border-brand/40">Guia salário líquido</a>
          </div>
        </section>

        ${backToTopHtml()}
      </div>
    </main>
    ${footer()}
  </div>
${scripts('\n  <script type="module">document.querySelector("[data-back-to-top]")?.addEventListener("click", (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); });</script>')}`;
}

function salvosPage() {
  return simplePage(
    'Cálculos salvos',
    '/salvos/',
    `<p class="text-ink-soft">A opção de salvar cálculos no aparelho foi descontinuada.</p>
     <p class="mt-3 text-ink-soft">Depois de calcular, use <strong>Compartilhar</strong> na calculadora para enviar o resultado.</p>
     <p class="mt-8"><a href="/#calculadoras" class="btn-primary inline-flex h-12 px-6 text-sm" style="width:auto">Ver calculadoras</a></p>`,
    {
      active: '',
      noindex: true,
    },
  );
}

// --- emit files ---
write('index.html', homePage());
for (const c of CALCULATORS) {
  write(`calculadoras/${c.slug}/index.html`, calcPage(c));
}
for (const p of PROFISSOES_SALARIO_LIQUIDO) {
  write(`salario-liquido-${p.slug}/index.html`, professionPage(p));
}
write('privacidade/index.html', legalPage('privacy'));
write('termos/index.html', legalPage('terms'));
write('salvos/index.html', salvosPage());

const GUIDE_LIST = guides(LEGISLATION_YEAR);
write(
  'guias/index.html',
  simplePage(
    `Guias trabalhistas ${LEGISLATION_YEAR}`,
    '/guias/',
    `<p>Artigos práticos para entender os cálculos da CLT. Use junto com as calculadoras gratuitas.</p>
     <ul class="mt-8 space-y-4">
       ${GUIDE_LIST.map(
         (g) => `<li class="rounded-2xl border border-line bg-white p-5 shadow-card">
         <a href="/guias/${g.slug}/" class="font-display text-lg font-bold text-ink hover:text-brand">${esc(g.title)}</a>
         <p class="mt-1 text-sm text-ink-muted">${esc(g.description)}</p>
       </li>`,
       ).join('\n       ')}
     </ul>
     <p class="mt-8"><a class="font-semibold text-brand underline" href="/tabelas-${LEGISLATION_YEAR}/">Ver tabelas ${LEGISLATION_YEAR}</a></p>`,
    {
      active: 'guides',
      jsonLd: collectionPageLd({
        name: `Guias trabalhistas ${LEGISLATION_YEAR}`,
        url: `${SITE.url}/guias/`,
        description: `Artigos práticos CLT ${LEGISLATION_YEAR}`,
        items: GUIDE_LIST.map((g) => ({
          name: g.title,
          url: `${SITE.url}/guias/${g.slug}/`,
        })),
      }),
    },
  ),
);
for (const g of GUIDE_LIST) {
  const related = (g.related || [])
    .map((slug) => CALCULATORS.find((c) => c.slug === slug))
    .filter(Boolean)
    .map(
      (c) =>
        `<a href="/calculadoras/${c.slug}/" class="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-brand">${esc(c.title)}</a>`,
    )
    .join(' ');
  const enriched = enrichGuideBody(g.body);
  const absolute = `${SITE.url}/guias/${g.slug}/`;
  const toc =
    enriched.headings.length > 1
      ? `<nav class="mt-6 rounded-2xl border border-line bg-white p-5 shadow-card" aria-label="Índice">
        <p class="font-display text-sm font-semibold text-ink">Neste guia</p>
        <ol class="mt-3 list-decimal space-y-1 pl-5 text-sm text-ink-soft">
          ${enriched.headings.map((h) => `<li><a class="text-brand underline" href="#${h.id}">${esc(h.text)}</a></li>`).join('\n          ')}
        </ol>
      </nav>`
      : '';
  write(
    `guias/${g.slug}/index.html`,
    `${head({
      title: g.title,
      description: g.description,
      keywords: g.keywords,
      canonical: `/guias/${g.slug}/`,
      active: 'guides',
      ogType: 'article',
      jsonLd: [
        articleLd({
          headline: g.title,
          description: g.description,
          dateModified: TODAY,
          datePublished: TODAY,
          url: absolute,
          site: SITE,
        }),
        breadcrumbLd([
          { name: 'Início', item: `${SITE.url}/` },
          { name: 'Guias', item: `${SITE.url}/guias/` },
          { name: g.title, item: absolute },
        ]),
      ],
    })}
  <div class="flex min-h-screen flex-col">
    ${header('guides')}
    <main class="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-8">
      <nav class="mb-6 flex flex-wrap items-center gap-2 text-sm text-ink-soft" aria-label="Breadcrumb">
        <a href="/" class="hover:text-brand">Início</a>
        <span class="text-ink-faint">&gt;</span>
        <a href="/guias/" class="hover:text-brand">Guias</a>
        <span class="text-ink-faint">&gt;</span>
        <span class="font-semibold text-brand-deep" aria-current="page">${esc(g.title)}</span>
      </nav>
      <h1 class="font-display text-3xl font-bold text-ink">${esc(g.title)}</h1>
      <p class="mt-3 text-sm text-ink-muted">Por ${esc(SITE.org)} · Atualizado em ${TODAY} · ${enriched.minutes} min de leitura</p>
      <p class="mt-4 text-base leading-relaxed text-ink-soft">${esc(g.description)}</p>
      ${toc}
      <div class="prose-calc mt-8 space-y-3 text-base leading-relaxed text-ink-soft">${enriched.body}</div>
      ${related ? `<div class="mt-10"><p class="font-display text-lg font-semibold text-ink">Calcule agora</p><div class="mt-3 flex flex-wrap gap-2">${related}</div></div>` : ''}
      ${backToTopHtml()}
    </main>
    ${footer()}
  </div>
${scripts('\n  <script type="module">document.querySelector("[data-back-to-top]")?.addEventListener("click", (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); });</script>')}`,
  );
}

write(
  `tabelas-${LEGISLATION_YEAR}/index.html`,
  `${head({
    title: `Tabelas INSS, IRRF e Seguro-Desemprego ${LEGISLATION_YEAR}`,
    description: `Tabelas atualizadas ${LEGISLATION_YEAR}: INSS progressivo, IRRF mensal, seguro-desemprego, FGTS e salário mínimo. Use com as calculadoras CLT.`,
    keywords: `tabela INSS ${LEGISLATION_YEAR}, tabela IRRF ${LEGISLATION_YEAR}, seguro-desemprego ${LEGISLATION_YEAR}, FGTS, salário mínimo`,
    canonical: `/tabelas-${LEGISLATION_YEAR}/`,
    active: 'tables',
    jsonLd: webPageLd({
      name: `Tabelas trabalhistas ${LEGISLATION_YEAR}`,
      dateModified: TODAY,
      url: `${SITE.url}/tabelas-${LEGISLATION_YEAR}/`,
      description: `INSS, IRRF, seguro-desemprego, FGTS e salário mínimo ${LEGISLATION_YEAR}`,
    }),
  })}
  <div class="flex min-h-screen flex-col">
    ${header('tables')}
    <main class="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-8">
      <nav class="mb-6 flex flex-wrap items-center gap-2 text-sm text-ink-soft" aria-label="Breadcrumb">
        <a href="/" class="hover:text-brand">Início</a>
        <span class="text-ink-faint">&gt;</span>
        <span class="font-semibold text-brand-deep" aria-current="page">Tabelas ${LEGISLATION_YEAR}</span>
      </nav>
      <h1 class="font-display text-3xl font-bold text-ink">Tabelas ${LEGISLATION_YEAR}</h1>
      <p class="mt-3 text-sm text-ink-muted">Por ${esc(SITE.org)} · Atualizado em ${TODAY}</p>
      <div class="mt-8 space-y-3 text-base leading-relaxed text-ink-soft">${tabelasBody(LEGISLATION_YEAR)}</div>
      ${backToTopHtml()}
    </main>
    ${footer()}
  </div>
${scripts('\n  <script type="module">document.querySelector("[data-back-to-top]")?.addEventListener("click", (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); });</script>')}`,
);

write(
  'sobre/index.html',
  simplePage(
    'Sobre nós',
    '/sobre/',
    `<p>O <strong>${SITE.name}</strong> é um produto da <strong>${SITE.org}</strong>. Reunimos calculadoras CLT, guias e informações para ajudar o trabalhador brasileiro a entender direitos e remuneração de forma simples e gratuita.</p>
     <p>As fórmulas seguem as mesmas regras do aplicativo Android. Sempre confira a legislação vigente e, em caso de dúvida, consulte um profissional.</p>
     <p class="mt-4 text-sm text-ink-muted">${esc(EDITORIAL_DISCLAIMER)}</p>
     <p>Contato: <a class="text-brand underline" href="mailto:${SITE.email}">${SITE.email}</a></p>
     <p class="mt-6"><a class="font-semibold text-brand underline" href="/guias/">Ler guias</a> · <a class="font-semibold text-brand underline" href="/tabelas-${LEGISLATION_YEAR}/">Ver tabelas ${LEGISLATION_YEAR}</a> · <a class="font-semibold text-brand underline" href="https://financiamento.ivalice.com.br/" rel="noopener">Financiamento</a> · <a class="font-semibold text-brand underline" href="https://investir.ivalice.com.br/" rel="noopener">Investir</a> · <a class="font-semibold text-brand underline" href="https://mei.ivalice.com.br/" rel="noopener">MEI</a> · <a class="font-semibold text-brand underline" href="https://churrasco.ivalice.com.br/" rel="noopener">Churrasco</a></p>`,
  ),
);
write(
  'contato/index.html',
  simplePage(
    'Contato',
    '/contato/',
    `<p>Fale com a ${SITE.org}:</p>
     <p><a class="text-brand underline" href="mailto:${SITE.email}">${SITE.email}</a></p>
     <p>Site institucional: <a class="text-brand underline" href="https://ivalice.com.br" rel="noopener">ivalice.com.br</a></p>`,
  ),
);

const urls = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/guias/', priority: '0.85', changefreq: 'weekly' },
  { path: `/tabelas-${LEGISLATION_YEAR}/`, priority: '0.9', changefreq: 'monthly' },
  { path: '/privacidade/', priority: '0.3', changefreq: 'yearly' },
  { path: '/termos/', priority: '0.3', changefreq: 'yearly' },
  { path: '/sobre/', priority: '0.4', changefreq: 'monthly' },
  { path: '/contato/', priority: '0.4', changefreq: 'monthly' },
  ...GUIDE_LIST.map((g) => ({
    path: `/guias/${g.slug}/`,
    priority: '0.8',
    changefreq: 'monthly',
  })),
  ...CALCULATORS.map((c) => ({
    path: `/calculadoras/${c.slug}/`,
    priority: '0.9',
    changefreq: 'weekly',
  })),
  ...PROFISSOES_SALARIO_LIQUIDO.map((p) => ({
    path: `/salario-liquido-${p.slug}/`,
    priority: '0.75',
    changefreq: 'monthly',
  })),
];
write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${SITE.url}${u.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`,
);
write(
  'robots.txt',
  `User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: ${SITE.url}/sitemap.xml
`,
);
write('CNAME', 'clt.ivalice.com.br\n');
write(`${INDEXNOW_KEY}.txt`, `${INDEXNOW_KEY}\n`);
write(
  'llms.txt',
  `# ${SITE.name}
> ${SITE.description}

${SITE.organizationDescription} Produto da Ivalice Labs. Cálculos rodam no navegador; resultados são estimativas e não substituem holerite, TRCT ou orientação profissional.

## Calculadoras CLT
${CALCULATORS.map((c) => `- [${c.title}](${SITE.url}/calculadoras/${c.slug}/): ${c.blurb}`).join('\n')}

## Salários por Profissão
${PROFISSOES_SALARIO_LIQUIDO.map((p) => {
  const s = salaryForSlug(p.slug);
  const avg = s ? ` Média bruto ~${formatBrl(s.brutoMedio)} (${SALARIOS_DATA.meta.fonte}).` : '';
  return `- [${p.profissao}](${SITE.url}/salario-liquido-${p.slug}/): ${p.description}${avg}`;
}).join('\n')}

## Guias e tabelas
- [Guias](${SITE.url}/guias/): artigos práticos CLT
${GUIDE_LIST.map((g) => `- [${g.title}](${SITE.url}/guias/${g.slug}/): ${g.description}`).join('\n')}
- [Tabelas ${LEGISLATION_YEAR}](${SITE.url}/tabelas-${LEGISLATION_YEAR}/): INSS, IRRF e seguro-desemprego

## Institucional
- [Início](${SITE.url}/): calculadoras CLT e portal
- [Sobre](${SITE.url}/sobre/)
- [Contato](${SITE.url}/contato/): ${SITE.email}
- [Ivalice Labs](https://ivalice.com.br/): empresa
- [Financiamento](https://financiamento.ivalice.com.br/)
- [Investir](https://investir.ivalice.com.br/)
- [MEI](https://mei.ivalice.com.br/)
- [Churrasco](https://churrasco.ivalice.com.br/)

## Optional
- [Sitemap](${SITE.url}/sitemap.xml)
- [ads.txt](${SITE.url}/ads.txt)
`,
);

function buildSearchIndex() {
  const GUIDE_LIST_LOCAL = guides(LEGISLATION_YEAR);
  const items = [
    {
      type: 'page',
      title: 'Início',
      description: SITE.description,
      href: '/',
      keywords: 'início home portal guia trabalhador calculadoras CLT',
    },
    {
      type: 'page',
      title: `Tabelas ${LEGISLATION_YEAR}`,
      description: `Tabelas INSS, IRRF, FGTS e seguro-desemprego ${LEGISLATION_YEAR}`,
      href: `/tabelas-${LEGISLATION_YEAR}/`,
      keywords: `tabelas ${LEGISLATION_YEAR} INSS IRRF FGTS salário mínimo seguro-desemprego`,
    },
    {
      type: 'page',
      title: 'Guias trabalhistas',
      description: 'Artigos práticos sobre cálculos da CLT',
      href: '/guias/',
      keywords: 'guias artigos direitos trabalhistas CLT',
    },
    {
      type: 'page',
      title: 'Salários por Profissão',
      description: 'Informações e salário líquido por profissão',
      href: '/#salarios',
      keywords: 'salários por profissão média salarial CAGED',
    },
    {
      type: 'page',
      title: 'Direitos Trabalhistas',
      description: 'Entenda direitos previstos na legislação trabalhista',
      href: '/#direitos',
      keywords: 'direitos trabalhistas férias FGTS aviso prévio INSS',
    },
    {
      type: 'page',
      title: 'Sobre nós',
      description: `Sobre o ${SITE.name}`,
      href: '/sobre/',
      keywords: 'sobre ivalice labs guia do trabalhador',
    },
    {
      type: 'page',
      title: 'Contato',
      description: 'Fale com a Ivalice Labs',
      href: '/contato/',
      keywords: 'contato email suporte',
    },
    ...CALCULATORS.map((c) => ({
      type: 'calc',
      title: c.title,
      description: c.blurb,
      href: `/calculadoras/${c.slug}/`,
      keywords: `${c.keywords || ''} calculadora ${c.title} CLT`,
    })),
    ...GUIDE_LIST_LOCAL.map((g) => ({
      type: 'guide',
      title: g.title,
      description: g.description,
      href: `/guias/${g.slug}/`,
      keywords: `${g.keywords || ''} guia ${g.title}`,
    })),
    ...PROFISSOES_SALARIO_LIQUIDO.map((p) => {
      const s = salaryForSlug(p.slug);
      return {
        type: 'profession',
        title: `Salário líquido — ${p.profissao}`,
        description: s
          ? `Média bruto ${formatBrl(s.brutoMedio)}. ${p.description}`
          : p.description,
        href: `/salario-liquido-${p.slug}/`,
        keywords: `${p.keywords || ''} ${p.profissao} salário médio salário líquido profissão`,
      };
    }),
  ];
  return items;
}

write(
  'assets/js/search-index.js',
  `/** Gerado por scripts/generate.mjs — não editar à mão. */
export const SEARCH_INDEX = ${JSON.stringify(buildSearchIndex(), null, 2)};
`,
);

write('.nojekyll', '');
write(
  '.gitignore',
  `.DS_Store
Thumbs.db
*.log
.idea/
.vscode/
node_modules/
scripts/bin/
assets/css/app.tailwind.css
`,
);

console.log('Done.');
