import { formatBRL, parseBRLInput } from './money.js';

/** Tabelas vigentes 2026 (Portaria MPS/MF nº 13/2026; RFB IR 2026; MTE Seguro-Desemprego). */
export const LEGISLATION = {
  year: 2026,
  updatedAt: '2026-01-11',
  sources: {
    inss: 'Portaria Interministerial MPS/MF nº 13/2026',
    irrf: 'Receita Federal — Tabelas IR 2026 / Lei nº 15.270/2025',
    seguro: 'MTE / CODEFAT — tabela Seguro-Desemprego 2026',
  },
};

const INSS_CEILING_CENTS = 847_555; // R$ 8.475,55
const DEPENDENT_IRRF_DEDUCTION_CENTS = 18_959; // R$ 189,59
const IRRF_SIMPLIFIED_DEDUCTION_CENTS = 60_720; // R$ 607,20
const IRRF_REDUCTION_FLAT_CEILING_CENTS = 500_000; // R$ 5.000,00
const IRRF_REDUCTION_PHASEOUT_CENTS = 735_000; // R$ 7.350,00
const IRRF_REDUCTION_BASE_CENTS = 97_862; // R$ 978,62
const IRRF_REDUCTION_RATE = 0.133145;
const MINIMUM_WAGE_CENTS = 162_100; // R$ 1.621,00
const FGTS_RATE = 0.08;
const RESCISION_FINE_RATE = 0.4;
const RESCISION_FINE_AGREEMENT_RATE = 0.2;
const VACATION_ONE_THIRD_RATE = 1 / 3;
const NIGHT_ADDITIONAL_RATE = 0.2;
const OVERTIME_WEEKDAY_MULT = 1.5;
const OVERTIME_SUNDAY_HOLIDAY_MULT = 2.0;
const WORKING_HOURS_PER_MONTH = 220;
const NOTICE_BASE_DAYS = 30;
const NOTICE_EXTRA_DAYS_PER_YEAR = 3;
const NOTICE_MAX_DAYS = 90;

const INSS_BRACKETS = [
  { upperLimitCents: 162_100, rate: 0.075 },
  { upperLimitCents: 290_284, rate: 0.09 },
  { upperLimitCents: 435_427, rate: 0.12 },
  { upperLimitCents: 847_555, rate: 0.14 },
];

const IRRF_BRACKETS = [
  { upperLimitCents: 242_880, rate: 0, deductionCents: 0 },
  { upperLimitCents: 282_665, rate: 0.075, deductionCents: 18_216 },
  { upperLimitCents: 375_105, rate: 0.15, deductionCents: 39_416 },
  { upperLimitCents: 466_468, rate: 0.225, deductionCents: 67_549 },
  { upperLimitCents: Number.MAX_SAFE_INTEGER, rate: 0.275, deductionCents: 90_873 },
];

/** Seguro-desemprego 2026 (média dos 3 últimos salários). */
const SEGURO_TIER1_MAX_CENTS = 222_217; // até R$ 2.222,17 → 80%
const SEGURO_TIER2_MAX_CENTS = 370_399; // até R$ 3.703,99
const SEGURO_TIER2_BASE_CENTS = 177_774; // R$ 1.777,74
const SEGURO_CEILING_CENTS = 251_865; // R$ 2.518,65

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

function hourlyRate(gross) {
  return Math.round(gross / WORKING_HOURS_PER_MONTH);
}

function monthsBetween(start, end) {
  return Math.max(0, (end.year - start.year) * 12 + (end.month - start.month));
}

function employmentMonths(admission, dismissal) {
  let m = monthsBetween(admission, dismissal);
  m = dismissal.day >= admission.day ? m + 1 : m;
  return Math.max(1, m);
}

function employmentYearsComplete(admission, dismissal) {
  let years = dismissal.year - admission.year;
  if (
    dismissal.month < admission.month ||
    (dismissal.month === admission.month && dismissal.day < admission.day)
  ) {
    years -= 1;
  }
  return Math.max(0, years);
}

