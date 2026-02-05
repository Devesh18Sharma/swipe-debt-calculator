import type { InvestmentDataPoint } from '../types';

const MAX_PAYOFF_MONTHS = 600;

/** Minimum payment: 2% of balance or $25, whichever is greater */
export function calcMinPayment(balance: number): number {
  return Math.max(balance * 0.02, 25);
}

/** Credit card payoff with fixed monthly payment. Returns months and total interest. */
export function calcCreditCardPayoff(
  balance: number,
  apr: number,
  monthlyPayment: number,
): { months: number; totalInterest: number } {
  let remaining = balance;
  const monthlyRate = apr / 100 / 12;
  let totalInterest = 0;
  let months = 0;

  while (remaining > 0.01 && months < MAX_PAYOFF_MONTHS) {
    const interest = remaining * monthlyRate;
    totalInterest += interest;
    const principal = Math.max(monthlyPayment - interest, 0);
    if (principal <= 0) return { months: Infinity, totalInterest: Infinity };
    remaining = Math.max(remaining - principal, 0);
    months++;
  }

  return { months, totalInterest };
}

/** Monthly payment for a fixed-rate amortizing loan */
export function calcLoanPayment(
  principal: number,
  apr: number,
  termMonths: number,
): number {
  const r = apr / 100 / 12;
  if (r === 0) return principal / termMonths;
  return (
    (principal * r * Math.pow(1 + r, termMonths)) /
    (Math.pow(1 + r, termMonths) - 1)
  );
}

/** Total interest paid on a fixed-rate loan */
export function calcLoanTotalInterest(
  principal: number,
  apr: number,
  termMonths: number,
): number {
  const monthly = calcLoanPayment(principal, apr, termMonths);
  return monthly * termMonths - principal;
}

/** Investment growth with regular monthly deposits. Returns yearly data points. */
export function calcInvestmentGrowth(
  monthlyDeposit: number,
  annualReturn: number,
  years: number,
): InvestmentDataPoint[] {
  const data: InvestmentDataPoint[] = [];
  const monthlyRate = annualReturn / 100 / 12;
  let balance = 0;
  let totalDeposits = 0;

  for (let y = 1; y <= years; y++) {
    for (let m = 0; m < 12; m++) {
      balance = balance * (1 + monthlyRate) + monthlyDeposit;
      totalDeposits += monthlyDeposit;
    }
    data.push({
      year: y,
      label: `Year ${y}`,
      Invested: Math.round(totalDeposits),
      Growth: Math.round(balance - totalDeposits),
      total: Math.round(balance),
    });
  }

  return data;
}
