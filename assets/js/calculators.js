import { formatBRL, parseBRLInput } from './money.js';

const INSS_CEILING_CENTS = 778_602;
const DEPENDENT_IRRF_DEDUCTION_CENTS = 18_959;
const FGTS_RATE = 0.08;
const RESCISION_FINE_RATE = 0.4;
const RESCISION_FINE_AGREEMENT_RATE = 0.2;
const VACATION_ONE_THIRD_RATE = 1 / 3;
const NIGHT_ADDITIONAL_RATE = 0.2;
const OVERTIME_WEEKDAY_MULT = 1.5;
const OVERTIME_SUNDAY_HOLIDAY_MULT = 2.0;
const WORKING_HOURS_PER_MONTH = 220;

const INSS_BRACKETS = [
  { upperLimitCents: 141_200, rate: 0.075 },
  { upperLimitCents: 266_668, rate: 0.09 },
  { upperLimitCents: 400_003, rate: 0.12 },
  { upperLimitCents: 778_602, rate: 0.14 },
];

const IRRF_BRACKETS = [
  { upperLimitCents: 225_920, rate: 0, deductionCents: 0 },
  { upperLimitCents: 282_665, rate: 0.075, deductionCents: 16_944 },
  { upperLimitCents: 375_105, rate: 0.15, deductionCents: 38_144 },
  { upperLimitCents: 466_468, rate: 0.225, deductionCents: 66_277 },
  { upperLimitCents: Number.MAX_SAFE_INTEGER, rate: 0.275, deductionCents: 89_600 },
];

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

function proportionalAmount(amount, months) {
  return Math.round((amount * clamp(months, 0, 12)) / 12);
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

export function calculateIrrf(grossSalary, inss, dependents = 0, otherDeductions = 0) {
  const base = Math.max(
    0,
    grossSalary - inss - dependents * DEPENDENT_IRRF_DEDUCTION_CENTS - otherDeductions,
  );
  if (base <= 225_920) {
    return {
      taxableBase: base,
      tax: 0,
      effectiveRate: 0,
      isExempt: true,
      appliedBracket: 'Isento',
    };
  }
  const bracket = IRRF_BRACKETS.find((b) => base <= b.upperLimitCents);
  const tax = Math.max(0, Math.round(base * bracket.rate) - bracket.deductionCents);
  return {
    taxableBase: base,
    tax,
    effectiveRate: grossSalary === 0 ? 0 : tax / grossSalary,
    isExempt: false,
    appliedBracket: `${Math.floor(bracket.rate * 100)}%`,
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
  let noticePay = 0;
  if (input.dismissalType === 'WITHOUT_JUST_CAUSE') {
    noticePay = input.hasWorkedNoticePeriod ? 0 : input.grossSalary;
  } else if (input.dismissalType === 'AGREEMENT') {
    noticePay = Math.floor(input.grossSalary / 2);
  }
  const monthsEmployed = employmentMonths(input.admissionDate, input.dismissalDate);
  const fgtsMonthly = Math.round(input.grossSalary * FGTS_RATE);
  const fgtsBalance = fgtsMonthly * monthsEmployed;
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
  if (noticePay) breakdown.push({ label: 'Aviso prévio', amountCents: noticePay });
  breakdown.push({ label: 'INSS', amountCents: inss, isDiscount: true });
  breakdown.push({ label: 'IRRF', amountCents: irrf, isDiscount: true });
  if (fgtsFine) breakdown.push({ label: 'Multa FGTS', amountCents: fgtsFine, isInfo: true });
  if (withdrawal) breakdown.push({ label: 'Saque FGTS estimado', amountCents: withdrawal, isInfo: true });
  return {
    salaryBalance,
    vacationPay,
    vacationThird,
    thirteenthProportional,
    noticePay,
    fgtsBalance,
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
    totalPay: Math.trunc(nightHourlyRate * input.nightHours),
  };
}

export function calculateSeguroDesemprego(input) {
  const previous = input.previousRequests ?? 0;
  const months = clamp(input.monthsWorkedLast36, 0, 36);
  const eligible = months >= 6 && previous < 3;
  if (!eligible) {
    return {
      parcelValue: 0,
      parcelCount: 0,
      totalAmount: 0,
      eligible: false,
      message:
        'Não elegível. É necessário ter pelo menos 6 meses trabalhados nos últimos 36 meses e menos de 3 solicitações anteriores.',
    };
  }
  const parcelCount = months >= 24 ? 5 : months >= 12 ? 4 : 3;
  const ranges = [
    { min: 0, max: 197_972, parcelMin: 141_200, parcelMax: 197_972 },
    { min: 197_973, max: 329_943, parcelMin: 197_973, parcelMax: 329_943 },
    { min: 329_944, max: Number.MAX_SAFE_INTEGER, parcelMin: 329_944, parcelMax: 659_886 },
  ];
  const range = ranges.find((r) => input.averageSalary >= r.min && input.averageSalary <= r.max);
  const parcelValue = clamp(input.averageSalary, range.parcelMin, range.parcelMax);
  return {
    parcelValue,
    parcelCount,
    totalAmount: parcelValue * parcelCount,
    eligible: true,
    message: '',
  };
}

export { formatBRL, parseBRLInput };