function proportionalAmount(amount, months) {
  return Math.round((amount * clamp(months, 0, 12)) / 12);
}

function noticeDaysForTenure(yearsComplete) {
  return Math.min(
    NOTICE_MAX_DAYS,
    NOTICE_BASE_DAYS + yearsComplete * NOTICE_EXTRA_DAYS_PER_YEAR,
  );
}

function taxFromIrrfTable(base) {
  if (base <= IRRF_BRACKETS[0].upperLimitCents) {
    return { tax: 0, appliedBracket: 'Isento', isExempt: true };
  }
  const bracket = IRRF_BRACKETS.find((b) => base <= b.upperLimitCents);
  const tax = Math.max(0, Math.round(base * bracket.rate) - bracket.deductionCents);
  return {
    tax,
    appliedBracket: `${(bracket.rate * 100).toFixed(1).replace('.0', '')}%`,
    isExempt: false,
  };
}

function applyIrrfReduction(tax, taxableIncomeCents) {
  if (taxableIncomeCents <= IRRF_REDUCTION_FLAT_CEILING_CENTS) {
    return { tax: 0, reductionCents: tax, usedReduction: true };
  }
  if (taxableIncomeCents <= IRRF_REDUCTION_PHASEOUT_CENTS) {
    const reduction = Math.max(
      0,
      Math.round(IRRF_REDUCTION_BASE_CENTS - IRRF_REDUCTION_RATE * taxableIncomeCents),
    );
    const reduced = Math.max(0, tax - reduction);
    return { tax: reduced, reductionCents: tax - reduced, usedReduction: true };
  }
  return { tax, reductionCents: 0, usedReduction: false };
}

export function calculateInss(grossSalary) {
  const capped = Math.min(grossSalary, INSS_CEILING_CENTS);
  let previousLimit = 0;
  let contribution = 0;
  const breakdown = [];

  for (const bracket of INSS_BRACKETS) {
    const currentLimit = Math.min(bracket.upperLimitCents, capped);
    const taxable = Math.max(0, currentLimit - previousLimit);
    if (taxable > 0) {
      const part = Math.round(taxable * bracket.rate);
      contribution += part;
      breakdown.push({
        bracketLabel: `${(bracket.rate * 100).toFixed(1).replace('.0', '')}%`,
        taxableAmount: taxable,
        contribution: part,
      });
    }
    previousLimit = currentLimit;
    if (previousLimit >= capped) break;
  }

  return {
    contribution,
    effectiveRate: capped === 0 ? 0 : contribution / capped,
    breakdown,
  };
}

/**
 * IRRF mensal 2026: tabela + desconto simplificado (melhor cenário) + redução Lei 15.270/2025.
 * `taxableIncomeCents` para o redutor = rendimento sujeito à incidência mensal (salário bruto da verba).
 */
export function calculateIrrf(grossSalary, inss, dependents = 0, otherDeductions = 0) {
  const legalDeductions =
    inss + dependents * DEPENDENT_IRRF_DEDUCTION_CENTS + otherDeductions;
  const useSimplified = IRRF_SIMPLIFIED_DEDUCTION_CENTS > legalDeductions;
  const deductionUsed = useSimplified ? IRRF_SIMPLIFIED_DEDUCTION_CENTS : legalDeductions;
  const base = Math.max(0, grossSalary - deductionUsed);
  const table = taxFromIrrfTable(base);
  const reduced = applyIrrfReduction(table.tax, grossSalary);

  return {
    taxableBase: base,
    tax: reduced.tax,
    taxBeforeReduction: table.tax,
    reductionCents: reduced.reductionCents,
    usedSimplifiedDeduction: useSimplified,
    deductionUsed,
    effectiveRate: grossSalary === 0 ? 0 : reduced.tax / grossSalary,
    isExempt: reduced.tax === 0,
    appliedBracket: reduced.tax === 0 && table.tax === 0 ? 'Isento' : table.appliedBracket,
  };
}

