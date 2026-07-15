import { CALCULATORS } from './site.js';

const STORAGE_KEY = 'clt-saved-calcs';

function loadList() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveList(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, 50)));
}

function formatWhen(ts) {
  try {
    return new Date(ts).toLocaleString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function slugForItem(item) {
  if (item.slug) return item.slug;
  const calcId = item.calcId || item.id;
  return CALCULATORS.find((c) => c.id === calcId)?.slug || '';
}

function render() {
  const listEl = document.querySelector('[data-saved-list]');
  const emptyEl = document.querySelector('[data-saved-empty]');
  if (!listEl) return;

  const list = loadList();
  if (!list.length) {
    listEl.innerHTML = '';
    emptyEl?.classList.remove('hidden');
    return;
  }

  emptyEl?.classList.add('hidden');
  listEl.innerHTML = list
    .map((item) => {
      const slug = slugForItem(item);
      const title = item.title || CALCULATORS.find((c) => c.slug === slug)?.title || 'Cálculo';
      const href = slug ? `/calculadoras/${slug}/?saved=${encodeURIComponent(item.id)}` : '/#calculadoras';
      const result = item.resultText || '—';
      const when = formatWhen(item.at);
      return `<article class="rounded-3xl border border-line bg-white p-5 shadow-card sm:p-6">
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div class="min-w-0 flex-1">
            <p class="text-xs font-semibold uppercase tracking-wide text-ink-faint">${when}</p>
            <h2 class="mt-1 font-display text-lg font-bold text-ink">${escapeHtml(title)}</h2>
            <p class="mt-2 font-display text-2xl font-bold text-brand-deep">${escapeHtml(result)}</p>
          </div>
          <div class="flex shrink-0 flex-col gap-2 sm:flex-row">
            <a href="${href}" class="btn-primary h-12 px-5 text-sm" style="width:auto">Abrir</a>
            <a href="#" role="button" data-delete-saved="${escapeHtml(String(item.id))}" class="btn-secondary h-12 px-5 text-sm" style="width:auto">Excluir</a>
          </div>
        </div>
      </article>`;
    })
    .join('');

  listEl.querySelectorAll('[data-delete-saved]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-delete-saved');
      saveList(loadList().filter((x) => String(x.id) !== String(id)));
      render();
    });
  });
}

document.querySelector('[data-clear-saved]')?.addEventListener('click', (e) => {
  e.preventDefault();
  if (!confirm('Apagar todos os cálculos salvos neste aparelho?')) return;
  localStorage.removeItem(STORAGE_KEY);
  render();
});

render();
