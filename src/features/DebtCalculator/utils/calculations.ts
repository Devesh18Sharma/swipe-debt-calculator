import type { InvestmentDataPoint, DebtPayoffDataPoint } from '../types';

const MAX_PAYOFF_MONTHS = 1200; // 100-year safety cap (convergence guaranteed by min payment formula)

/**
 * Industry-standard minimum payment: max(interest + 1% of balance, $25).
 * This guarantees principal is always positive (balance always decreases).
 *
 * Proof: when interest + 1%*balance > $25, principal = 1%*balance > 0.
 * When $25 floor applies, balance is small enough that interest < $25, so principal > 0.
 */
export function calcMinPayment(balance: number, apr: number): number {
  if (balance <= 0) return 0;
  const monthlyInterest = (balance * Math.max(apr, 0) / 100) / 12;
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
  if (apr <= 0) {
    const payment = Math.max(monthlyPayment, 25);
    return { months: Math.ceil(balance / payment), totalInterest: 0 };
  }

  let remaining = balance;
  const monthlyRate = apr / 100 / 12;
  let totalInterest = 0;
  let months = 0;

  while (remaining > 0.01 && months < MAX_PAYOFF_MONTHS) {
    const interest = remaining * monthlyRate;
    totalInterest += interest;

    // Credit cards enforce minimum payments — use the greater of specified and minimum
    const minPayment = calcMinPayment(remaining, apr);
    const effectivePayment = Math.max(monthlyPayment, minPayment);
    const principal = effectivePayment - interest;

    remaining = Math.max(remaining - principal, 0);
    months++;
  }

  return { months, totalInterest };
}

/**
 * Credit card payoff using dynamic minimum payments (decreasing over time).
 * This is the real-world scenario where issuers recalculate minimum each month.
 *
 * If userPayment is provided but less than the minimum, the minimum is used instead
 * — credit card companies enforce minimum payments (paying less incurs late fees).
 */
export function calcCreditCardPayoffDynamic(
  balance: number,
  apr: number,
  userPayment?: number,
): { months: number; totalInterest: number } {
  if (balance <= 0) return { months: 0, totalInterest: 0 };
  if (apr <= 0) {
    const payment =
      userPayment && userPayment > 0
        ? userPayment
        : Math.max(balance * 0.01, 25);
    return { months: Math.ceil(balance / payment), totalInterest: 0 };
  }

  let remaining = balance;
  const monthlyRate = apr / 100 / 12;
  let totalInterest = 0;
  let months = 0;

  while (remaining > 0.01 && months < MAX_PAYOFF_MONTHS) {
    const interest = remaining * monthlyRate;
    totalInterest += interest;

    // Calculate the industry-standard minimum payment for this balance
    const minPayment = calcMinPayment(remaining, apr);

    // If user specified a payment, use the greater of their payment and the minimum.
    // Credit card companies enforce minimums — you can't pay less without penalties.
    const payment =
      userPayment && userPayment > 0
        ? Math.max(userPayment, minPayment)
        : minPayment;

    const principal = payment - interest;
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

  data.push({
    month: 0,
    label: 'Now',
    currentBalance: Math.round(totalBalance),
    loanBalance: Math.round(totalBalance),
  });

  for (let m = 1; m <= maxMonths; m++) {
    // Update each card — enforce minimum payment floor (same as calcCreditCardPayoffDynamic)
    cardStates.forEach((cs) => {
      if (cs.remaining <= 0.01) return;
      const interest = cs.remaining * cs.monthlyRate;
      const minPay = calcMinPayment(cs.remaining, cs.apr);
      const payment =
        cs.userPayment > 0 ? Math.max(cs.userPayment, minPay) : minPay;
      cs.remaining = Math.max(cs.remaining - (payment - interest), 0);
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

    // Sample more sparsely for longer timelines to keep chart data reasonable
    const interval = m <= 60 ? 3 : m <= 240 ? 6 : 12;
    if (
      m % interval === 0 ||
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