export function calculateFgts(input) {
  const months = Math.max(0, input.months ?? 1);
  const monthlyDeposit = Math.round(input.grossSalary * FGTS_RATE);
  const totalDeposited = monthlyDeposit * months;
  const rate = input.rescisionFineRate ?? RESCISION_FINE_RATE;
  const rescisionFine = input.includeRescisionFine ? Math.round(totalDeposited * rate) : 0;
  return {
    monthlyDeposit,
    totalDeposited,
    rescisionFine,
    totalWithFine: totalDeposited + rescisionFine,
  };
}

export function calculateSalarioLiquido(input) {
  const overtime = input.overtimeAmount ?? 0;
  const otherDed = input.otherDeductions ?? 0;
  const otherAdd = input.otherAdditions ?? 0;
  const dependents = input.dependents ?? 0;
  const grossTotal = input.grossSalary + overtime + otherAdd;
  const inss = calculateInss(grossTotal).contribution;
  const irrf = calculateIrrf(grossTotal, inss, dependents, otherDed).tax;
  const fgtsInformativo = Math.round(grossTotal * FGTS_RATE);
  const netSalary = grossTotal - inss - irrf - otherDed;
  const breakdown = [{ label: 'Salário Bruto', amountCents: input.grossSalary }];
  if (overtime) breakdown.push({ label: 'Horas Extras', amountCents: overtime });
  if (otherAdd) breakdown.push({ label: 'Outros Acréscimos', amountCents: otherAdd });
  breakdown.push({ label: 'INSS', amountCents: inss, isDiscount: true });
  breakdown.push({ label: 'IRRF', amountCents: irrf, isDiscount: true });
  if (otherDed) breakdown.push({ label: 'Outros Descontos', amountCents: otherDed, isDiscount: true });
  breakdown.push({ label: 'FGTS (informativo)', amountCents: fgtsInformativo, isInfo: true });
  return { netSalary, grossTotal, inss, irrf, fgtsInformativo, breakdown };
}

export function calculateFerias(input) {
  const vacationDays = clamp(input.vacationDays ?? 30, 1, 30);
  const base = input.grossSalary + (input.averageOvertime ?? 0);
  const daily = base / 30;
  const vacationPay = Math.round(daily * vacationDays);
  const constitutionalThird = Math.round(vacationPay * VACATION_ONE_THIRD_RATE);
  const soldDays = input.sellOneThird ? 10 : 0;
  const soldDaysPay = Math.round(daily * soldDays);
  const totalGross = vacationPay + constitutionalThird + soldDaysPay;
  const inss = calculateInss(totalGross).contribution;
  const irrf = calculateIrrf(totalGross, inss, 0).tax;
  return {
    vacationPay,
    constitutionalThird,
    soldDaysPay,
    totalGross,
    inss,
    irrf,
    netTotal: totalGross - inss - irrf,
  };
}

export function calculateDecimoTerceiro(input) {
  const proportional = proportionalAmount(input.grossSalary, input.monthsWorked);
  const firstParcel = Math.floor(proportional / 2);
  const secondParcel = proportional - firstParcel;
  const inss = calculateInss(secondParcel).contribution;
  const irrf = calculateIrrf(secondParcel, inss, input.dependents ?? 0).tax;
  const netSecondParcel = secondParcel - inss - irrf;
  const paid = input.firstParcelAlreadyPaid ?? 0;
  return {
    proportionalAmount: proportional,
    firstParcel,
    secondParcel,
    inss,
    irrf,
    netSecondParcel,
    netTotal: firstParcel + netSecondParcel - paid,
  };
}

