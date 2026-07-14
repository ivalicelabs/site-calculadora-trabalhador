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
import { getCalculator } from './site.js';

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
      const r = calculateRescisao({
        grossSalary: money(form, 'gross'),
        dependents: num(form, 'dependents'),
        admissionDate: parseDate(form.elements.admission.value),
        dismissalDate: parseDate(form.elements.dismissal.value),
        dismissalType: form.elements.dismissalType.value,
        vacationDaysBalance: num(form, 'vacationDays'),
        hasWorkedNoticePeriod: checked(form, 'workedNotice'),
        includeFgtsWithdrawal: checked(form, 'includeFgts'),
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

const form = document.getElementById('calc-form');
if (form) {
  const id = form.getAttribute('data-calc-id');
  const results = document.getElementById('results');
  const valueEl = document.querySelector('[data-result-value]');
  const breakdownEl = document.querySelector('[data-breakdown]');
  initSteppers(form);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    try {
      const { primary, valueKey, rows } = runCalculator(id, form);
      if (!primary.eligible && id === 'seguro_desemprego') {
        valueEl.textContent = 'Não elegível';
      } else {
        valueEl.textContent = formatBRL(primary[valueKey] ?? 0);
      }
      renderRows(breakdownEl, rows(primary));
      results.hidden = false;
      results.scrollIntoView({ behavior: 'smooth', block: 'start' });
      sessionStorage.setItem(`clt-save-${id}`, JSON.stringify({ at: Date.now(), primary, id }));
    } catch (err) {
      alert(err.message || 'Não foi possível calcular. Verifique os dados.');
    }
  });

  document.querySelector('[data-share]')?.addEventListener('click', async () => {
    const slug = location.pathname.split('/').filter(Boolean).pop();
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

  document.querySelector('[data-save]')?.addEventListener('click', () => {
    const raw = sessionStorage.getItem(`clt-save-${id}`);
    if (!raw) {
      alert('Calcule antes de salvar.');
      return;
    }
    const key = 'clt-saved-calcs';
    const list = JSON.parse(localStorage.getItem(key) || '[]');
    list.unshift(JSON.parse(raw));
    localStorage.setItem(key, JSON.stringify(list.slice(0, 50)));
    alert('Cálculo salvo neste navegador.');
  });
}
