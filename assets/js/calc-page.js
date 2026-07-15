import {
  calculateAdicionalNoturno,
  calculateDecimoTerceiro,
  calculateFerias,
  calculateFgts,
  calculateHoraExtra,
  calculateInss,
  calculateIrrf,
  calculateRescisao,
  calculateSalarioLiquido,
  calculateSeguroDesemprego,
  formatBRL,
  parseBRLInput,
} from './calculators.js';
import { bindCurrencyMasks } from './money.js';
import { getCalculator } from './site.js';

const STORAGE_KEY = 'clt-saved-calcs';

function money(form, name) {
  return parseBRLInput(form.elements[name]?.value ?? '0');
}

function num(form, name) {
  return Number(form.elements[name]?.value || 0);
}

function checked(form, name) {
  return !!form.elements[name]?.checked;
}

function parseDate(value) {
  const [y, m, d] = String(value).split('-').map(Number);
  return { year: y, month: m, day: d };
}

function collectFormValues(form) {
  const values = {};
  Array.from(form.elements).forEach((el) => {
    if (!el.name || el.disabled) return;
    if (el.type === 'checkbox') values[el.name] = !!el.checked;
    else if (el.type === 'radio') {
      if (el.checked) values[el.name] = el.value;
    } else values[el.name] = el.value;
  });
  return values;
}

function applyFormValues(form, values) {
  if (!values) return;
  Object.entries(values).forEach(([name, value]) => {
    const el = form.elements[name];
    if (!el) return;
    if (el.type === 'checkbox') el.checked = !!value;
    else if (el.type === 'radio') {
      const radios = form.elements[name];
      const list = radios.length ? Array.from(radios) : [radios];
      list.forEach((r) => {
        r.checked = r.value === value;
      });
    } else el.value = value ?? '';
  });
}