export function calculateRescisao(input) {
  if (!input.dismissalType) {
    throw new Error('Selecione o tipo de demissão.');
  }

  const daysWorked = clamp(input.dismissalDate.day, 1, 30);
  const salaryBalance = Math.round((input.grossSalary * daysWorked) / 30);
  const daily = input.grossSalary / 30;
  const vacationDaysBalance = clamp(input.vacationDaysBalance ?? 0, 0, 60);
  const vacationPay = Math.round(daily * vacationDaysBalance);
  const vacationThird = Math.round(vacationPay * VACATION_ONE_THIRD_RATE);

  let monthsInYear = monthsBetween(
    { day: 1, month: 1, year: input.dismissalDate.year },
    input.dismissalDate,
  );
  monthsInYear = clamp(monthsInYear, 0, 12) + 1;
  const thirteenthProportional = proportionalAmount(input.grossSalary, monthsInYear);

  const yearsComplete = employmentYearsComplete(input.admissionDate, input.dismissalDate);
  const noticeDays = noticeDaysForTenure(yearsComplete);
  const fullNoticePay = Math.round((input.grossSalary * noticeDays) / 30);

  let noticePay = 0;
  if (input.dismissalType === 'WITHOUT_JUST_CAUSE') {
    noticePay = input.hasWorkedNoticePeriod ? 0 : fullNoticePay;
  } else if (input.dismissalType === 'AGREEMENT') {
    noticePay = input.hasWorkedNoticePeriod ? 0 : Math.floor(fullNoticePay / 2);
  }

  const monthsEmployed = employmentMonths(input.admissionDate, input.dismissalDate);
  const fgtsMonthly = Math.round(input.grossSalary * FGTS_RATE);
  const estimatedFgts = fgtsMonthly * monthsEmployed;
  const providedFgts = input.fgtsBalanceCents;
  const fgtsBalance =
    providedFgts != null && providedFgts > 0 ? providedFgts : estimatedFgts;
  const fgtsIsEstimated = !(providedFgts != null && providedFgts > 0);

  const fineRate =
    input.dismissalType === 'WITHOUT_JUST_CAUSE'
      ? RESCISION_FINE_RATE
      : input.dismissalType === 'AGREEMENT'
        ? RESCISION_FINE_AGREEMENT_RATE
        : 0;
  const fgtsFine = Math.round(fgtsBalance * fineRate);
  const fgtsWithdrawalEligible =
    input.dismissalType === 'WITHOUT_JUST_CAUSE' || input.dismissalType === 'AGREEMENT';

  const verbasGross =
    salaryBalance + vacationPay + vacationThird + thirteenthProportional + noticePay;
  const inss = calculateInss(verbasGross).contribution;
  const irrf = calculateIrrf(verbasGross, inss, input.dependents ?? 0).tax;
  const netTotal = verbasGross - inss - irrf;
  const withdrawal = input.includeFgtsWithdrawal && fgtsWithdrawalEligible ? fgtsBalance : 0;

  const breakdown = [
    { label: 'Saldo de salário', amountCents: salaryBalance },
    { label: 'Férias', amountCents: vacationPay },
    { label: '1/3 de férias', amountCents: vacationThird },
    { label: '13º proporcional', amountCents: thirteenthProportional },
  ];
  if (noticePay) {
    breakdown.push({
      label: `Aviso prévio (${noticeDays} dias)`,
      amountCents: noticePay,
    });
  }
  breakdown.push({ label: 'INSS (estimativa sobre verbas)', amountCents: inss, isDiscount: true });
  breakdown.push({ label: 'IRRF (estimativa sobre verbas)', amountCents: irrf, isDiscount: true });
  if (fgtsFine) {
    breakdown.push({
      label: fgtsIsEstimated ? 'Multa FGTS (sobre saldo estimado)' : 'Multa FGTS',
      amountCents: fgtsFine,
      isInfo: true,
    });
  }
  if (withdrawal) {
    breakdown.push({
      label: fgtsIsEstimated ? 'Saque FGTS (estimado)' : 'Saque FGTS',
      amountCents: withdrawal,
      isInfo: true,
    });
  }

  return {
    salaryBalance,
    vacationPay,
    vacationThird,
    thirteenthProportional,
    noticePay,
    noticeDays,
    yearsComplete,
    fgtsBalance,
    fgtsIsEstimated,
    fgtsFine,
    inss,
    irrf,
    verbasGross,
    totalDeductions: inss + irrf,
    netTotal,
    totalReceivable: netTotal + fgtsFine + withdrawal,
    includeFgtsWithdrawal: !!input.includeFgtsWithdrawal,
    fgtsWithdrawalEligible,
    breakdown,
  };
}

