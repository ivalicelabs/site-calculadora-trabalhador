import { CALCULATORS, HOME_CALCULATORS } from './site.js';

function greetingForHour(h) {
  if (h >= 5 && h < 12) return { text: 'Bom dia!', emoji: '☀️' };
  if (h >= 12 && h < 18) return { text: 'Boa tarde!', emoji: '🌤️' };
  return { text: 'Boa noite!', emoji: '🌙' };
}

function initGreeting() {
  const el = document.querySelector('[data-greeting]');
  if (!el) return;
  const g = greetingForHour(new Date().getHours());
  el.innerHTML = `${g.text} <span aria-hidden="true">${g.emoji}</span>`;
}

function searchCalculators(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return CALCULATORS.filter((c) => {
    const hay = `${c.title} ${c.shortTitle} ${c.description} ${c.keywords}`.toLowerCase();
    return hay.includes(q) || q.split(/\s+/).every((p) => hay.includes(p));
  });
}

function renderSearchResults(container, items) {
  if (!container) return;
  if (!items.length) {
    container.classList.add('hidden');
    container.innerHTML = '';
    return;
  }
  container.classList.remove('hidden');
  container.innerHTML = items
    .map(
      (c) =>
        `<a href="/calculadoras/${c.slug}/" class="block rounded-xl px-4 py-3 text-sm hover:bg-page">
          <span class="font-semibold text-ink">${c.shortTitle || c.title}</span>
          <span class="mt-0.5 block text-xs text-ink-muted">${c.description}</span>
        </a>`,
    )
    .join('');
}

function initSearch() {
  const hero = document.querySelector('[data-hero-search]');
  const results = document.querySelector('[data-search-results]');
  const headerInput = document.querySelector('[data-header-search]');

  if (hero) {
    const input = hero.querySelector('input[name="q"]');
    const run = () => renderSearchResults(results, searchCalculators(input.value));
    const submitSearch = () => {
      const items = searchCalculators(input.value);
      if (items.length === 1) {
        window.location.href = `/calculadoras/${items[0].slug}/`;
        return;
      }
      renderSearchResults(results, items);
      document.getElementById('calculadoras')?.scrollIntoView({ behavior: 'smooth' });
    };
    hero.addEventListener('submit', (e) => {
      e.preventDefault();
      submitSearch();
    });
    hero.querySelector('[data-hero-search-submit]')?.addEventListener('click', (e) => {
      e.preventDefault();
      submitSearch();
    });
    input?.addEventListener('input', run);
  }

  if (headerInput) {
    headerInput.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;
      const items = searchCalculators(headerInput.value);
      if (items[0]) window.location.href = `/calculadoras/${items[0].slug}/`;
    });
  }

  const params = new URLSearchParams(window.location.search);
  const q = params.get('q');
  if (q && hero) {
    const input = hero.querySelector('input[name="q"]');
    if (input) {
      input.value = q;
      renderSearchResults(results, searchCalculators(q));
    }
  }
}

function initMobileNav() {
  const btn = document.querySelector('[data-mobile-toggle]');
  const nav = document.querySelector('[data-mobile-nav]');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
}

function filterHomeCards(query) {
  const grid = document.querySelector('[data-calc-grid]');
  if (!grid) return;
  const q = query.trim().toLowerCase();
  const cards = [...grid.querySelectorAll('a.calc-card')];
  cards.forEach((card) => {
    const text = card.textContent.toLowerCase();
    card.style.display = !q || text.includes(q) ? '' : 'none';
  });
}

initGreeting();
initSearch();
initMobileNav();

const heroInput = document.querySelector('[data-hero-search] input');
heroInput?.addEventListener('input', () => filterHomeCards(heroInput.value));

// Expose for optional AdSense activation later
window.__CLT_ADS__ = { enabled: false };
void HOME_CALCULATORS;