function runCalculator(id, form) {
  switch (id) {
    case 'salario_liquido':
      return {
        primary: calculateSalarioLiquido({
          grossSalary: money(form, 'gross'),
          overtimeAmount: money(form, 'overtime'),
          dependents: num(form, 'dependents'),
          otherDeductions: money(form, 'otherDeductions'),
        }),
        valueKey: 'netSalary',
        rows: (r) => r.breakdown,
      };
    case 'fgts': {
      const r = calculateFgts({
        grossSalary: money(form, 'gross'),
        months: num(form, 'months'),
        includeRescisionFine: checked(form, 'includeFine'),
      });
      return {
        primary: r,
        valueKey: 'monthlyDeposit',
        rows: () => [
          { label: 'Depósito mensal', amountCents: r.monthlyDeposit },
          { label: 'Total depositado', amountCents: r.totalDeposited },
          ...(r.rescisionFine
            ? [{ label: 'Multa rescisória', amountCents: r.rescisionFine }]
            : []),
          { label: 'Total com multa', amountCents: r.totalWithFine },
        ],
      };
    }
    case 'ferias': {
      const r = calculateFerias({
        grossSalary: money(form, 'gross'),
        averageOvertime: money(form, 'avgOvertime'),
        vacationDays: num(form, 'days'),
        sellOneThird: checked(form, 'sellOneThird'),
      });
      return {
        primary: r,
        valueKey: 'netTotal',
        rows: () => [
          { label: 'Férias', amountCents: r.vacationPay },
          { label: '1/3 constitucional', amountCents: r.constitutionalThird },
          ...(r.soldDaysPay ? [{ label: 'Abono pecuniário', amountCents: r.soldDaysPay }] : []),
          { label: 'INSS', amountCents: r.inss, isDiscount: true },
          { label: 'IRRF', amountCents: r.irrf, isDiscount: true },
        ],
      };
    }
    case 'decimo_terceiro': {
      const r = calculateDecimoTerceiro({
        grossSalary: money(form, 'gross'),
        monthsWorked: num(form, 'months'),
        dependents: num(form, 'dependents'),
        firstParcelAlreadyPaid: money(form, 'paid'),
      });
      return {
        primary: r,
        valueKey: 'netTotal',
        rows: () => [
          { label: 'Proporcional', amountCents: r.proportionalAmount },
          { label: '1ª parcela', amountCents: r.firstParcel },
          { label: '2ª parcela (bruta)', amountCents: r.secondParcel },
          { label: 'INSS (2ª)', amountCents: r.inss, isDiscount: true },
          { label: 'IRRF (2ª)', amountCents: r.irrf, isDiscount: true },
          { label: '2ª parcela líquida', amountCents: r.netSecondParcel },
        ],
      };
    }
    case 'rescisao': {
      const fgtsRaw = form.elements.fgtsBalance?.value?.trim();
      const r = calculateRescisao({
        grossSalary: money(form, 'gross'),
        dependents: num(form, 'dependents'),
        admissionDate: parseDate(form.elements.admission.value),
        dismissalDate: parseDate(form.elements.dismissal.value),
        dismissalType: form.elements.dismissalType.value,
        vacationDaysBalance: num(form, 'vacationDays'),
        hasWorkedNoticePeriod: checked(form, 'workedNotice'),
        includeFgtsWithdrawal: checked(form, 'includeFgts'),
        fgtsBalanceCents: fgtsRaw ? money(form, 'fgtsBalance') : null,
      });
      return {
        primary: r,
        valueKey: 'totalReceivable',
        rows: () => r.breakdown,
      };
    }
    case 'hora_extra': {
      const r = calculateHoraExtra({
        grossSalary: money(form, 'gross'),
        overtimeHours: num(form, 'hours'),
        overtimeType: form.elements.overtimeType.value,
        additionalNightHours: num(form, 'nightHours'),
      });
      return {
        primary: r,
        valueKey: 'totalGross',
        rows: () => [
          { label: 'Valor da hora', amountCents: r.hourlyRate },
          { label: 'Valor da hora extra', amountCents: r.overtimeRate },
          { label: 'Total horas extras', amountCents: r.totalOvertimePay },
          ...(r.nightAdditional
            ? [{ label: 'Adicional noturno', amountCents: r.nightAdditional }]
            : []),
        ],
      };
    }
    case 'adicional_noturno': {
      const r = calculateAdicionalNoturno({
        grossSalary: money(form, 'gross'),
        nightHours: num(form, 'nightHours'),
      });
      return {
        primary: r,
        valueKey: 'totalPay',
        rows: () => [
          { label: 'Hora diurna', amountCents: r.hourlyRate },
          { label: 'Hora noturna', amountCents: r.nightHourlyRate },
          { label: 'Adicional (20%)', amountCents: r.nightAdditional },
        ],
      };
    }
    case 'seguro_desemprego': {
      const r = calculateSeguroDesemprego({
        averageSalary: money(form, 'avgSalary'),
        monthsWorkedLast36: num(form, 'months'),
        previousRequests: num(form, 'previous'),
      });
      return {
        primary: r,
        valueKey: 'parcelValue',
        rows: () =>
          r.eligible
            ? [
                { label: 'Valor da parcela', amountCents: r.parcelValue },
                { label: 'Quantidade de parcelas', amountCents: r.parcelCount, raw: true },
                { label: 'Total estimado', amountCents: r.totalAmount },
              ]
            : [{ label: r.message, amountCents: 0, message: true }],
      };
    }
    case 'inss': {
      const r = calculateInss(money(form, 'gross'));
      return {
        primary: r,
        valueKey: 'contribution',
        rows: () =>
          r.breakdown.map((b) => ({
            label: `Faixa ${b.bracketLabel}`,
            amountCents: b.contribution,
            isDiscount: true,
          })),
      };
    }
    case 'irrf': {
      const gross = money(form, 'gross');
      let inss = money(form, 'inss');
      if (!inss) inss = calculateInss(gross).contribution;
      const r = calculateIrrf(gross, inss, num(form, 'dependents'), money(form, 'otherDed'));
      return {
        primary: r,
        valueKey: 'tax',
        rows: () => [
          { label: 'Base de cálculo', amountCents: r.taxableBase },
          { label: 'Alíquota / faixa', amountCents: 0, text: r.appliedBracket },
          { label: 'IRRF', amountCents: r.tax, isDiscount: true },
        ],
      };
    }
    default:
      throw new Error(`Calculadora desconhecida: ${id}`);
  }
}

function renderRows(container, rows) {
  container.innerHTML = rows
    .map((row) => {
      if (row.message) {
        return `<p class="py-3 text-sm text-danger">${row.label}</p>`;
      }
      if (row.text) {
        return `<div class="flex items-start justify-between gap-4 py-3 text-base"><span class="text-ink-soft">${row.label}</span><span class="font-semibold text-ink">${row.text}</span></div>`;
      }
      if (row.raw) {
        return `<div class="flex items-start justify-between gap-4 py-3 text-base"><span class="text-ink-soft">${row.label}</span><span class="font-semibold text-ink">${row.amountCents}</span></div>`;
      }
      if (row.isInfo) {
        return `<div class="flex items-start justify-between gap-4 py-3 text-base"><span class="text-ink-soft">${row.label} <span class="text-xs text-ink-faint">(informativo)</span></span><span class="font-semibold text-ink-muted">${formatBRL(row.amountCents)}</span></div>`;
      }
      const value = row.isDiscount ? `-${formatBRL(row.amountCents)}` : formatBRL(row.amountCents);
      const cls = row.isDiscount ? 'text-danger' : 'text-ink';
      return `<div class="flex items-start justify-between gap-4 py-3 text-base"><span class="text-ink-soft">${row.label}</span><span class="font-semibold ${cls}">${value}</span></div>`;
    })
    .join('');
}

function initSteppers(form) {
  form.querySelectorAll('[data-step]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const input = form.querySelector('input[name="dependents"]');
      if (!input) return;
      const step = Number(btn.getAttribute('data-step'));
      const next = Math.max(0, Math.min(20, Number(input.value || 0) + step));
      input.value = String(next);
    });
  });
}

