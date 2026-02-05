import { useMemo } from 'react';
import type {
  CalculatorState,
  DebtSummary,
  ConsolidationResult,
  InvestmentDataPoint,
} from '../types';
import {
  calcMinPayment,
  calcCreditCardPayoff,
  calcLoanPayment,
  calcLoanTotalInterest,
  calcInvestmentGrowth,
} from '../utils/calculations';
import { TARGET_AGE } from '../constants';

export function useDebtCalculations(state: CalculatorState) {
  const debtSummary: DebtSummary = useMemo(() => {
    const validCards = state.cards.filter((c) => c.balance > 0 && c.apr > 0);

    if (validCards.length === 0) {
      return {
        totalBalance: 0,
        weightedApr: 0,
        totalMinPayment: 0,
        totalInterest: 0,
        monthsToPayoff: 0,
        cards: [],
      };
    }

    const totalBalance = validCards.reduce((sum, c) => sum + c.balance, 0);
    const weightedApr =
      validCards.reduce((sum, c) => sum + c.apr * c.balance, 0) / totalBalance;
    const totalMinPayment = validCards.reduce(
      (sum, c) => sum + calcMinPayment(c.balance),
      0,
    );

    let totalInterest = 0;
    let maxMonths = 0;

    validCards.forEach((c) => {
      const result = calcCreditCardPayoff(
        c.balance,
        c.apr,
        calcMinPayment(c.balance),
      );
      totalInterest += result.totalInterest;
      maxMonths = Math.max(maxMonths, result.months);
    });

    return {
      totalBalance,
      weightedApr,
      totalMinPayment,
      totalInterest,
      monthsToPayoff: maxMonths,
      cards: validCards,
    };
  }, [state.cards]);

  const consolidation: ConsolidationResult | null = useMemo(() => {
    if (debtSummary.totalBalance <= 0) return null;

    const termMonths = state.loanTermYears * 12;
    const monthlyPayment = calcLoanPayment(
      debtSummary.totalBalance,
      state.loanApr,
      termMonths,
    );
    const totalInterest = calcLoanTotalInterest(
      debtSummary.totalBalance,
      state.loanApr,
      termMonths,
    );
    const interestSaved = debtSummary.totalInterest - totalInterest;
    const monthlySaved = debtSummary.totalMinPayment - monthlyPayment;

    return {
      monthlyPayment,
      totalInterest,
      interestSaved,
      monthlySaved,
      termMonths,
    };
  }, [debtSummary, state.loanApr, state.loanTermYears]);

  const investmentData: InvestmentDataPoint[] | null = useMemo(() => {
    if (!consolidation || consolidation.interestSaved <= 0) return null;

    const monthlyInvestment = consolidation.monthlyPayment;
    const yearsToInvest = Math.max(
      TARGET_AGE - state.userAge - state.loanTermYears,
      1,
    );

    return calcInvestmentGrowth(
      monthlyInvestment,
      state.annualReturn,
      yearsToInvest,
    );
  }, [consolidation, state.userAge, state.loanTermYears, state.annualReturn]);

  return { debtSummary, consolidation, investmentData };
}
