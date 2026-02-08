import type { InvestmentDataPoint, DebtPayoffDataPoint } from '../types';

const MAX_PAYOFF_MONTHS = 360; // 30 year cap

/**
 * Industry-standard minimum payment: max(interest + 1% of balance, $25).
 * This guarantees the balance always decreases — no more Infinity bug.
 */
export function calcMinPayment(balance: number, apr: number): number {
  const monthlyInterest = (balance * (apr / 100)) / 12;
  const principalPortion = balance * 0.01;
  return Math.max(monthlyInterest + principalPortion, 25);
}

/** Credit card payoff with fixed monthly payment. Returns months and total interest. */
export function calcCreditCardPayoff(
  balance: number,
  apr: number,
  monthlyPayment: number,
): { months: number; totalInterest: number } {
  if (balance <= 0) return { months: 0, totalInterest: 0 };

  let remaining = balance;
  const monthlyRate = apr / 100 / 12;
  let totalInterest = 0;
  let months = 0;

  while (remaining > 0.01 && months < MAX_PAYOFF_MONTHS) {
    const interest = remaining * monthlyRate;
    totalInterest += interest;
    const principal = monthlyPayment - interest;

    // If payment doesn't cover interest, use dynamic min payment for this month
    if (principal <= 0) {
      const dynamicPayment = calcMinPayment(remaining, apr);
      const dynPrincipal = dynamicPayment - interest;
      remaining = Math.max(remaining - dynPrincipal, 0);
    } else {
      remaining = Math.max(remaining - principal, 0);
    }
    months++;
  }

  // If we hit the cap, estimate remaining interest
  if (remaining > 0.01) {
    totalInterest += remaining * monthlyRate * 12; // add 1 more year estimate
    months = MAX_PAYOFF_MONTHS;
  }

  return { months, totalInterest };
}

/**
 * Credit card payoff using dynamic minimum payments (decreasing over time).
 * This is the real-world scenario where issuers recalculate minimum each month.
 */
export function calcCreditCardPayoffDynamic(
  balance: number,
  apr: number,
  userPayment?: number,
): { months: number; totalInterest: number } {
  if (balance <= 0) return { months: 0, totalInterest: 0 };

  let remaining = balance;
  const monthlyRate = apr / 100 / 12;
  let totalInterest = 0;
  let months = 0;

  while (remaining > 0.01 && months < MAX_PAYOFF_MONTHS) {
    const interest = remaining * monthlyRate;
    totalInterest += interest;

    // Use user-specified payment, or dynamic minimum (recalculated each month)
    const payment =
      userPayment && userPayment > 0
        ? userPayment
        : calcMinPayment(remaining, apr);

    // Ensure payment at least covers interest + $1 principal
    const effectivePayment = Math.max(payment, interest + 1);
    const principal = effectivePayment - interest;

    remaining = Math.max(remaining - principal, 0);
    months++;
  }

  if (remaining > 0.01) {
    totalInterest += remaining * monthlyRate * 12;
    months = MAX_PAYOFF_MONTHS;
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

/** Debt payoff timeline comparing current cards vs consolidation loan. Returns monthly data. */
export function calcDebtPayoffTimeline(
  cards: { balance: number; apr: number; monthlyPayment: number }[],
  loanApr: number,
  loanTermMonths: number,
): DebtPayoffDataPoint[] {
  const totalBalance = cards.reduce((sum, c) => sum + c.balance, 0);
  if (totalBalance <= 0) return [];

  const loanMonthlyPayment = calcLoanPayment(
    totalBalance,
    loanApr,
    loanTermMonths,
  );

  // Simulate current cards payoff (all cards combined)
  const cardStates = cards.map((c) => ({
    remaining: c.balance,
    monthlyRate: c.apr / 100 / 12,
    apr: c.apr,
    userPayment: c.monthlyPayment,
  }));

  const data: DebtPayoffDataPoint[] = [];
  let loanRemaining = totalBalance;
  const loanMonthlyRate = loanApr / 100 / 12;
  const maxMonths = Math.max(loanTermMonths, MAX_PAYOFF_MONTHS);

  // Record every 3 months for smoother chart, plus month 0
  data.push({
    month: 0,
    label: 'Now',
    currentBalance: Math.round(totalBalance),
    loanBalance: Math.round(totalBalance),
  });

  for (let m = 1; m <= maxMonths; m++) {
    // Update each card
    cardStates.forEach((cs) => {
      if (cs.remaining <= 0.01) return;
      const interest = cs.remaining * cs.monthlyRate;
      const payment =
        cs.userPayment > 0
          ? cs.userPayment
          : calcMinPayment(cs.remaining, cs.apr);
      const effectivePayment = Math.max(payment, interest + 1);
      cs.remaining = Math.max(cs.remaining - (effectivePayment - interest), 0);
    });

    // Update loan
    if (loanRemaining > 0.01) {
      const loanInterest = loanRemaining * loanMonthlyRate;
      loanRemaining = Math.max(
        loanRemaining - (loanMonthlyPayment - loanInterest),
        0,
      );
    }

    const currentTotal = cardStates.reduce((sum, cs) => sum + cs.remaining, 0);

    // Record every 3 months, or at key points
    if (
      m % 3 === 0 ||
      m === loanTermMonths ||
      currentTotal <= 0.01 ||
      loanRemaining <= 0.01
    ) {
      data.push({
        month: m,
        label:
          m < 12
            ? `${m}mo`
            : `${Math.floor(m / 12)}yr${m % 12 ? ` ${m % 12}mo` : ''}`,
        currentBalance: Math.round(currentTotal),
        loanBalance: Math.round(loanRemaining),
      });
    }

    // Stop once both are paid off
    if (currentTotal <= 0.01 && loanRemaining <= 0.01) break;
  }

  return data;
}