export function calculateHoraExtra(input) {
  const hourly = hourlyRate(input.grossSalary);
  const mult =
    (input.overtimeType ?? 'WEEKDAY') === 'SUNDAY_HOLIDAY'
      ? OVERTIME_SUNDAY_HOLIDAY_MULT
      : OVERTIME_WEEKDAY_MULT;
  const overtimeRateCents = Math.round(hourly * mult);
  const totalOvertimePay = Math.round(overtimeRateCents * input.overtimeHours);
  const nightHours = input.additionalNightHours ?? 0;
  const nightAdditional = Math.round(hourly * NIGHT_ADDITIONAL_RATE * nightHours);
  return {
    hourlyRate: hourly,
    overtimeRate: overtimeRateCents,
    totalOvertimePay,
    nightAdditional,
    totalGross: totalOvertimePay + nightAdditional,
  };
}

export function calculateAdicionalNoturno(input) {
  const hourly = hourlyRate(input.grossSalary);
  const nightHourlyRate = Math.round(hourly * (1 + NIGHT_ADDITIONAL_RATE));
  const nightAdditional = Math.round(hourly * NIGHT_ADDITIONAL_RATE * input.nightHours);
  return {
    hourlyRate: hourly,
    nightHourlyRate,
    nightAdditional,
    totalPay: Math.round(nightHourlyRate * input.nightHours),
  };
}

function seguroParcelCount(months, previousRequests) {
  const requestNumber = previousRequests + 1;
  if (requestNumber === 1) {
    if (months < 12) return { eligible: false, parcelCount: 0 };
    if (months < 24) return { eligible: true, parcelCount: 4 };
    return { eligible: true, parcelCount: 5 };
  }
  if (requestNumber === 2) {
    if (months < 9) return { eligible: false, parcelCount: 0 };
    if (months < 12) return { eligible: true, parcelCount: 3 };
    if (months < 24) return { eligible: true, parcelCount: 4 };
    return { eligible: true, parcelCount: 5 };
  }
  // 3ª solicitação em diante
  if (months < 6) return { eligible: false, parcelCount: 0 };
  if (months < 12) return { eligible: true, parcelCount: 3 };
  if (months < 24) return { eligible: true, parcelCount: 4 };
  return { eligible: true, parcelCount: 5 };
}

function seguroParcelValue(averageSalary) {
  let parcel;
  if (averageSalary <= SEGURO_TIER1_MAX_CENTS) {
    parcel = Math.round(averageSalary * 0.8);
  } else if (averageSalary <= SEGURO_TIER2_MAX_CENTS) {
    parcel =
      SEGURO_TIER2_BASE_CENTS + Math.round((averageSalary - SEGURO_TIER1_MAX_CENTS) * 0.5);
  } else {
    parcel = SEGURO_CEILING_CENTS;
  }
  return clamp(parcel, MINIMUM_WAGE_CENTS, SEGURO_CEILING_CENTS);
}

export function calculateSeguroDesemprego(input) {
  const previous = clamp(input.previousRequests ?? 0, 0, 10);
  const months = clamp(input.monthsWorkedLast36, 0, 36);
  const { eligible, parcelCount } = seguroParcelCount(months, previous);

  if (!eligible) {
    const need =
      previous === 0 ? 12 : previous === 1 ? 9 : 6;
    return {
      parcelValue: 0,
      parcelCount: 0,
      totalAmount: 0,
      eligible: false,
      message: `Não elegível nesta solicitação. Na ${previous + 1}ª vez são necessários pelo menos ${need} meses trabalhados nos últimos 36 meses (máx. 3 solicitações típicas no histórico recente).`,
    };
  }

  const parcelValue = seguroParcelValue(input.averageSalary);
  return {
    parcelValue,
    parcelCount,
    totalAmount: parcelValue * parcelCount,
    eligible: true,
    message: '',
  };
}

export { formatBRL, parseBRLInput };
