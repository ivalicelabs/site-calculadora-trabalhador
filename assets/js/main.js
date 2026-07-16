import { CALCULATORS, HOME_CALCULATORS } from './site.js';
import { SEARCH_INDEX } from './search-index.js';

const TYPE_LABEL = {
  calc: 'Calculadora',
  guide: 'Guia',
  profession: 'Profissão',
  page: 'Página',
};

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

function normalize(s) {
  return String(s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function scoreItem(item, q, parts) {
  const hay = normalize(`${item.title} ${item.description} ${item.keywords} ${item.type}`);
  if (!hay.includes(q) && !parts.every((p) => hay.includes(p))) return 0;
  let score = 0;
  const title = normalize(item.title);
  if (title === q) score += 100;
  if (title.startsWith(q)) score += 40;
  if (title.includes(q)) score += 25;
  if (normalize(item.keywords).includes(q)) score += 20;
  if (normalize(item.description).includes(q)) score += 10;
  for (const p of parts) {
    if (title.includes(p)) score += 8;
    if (hay.includes(p)) score += 3;
  }
  if (item.type === 'calc') score += 5;
  return score;
}

function searchSite(query, limit = 8) {
  const q = normalize(query.trim());
  if (!q) return [];
  const parts = q.split(/\s+/).filter(Boolean);
  return SEARCH_INDEX.map((item) => ({ item, score: scoreItem(item, q, parts) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.item);
}

function renderSearchResults(container, items, { emptyMessage = 'Nenhum resultado.' } = {}) {
  if (!container) return;
  if (!items.length) {
    const q = container.dataset.hasQuery === '1';
    if (!q) {
      container.classList.add('hidden');
      container.innerHTML = '';
      return;
    }
    container.classList.remove('hidden');
    container.innerHTML = `<p class="px-4 py-3 text-sm text-ink-muted">${emptyMessage}</p>`;
    return;
  }
  container.classList.remove('hidden');
  container.innerHTML = items
    .map(
      (c) =>
        `<a href="${c.href}" class="block rounded-xl px-4 py-3 text-sm hover:bg-page" role="option">
          <span class="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">${TYPE_LABEL[c.type] || 'Resultado'}</span>
          <span class="mt-0.5 block font-semibold text-ink">${c.title}</span>
          <span class="mt-0.5 block text-xs text-ink-muted line-clamp-2">${c.description || ''}</span>
        </a>`,
    )
    .join('');
}

function goToBestResult(query) {
  const items = searchSite(query, 1);
  if (items[0]) window.location.href = items[0].href;
}

function initSearch() {
  const hero = document.querySelector('[data-hero-search]');
  const results = document.querySelector('[data-search-results]');
  const headerInput = document.querySelector('[data-header-search]');
  const headerResults = document.querySelector('[data-header-search-results]');

  if (hero) {
    const input = hero.querySelector('input[name="q"]');
    const run = () => {
      const q = input.value.trim();
      if (results) results.dataset.hasQuery = q ? '1' : '0';
      renderSearchResults(results, searchSite(q));
    };
    const submitSearch = () => {
      const q = input.value.trim();
      const items = searchSite(q);
      if (items.length === 1) {
        window.location.href = items[0].href;
        return;
      }
      if (results) results.dataset.hasQuery = q ? '1' : '0';
      renderSearchResults(results, items);
      filterHomeCards(q);
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
    const runHeader = () => {
      const q = headerInput.value.trim();
      if (headerResults) headerResults.dataset.hasQuery = q ? '1' : '0';
      renderSearchResults(headerResults, searchSite(q, 7), {
        emptyMessage: 'Nada encontrado para essa busca.',
      });
    };
    headerInput.addEventListener('input', runHeader);
    headerInput.addEventListener('focus', runHeader);
    headerInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (headerResults) {
          headerResults.classList.add('hidden');
          headerResults.innerHTML = '';
        }
        return;
      }
      if (e.key !== 'Enter') return;
      e.preventDefault();
      const items = searchSite(headerInput.value, 1);
      if (items[0]) window.location.href = items[0].href;
    });
    document.addEventListener('click', (e) => {
      if (!headerResults || !headerInput) return;
      const wrap = headerInput.closest('.relative');
      if (wrap && !wrap.contains(e.target)) {
        headerResults.classList.add('hidden');
      }
    });
  }

  const params = new URLSearchParams(window.location.search);
  const q = params.get('q');
  if (q && hero) {
    const input = hero.querySelector('input[name="q"]');
    if (input) {
      input.value = q;
      if (results) results.dataset.hasQuery = '1';
      renderSearchResults(results, searchSite(q));
      filterHomeCards(q);
      document.getElementById('calculadoras')?.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

function initMobileNav() {
  const btn = document.querySelector('[data-mobile-toggle]');
  const nav = document.querySelector('[data-mobile-nav]');
  const backdrop = document.querySelector('[data-mobile-backdrop]');
  if (!btn || !nav) return;

  const mobileSearch = document.querySelector('[data-mobile-search]');
  const mobileResults = document.querySelector('[data-mobile-search-results]');

  const setOpen = (open) => {
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    btn.classList.toggle('is-open', open);
    if (open) {
      nav.hidden = false;
      if (backdrop) backdrop.hidden = false;
      document.body.classList.add('mobile-nav-open');
      requestAnimationFrame(() => {
        nav.classList.add('open');
        backdrop?.classList.add('open');
        mobileSearch?.focus({ preventScroll: true });
      });
    } else {
      nav.classList.remove('open');
      backdrop?.classList.remove('open');
      document.body.classList.remove('mobile-nav-open');
      window.setTimeout(() => {
        if (nav.classList.contains('open')) return;
        nav.hidden = true;
        if (backdrop) backdrop.hidden = true;
      }, 280);
      if (mobileResults) {
        mobileResults.classList.add('hidden');
        mobileResults.innerHTML = '';
      }
      if (mobileSearch) mobileSearch.value = '';
    }
  };

  btn.addEventListener('click', () => {
    setOpen(btn.getAttribute('aria-expanded') !== 'true');
  });

  backdrop?.addEventListener('click', () => setOpen(false));

  nav.querySelectorAll('[data-mobile-link]').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      btn.focus();
    }
  });

  if (mobileSearch) {
    mobileSearch.addEventListener('input', () => {
      const q = mobileSearch.value.trim();
      if (mobileResults) mobileResults.dataset.hasQuery = q ? '1' : '0';
      renderSearchResults(mobileResults, searchSite(q, 6), {
        emptyMessage: 'Nada encontrado para essa busca.',
      });
    });
    mobileSearch.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;
      e.preventDefault();
      const items = searchSite(mobileSearch.value, 1);
      if (items[0]) {
        setOpen(false);
        window.location.href = items[0].href;
      }
    });
  }
}

function filterHomeCards(query) {
  const grid = document.querySelector('[data-calc-grid]');
  if (!grid) return;
  const q = normalize(query.trim());
  const cards = [...grid.querySelectorAll('a.calc-card')];
  cards.forEach((card) => {
    const text = normalize(card.textContent);
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
void CALCULATORS;
void HOME_CALCULATORS;
void goToBestResult;
