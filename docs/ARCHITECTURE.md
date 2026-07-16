# Arquitetura — Guia do Trabalhador Brasileiro (CLT)

Site estático gerado por `scripts/generate.mjs` e publicado via GitHub Pages (`clt.ivalice.com.br`).

## Princípios de migração

- Não mudar identidade visual, URLs existentes nem a lógica das calculadoras.
- Não remover conteúdo; só acrescentar.
- Não criar páginas vazias nem inventar dados (tabelas/salários).
- Validar localmente: `npm run generate` e `node scripts/validate-seo.mjs`.

## Fluxo de build

1. Conteúdo por calculadora em `scripts/content/calculators/{slug}.mjs` (`howto`, `related`, `faqs`, `sections`).
2. Guias e tabelas em `scripts/content-seo.mjs` (`guides()`, `tabelasBody()`).
3. Helpers em `scripts/lib/html.mjs` e `scripts/lib/schema.mjs`.
4. `node scripts/generate.mjs` escreve HTML, `sitemap.xml`, `robots.txt`, `llms.txt`.

## Runtime (navegador)

- `assets/js/calculators.js` — fórmulas (não alterar sem testes).
- `assets/js/calc-page.js` — I/O do formulário.
- `assets/js/site.js` + `main.js` — catálogo de busca / `?q=` na home.

## URLs estáveis

- `/calculadoras/{slug}/`
- `/guias/` e `/guias/{slug}/`
- `/tabelas-2026/` (não renomear nesta fase)
- `/salvos/` — `noindex`

## Como enriquecer uma calculadora

Edite `scripts/content/calculators/{slug}.mjs`:

- Mantenha as FAQs antigas e acrescente até 8–15 no total.
- `sections(year)` devolve blocos `{ id, title, html }` renderizados abaixo do formulário.
- Rode `npm run generate` e `node scripts/validate-seo.mjs`.

## Páginas programmatic (salário líquido por profissão)

Fonte: `scripts/content/programmatic/salario-liquido/profissoes.mjs`

- URL: `/salario-liquido-{slug}/` (ex.: `/salario-liquido-enfermeiro/`)
- Schema: `WebPage` + `BreadcrumbList` + `FAQPage` (se houver FAQ)
- CTA fixo para `/calculadoras/salario-liquido/`
- Sem salários médios inventados — conteúdo educativo + link para a calculadora

## Ads

Slots `.ad-slot` com `data-ads="off"` (CSS esconde). Ativar só quando `ADS_ENABLED` / AdSense estiver pronto.
