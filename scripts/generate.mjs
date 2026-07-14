/**
 * Gera páginas estáticas do site (HTML puro + Tailwind CDN).
 * Executar: node scripts/generate.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const SITE = {
  name: 'Calculadora do Trabalhador Brasileiro',
  url: 'https://clt.ivalice.com.br',
  description:
    'A ferramenta mais completa para o trabalhador brasileiro. Simples, rápido e 100% gratuito.',
  email: 'contato@ivalice.com.br',
  org: 'Ivalice Labs',
  version: '3.4.1',
};

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
    home: false,
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

function head({ title, description, keywords = '', canonical, active = '' }) {
  const fullTitle = title.includes(SITE.name) ? title : `${title} | ${SITE.name}`;
  return `<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(fullTitle)}</title>
  <meta name="description" content="${esc(description)}">
  ${keywords ? `<meta name="keywords" content="${esc(keywords)}">` : ''}
  <meta name="theme-color" content="#1b5e3b">
  <meta name="robots" content="index,follow">
  <link rel="canonical" href="${SITE.url}${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:title" content="${esc(fullTitle)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${SITE.url}${canonical}">
  <meta property="og:site_name" content="${esc(SITE.name)}">
  <meta name="twitter:card" content="summary">
  <link rel="icon" href="/assets/img/logo.png" type="image/png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: { DEFAULT: '#1b5e3b', deep: '#1a5a4a', mint: '#e8f5e9' },
            page: '#f9fafb',
            ink: { DEFAULT: '#111827', muted: '#6b7280', faint: '#9ca3af', soft: '#687280' },
            line: '#e5e7eb',
            danger: '#dc2626',
          },
          fontFamily: {
            sans: ['Inter', 'system-ui', 'sans-serif'],
            display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
          },
          maxWidth: { site: '1440px', calc: '800px' },
          boxShadow: {
            card: '0 4px 12px rgba(0,0,0,0.03)',
            hero: '0 8px 16px rgba(0,0,0,0.03)',
          },
        },
      },
    };
  </script>
  <link rel="stylesheet" href="/assets/css/styles.css">
  <script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    publisher: { '@type': 'Organization', name: SITE.org, email: SITE.email },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE.url}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  })}</script>
</head>
<body class="min-h-screen bg-page text-ink antialiased" data-active="${active}">`;
}

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function logoBlock() {
  return `<a href="/" class="flex items-center gap-3 shrink-0">
    <img src="/assets/img/logo.png" alt="" width="38" height="40" class="h-10 w-[38px] object-contain">
    <span class="leading-tight">
      <span class="block font-display text-[15px] font-extrabold tracking-wide text-brand sm:text-[18px]">CALCULADORA DO TRABALHADOR</span>
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
      <nav class="hidden items-center gap-8 md:flex" aria-label="Principal">
        ${link('home', '/', 'Início')}
        ${link('calcs', '/#calculadoras', 'Calculadoras')}
      </nav>
      <div class="hidden items-center gap-4 lg:flex">
        <label class="relative flex h-12 w-80 items-center gap-3 rounded-xl border border-line bg-white px-4">
          <svg class="h-5 w-5 shrink-0 text-ink-faint" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3-3"/></svg>
          <input type="search" data-header-search placeholder="Busque por uma calculadora..." class="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint">
        </label>
      </div>
      <button type="button" data-mobile-toggle class="rounded-lg p-2 text-ink md:hidden" aria-expanded="false" aria-controls="mobile-nav" aria-label="Abrir menu">
        <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>
    </div>
    <div id="mobile-nav" data-mobile-nav class="mobile-nav border-t border-line px-4 md:hidden">
      <nav class="flex flex-col gap-1 py-4 text-[15px]">
        <a href="/" class="rounded-lg px-3 py-2.5 font-semibold text-brand">Início</a>
        <a href="/#calculadoras" class="rounded-lg px-3 py-2.5 text-ink-muted">Calculadoras</a>
        <a href="/sobre/" class="rounded-lg px-3 py-2.5 text-ink-muted">Sobre</a>
        <a href="/contato/" class="rounded-lg px-3 py-2.5 text-ink-muted">Contato</a>
        <a href="/privacidade/" class="rounded-lg px-3 py-2.5 text-ink-muted">Privacidade</a>
        <a href="/termos/" class="rounded-lg px-3 py-2.5 text-ink-muted">Termos</a>
      </nav>
    </div>
  </header>`;
}

function footer(variant = 'home') {
  const calcLinks = CALCULATORS.filter((c) => c.home || c.slug === 'irrf')
    .map((c) => `<a href="/calculadoras/${c.slug}/" class="text-ink-soft hover:text-brand">${esc(c.title)}</a>`)
    .join('\n              ');

  if (variant === 'calc') {
    return `<footer class="mt-auto border-t border-line bg-white px-6 pb-10 pt-16 sm:px-12 lg:px-20">
      <div class="mx-auto flex max-w-site flex-col gap-12">
        <div class="flex flex-col justify-between gap-10 lg:flex-row">
          <div class="max-w-md space-y-4">
            ${logoBlock()}
            <p class="text-sm leading-relaxed text-ink-soft">Ferramentas gratuitas para auxiliar o trabalhador brasileiro no cálculo de seus direitos e obrigações trabalhistas.</p>
          </div>
          <div class="flex flex-wrap gap-12 sm:gap-16">
            <div class="space-y-4 text-sm">
              <p class="font-bold text-ink">Calculadoras</p>
              <div class="flex flex-col gap-3">${calcLinks}</div>
            </div>
            <div class="space-y-4 text-sm">
              <p class="font-bold text-ink">Empresa</p>
              <a href="/sobre/" class="block text-ink-soft hover:text-brand">Sobre nós</a>
              <a href="/termos/" class="block text-ink-soft hover:text-brand">Termos de Uso</a>
              <a href="/privacidade/" class="block text-ink-soft hover:text-brand">Privacidade</a>
              <a href="/contato/" class="block text-ink-soft hover:text-brand">Contato</a>
            </div>
          </div>
        </div>
        <div class="flex flex-col justify-between gap-4 border-t border-line pt-6 text-sm text-ink-faint sm:flex-row sm:items-center">
          <p>© ${new Date().getFullYear()} ${esc(SITE.name)}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>`;
  }

  return `<footer class="mt-auto border-t border-line bg-white px-6 pb-10 pt-16 sm:px-12 lg:px-12">
    <div class="mx-auto flex max-w-site flex-col gap-12">
      <div class="flex flex-col justify-between gap-10 lg:flex-row">
        <div class="max-w-sm space-y-4">
          ${logoBlock()}
          <p class="text-sm leading-relaxed text-ink-soft">A ferramenta mais completa para o trabalhador brasileiro. Simples, rápido e 100% gratuito.</p>
        </div>
        <div class="grid grid-cols-2 gap-10 sm:grid-cols-3 sm:gap-16">
          <div class="space-y-4 text-sm">
            <p class="font-bold text-ink">Calculadoras</p>
            <div class="flex flex-col gap-3">${CALCULATORS.filter((c) => c.home)
              .map((c) => `<a href="/calculadoras/${c.slug}/" class="text-ink-soft hover:text-brand">${esc(c.title)}</a>`)
              .join('\n              ')}</div>
          </div>
          <div class="space-y-4 text-sm">
            <p class="font-bold text-ink">Institucional</p>
            <a href="/sobre/" class="block text-ink-soft hover:text-brand">Sobre nós</a>
            <a href="/contato/" class="block text-ink-soft hover:text-brand">Contato</a>
          </div>
          <div class="space-y-4 text-sm">
            <p class="font-bold text-ink">Legal</p>
            <a href="/privacidade/" class="block text-ink-soft hover:text-brand">Privacidade</a>
            <a href="/termos/" class="block text-ink-soft hover:text-brand">Termos de Uso</a>
          </div>
        </div>
      </div>
      <div class="flex flex-col justify-between gap-3 border-t border-line pt-6 text-sm text-ink-faint sm:flex-row sm:items-center">
        <p>© ${new Date().getFullYear()} ${esc(SITE.name)}. Todos os direitos reservados.</p>
        <p class="flex items-center gap-4">
          <span>Versão ${SITE.version} (Estável)</span>
          <span class="inline-flex items-center gap-2 text-brand"><span class="h-2 w-2 rounded-full bg-brand"></span> Sistema Online</span>
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
    title: SITE.name,
    description: SITE.description,
    keywords: 'calculadora trabalhista, salário líquido, FGTS, férias, 13º, rescisão, CLT',
    canonical: '/',
    active: 'home',
  })}
  <div class="flex min-h-screen flex-col">
    ${header('home')}
    <main class="flex-1">
      <section class="flex flex-col items-center gap-8 px-4 pb-10 pt-12 sm:px-8 sm:pt-16">
        <div class="text-center">
          <h1 class="font-display text-3xl font-bold text-ink sm:text-[40px]" data-greeting>Boa noite! <span aria-hidden="true">🌙</span></h1>
          <p class="mt-2 font-display text-base text-ink-muted sm:text-lg">Como podemos ajudar o trabalhador brasileiro hoje?</p>
        </div>
        <form data-hero-search class="hero-search flex w-full max-w-[720px] items-center gap-3 rounded-[20px] border-2 border-brand bg-white px-4 py-3 sm:px-6 sm:h-16">
          <svg class="h-6 w-6 shrink-0 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3-3"/></svg>
          <input name="q" type="search" placeholder="Ex: Salário líquido com 2 dependentes..." class="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-ink-faint" autocomplete="off">
          <button type="submit" class="shrink-0 rounded-xl bg-brand px-5 py-2.5 text-xs font-semibold text-white">Buscar</button>
        </form>
        <div data-search-results class="hidden w-full max-w-[720px] rounded-2xl border border-line bg-white p-2 shadow-card"></div>
      </section>

      <section id="calculadoras" class="mx-auto grid max-w-site gap-12 px-4 pb-20 sm:px-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12 lg:px-12">
        <div class="space-y-8">
          <div class="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 class="font-display text-2xl font-bold text-ink">Calculadoras</h2>
              <p class="mt-1 text-sm text-ink-muted">Selecione uma ferramenta para começar</p>
            </div>
            <a href="#calculadoras" class="inline-flex items-center gap-2 text-sm font-semibold text-brand">
              Ver todas as 24 calculadoras
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
          <div class="ad-slot rounded-2xl border border-dashed border-line bg-white p-6 text-center text-xs text-ink-faint" data-ads="off" data-ad-slot="home-sidebar">
            Espaço para anúncio
          </div>
        </aside>
      </section>
    </main>
    ${footer('home')}
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
          <select class="field" name="dismissalType">
            <option value="" disabled selected>Selecione</option>
            <option value="WITHOUT_JUST_CAUSE">Sem justa causa</option>
            <option value="AGREEMENT">Acordo</option>
            <option value="WITH_JUST_CAUSE">Com justa causa</option>
            <option value="RESIGNATION">Pedido de demissão</option>
          </select>
        </label>
        ${number('vacationDays', 'Saldo de férias (dias)', { min: '0', max: '60', placeholder: '0' })}
      </div>
      <div class="flex flex-col gap-3 text-sm text-ink-soft">
        <label class="flex items-center gap-3"><input type="checkbox" name="workedNotice" class="h-4 w-4 rounded border-line"> Aviso prévio trabalhado</label>
        <label class="flex items-center gap-3"><input type="checkbox" name="includeFgts" class="h-4 w-4 rounded border-line"> Incluir saque FGTS estimado</label>
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

function calcPage(c) {
  const canonical = `/calculadoras/${c.slug}/`;
  return `${head({
    title: `Calculadora de ${c.title}`,
    description: c.blurb,
    keywords: c.keywords,
    canonical,
    active: 'calcs',
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
          <h1 class="font-display text-3xl font-bold text-ink sm:text-[32px]">${esc(c.title)}</h1>
          <p class="mt-2 text-lg text-ink-soft">Informe os dados para o cálculo</p>
        </div>

        <div class="ad-slot" data-ads="off" data-ad-slot="calc-top"></div>

        <form id="calc-form" data-calc-id="${c.id}" class="space-y-8 rounded-3xl bg-white p-6 shadow-card sm:p-10" novalidate>
          ${formFields(c.id)}
          <button type="submit" class="btn-primary">Calcular</button>
        </form>

        <section id="results" class="result-panel space-y-8" hidden>
          <div class="rounded-3xl bg-brand-deep px-6 py-8 text-center text-white">
            <p class="text-base font-medium opacity-80" data-result-label>${esc(c.resultLabel)}</p>
            <p class="mt-2 font-display text-4xl font-bold sm:text-[40px]" data-result-value>—</p>
          </div>
          <div>
            <h2 class="font-display text-xl font-semibold text-ink">Detalhamento</h2>
            <div class="mt-2 divide-y divide-line" data-breakdown></div>
            <p class="mt-4 text-sm italic text-ink-faint">* Valores aproximados com tabelas de referência ${new Date().getFullYear()}. Confira a legislação vigente.</p>
          </div>
          <div class="grid gap-4 sm:grid-cols-2">
            <button type="button" data-share class="btn-secondary">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M12 3v12M8 7l4-4 4 4"/></svg>
              Compartilhar
            </button>
            <button type="button" data-save class="btn-primary h-14 text-base">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/></svg>
              Salvar
            </button>
          </div>
        </section>
      </div>
    </main>
    ${footer('calc')}
  </div>
${scripts('\n  <script type="module" src="/assets/js/calc-page.js"></script>')}`;
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
      <p class="mt-3">Utilizamos armazenamento local do navegador para preferências e, opcionalmente, histórico de cálculos salvos no próprio aparelho. Cookies essenciais e de terceiros (CDN, fontes, AdSense) podem ser carregados. Você pode limpar ou bloquear cookies nas configurações do navegador.</p>

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
    ${footer('calc')}
  </div>
${scripts()}`;
}

function simplePage(title, canonical, html) {
  return `${head({ title, description: `${title} — ${SITE.name}`, canonical, active: '' })}
  <div class="flex min-h-screen flex-col">
    ${header('')}
    <main class="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-8">
      <h1 class="font-display text-3xl font-bold text-ink">${esc(title)}</h1>
      <div class="mt-8 space-y-4 text-base leading-relaxed text-ink-soft">${html}</div>
    </main>
    ${footer('calc')}
  </div>
${scripts()}`;
}

// --- emit files ---
write('index.html', homePage());
for (const c of CALCULATORS) {
  write(`calculadoras/${c.slug}/index.html`, calcPage(c));
}
write('privacidade/index.html', legalPage('privacy'));
write('termos/index.html', legalPage('terms'));
write(
  'sobre/index.html',
  simplePage(
    'Sobre nós',
    '/sobre/',
    `<p>A <strong>${SITE.name}</strong> é um produto da <strong>${SITE.org}</strong>. Nosso objetivo é ajudar o trabalhador brasileiro a entender direitos e cálculos da CLT de forma simples e gratuita.</p>
     <p>As fórmulas seguem as mesmas regras do aplicativo Android. Sempre confira a legislação vigente e, em caso de dúvida, consulte um profissional.</p>
     <p>Contato: <a class="text-brand underline" href="mailto:${SITE.email}">${SITE.email}</a></p>`,
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
  '/',
  '/privacidade/',
  '/termos/',
  '/sobre/',
  '/contato/',
  ...CALCULATORS.map((c) => `/calculadoras/${c.slug}/`),
];
write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE.url}${u}</loc></url>`).join('\n')}
</urlset>
`,
);
write(
  'robots.txt',
  `User-agent: *
Allow: /

Sitemap: ${SITE.url}/sitemap.xml
`,
);
write('CNAME', 'clt.ivalice.com.br\n');
write('.nojekyll', '');
write(
  '.gitignore',
  `.DS_Store
Thumbs.db
*.log
.idea/
.vscode/
node_modules/
`,
);

console.log('Done.');