function newSaveId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `s-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

const form = document.getElementById('calc-form');
if (form) {
  const id = form.getAttribute('data-calc-id');
  const results = document.getElementById('results');
  const valueEl = document.querySelector('[data-result-value]');
  const breakdownEl = document.querySelector('[data-breakdown]');
  const slug = location.pathname.split('/').filter(Boolean).pop();
  initSteppers(form);
  bindCurrencyMasks(form);
  if (window.CltCurrencyMask) window.CltCurrencyMask.bindAll(form);

  let lastSnapshot = null;

  function showResult(primary, valueKey, rows) {
    if (!primary.eligible && id === 'seguro_desemprego') {
      valueEl.textContent = 'Não elegível';
    } else {
      valueEl.textContent = formatBRL(primary[valueKey] ?? 0);
    }
    renderRows(breakdownEl, rows);
    results.hidden = false;
  }

  function runCalc(e) {
    e?.preventDefault();
    form.querySelectorAll('input[data-currency]').forEach((input) => {
      if (window.CltCurrencyMask) window.CltCurrencyMask.applyMask(input);
      else if (input.value) {
        const digits = input.value.replace(/\D/g, '');
        input.value = digits
          ? (Number(digits) / 100).toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          : '';
      }
    });
    try {
      const { primary, valueKey, rows } = runCalculator(id, form);
      const rowData = rows(primary);
      showResult(primary, valueKey, rowData);
      results.scrollIntoView({ behavior: 'smooth', block: 'start' });
      lastSnapshot = {
        at: Date.now(),
        calcId: id,
        slug,
        primary,
        valueKey,
        rows: rowData,
        formValues: collectFormValues(form),
        resultText: valueEl.textContent || '',
        title: getCalculator(slug)?.title || id,
      };
      sessionStorage.setItem(`clt-save-${id}`, JSON.stringify(lastSnapshot));
    } catch (err) {
      alert(err.message || 'Não foi possível calcular. Verifique os dados.');
    }
  }

  form.addEventListener('submit', runCalc);
  document.querySelector('[data-calc-submit]')?.addEventListener('click', runCalc);
  form.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    if (e.target instanceof HTMLTextAreaElement) return;
    if (e.target instanceof HTMLButtonElement) return;
    e.preventDefault();
    runCalc(e);
  });

  document.querySelector('[data-share]')?.addEventListener('click', async (e) => {
    e.preventDefault();
    const title = getCalculator(slug)?.title || 'Cálculo';
    const text = `${title}: ${valueEl?.textContent || ''} — ${location.href}`;
    try {
      if (navigator.share) await navigator.share({ title, text, url: location.href });
      else {
        await navigator.clipboard.writeText(text);
        alert('Link copiado!');
      }
    } catch {
      /* cancelled */
    }
  });

  const saveBtn = document.querySelector('[data-save]');
  saveBtn?.addEventListener('click', (e) => {
    if (saveBtn.getAttribute('href') === '/salvos/') return;
    e.preventDefault();
    const raw = sessionStorage.getItem(`clt-save-${id}`);
    const snapshot = lastSnapshot || (raw ? JSON.parse(raw) : null);
    if (!snapshot) {
      alert('Calcule antes de salvar.');
      return;
    }
    const entry = {
      ...snapshot,
      id: newSaveId(),
      at: Date.now(),
      title: snapshot.title || getCalculator(slug)?.title || id,
      resultText: valueEl?.textContent || snapshot.resultText || '',
      slug,
      calcId: id,
      formValues: snapshot.formValues || collectFormValues(form),
    };
    const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    list.unshift(entry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, 50)));
    const prev = saveBtn.innerHTML;
    saveBtn.innerHTML = 'Salvo — ver lista';
    saveBtn.setAttribute('href', '/salvos/');
    setTimeout(() => {
      if (saveBtn.getAttribute('href') === '/salvos/') {
        saveBtn.innerHTML = prev;
        saveBtn.setAttribute('href', '#');
      }
    }, 4000);
  });

  function restoreFromSaved() {
    const savedId = new URLSearchParams(location.search).get('saved');
    if (!savedId) return;
    const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const entry = list.find((x) => String(x.id) === String(savedId));
    if (!entry) return;

    applyFormValues(form, entry.formValues);
    if (window.CltCurrencyMask) window.CltCurrencyMask.bindAll(form);

    if (entry.rows && entry.resultText != null) {
      valueEl.textContent = entry.resultText;
      renderRows(breakdownEl, entry.rows);
      results.hidden = false;
      lastSnapshot = { ...entry, calcId: id, slug };
      sessionStorage.setItem(`clt-save-${id}`, JSON.stringify(lastSnapshot));
      results.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    if (entry.formValues) {
      try {
        runCalc();
      } catch {
        /* ignore */
      }
    }
  }

  restoreFromSaved();
}
