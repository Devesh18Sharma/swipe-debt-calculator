import type { CreditCard, CalculatorState, CreditScoreRange } from '../types';
import { generateId } from '../utils/formatters';

export function createDefaultCards(): CreditCard[] {
  return [
    { id: generateId(), name: '', balance: 5000, apr: 22.99, monthlyPayment: 0 },
    { id: generateId(), name: '', balance: 3000, apr: 19.49, monthlyPayment: 0 },
  ];
}

export function createInitialState(): CalculatorState {
  return {
    step: 1,
    cards: createDefaultCards(),
    loanApr: 10,
    loanTermYears: 3,
    userAge: 30,
    annualReturn: 8,
    creditScore: null,
  };
}

export const LOAN_APR_MIN = 3;
export const LOAN_APR_MAX = 36;
export const LOAN_APR_STEP = 0.5;
export const LOAN_TERM_MIN = 1;
export const LOAN_TERM_MAX = 7;
export const USER_AGE_MIN = 18;
export const USER_AGE_MAX = 85;
export const TARGET_AGE = 90;
export const ANNUAL_RETURN_OPTIONS = [6, 8, 10, 12] as const;

export const CREDIT_SCORE_OPTIONS: {
  value: CreditScoreRange;
  label: string;
  range: string;
  apr: number;
}[] = [
  { value: 'excellent', label: 'Excellent', range: '720-850', apr: 10.5 },
  { value: 'good', label: 'Good', range: '690-719', apr: 15.5 },
  { value: 'fair', label: 'Fair', range: '630-689', apr: 21.5 },
  { value: 'poor', label: 'Poor', range: '300-629', apr: 30 },
];

export function getAprForCreditScore(score: CreditScoreRange): number {
  const option = CREDIT_SCORE_OPTIONS.find((o) => o.value === score);
  return option?.apr ?? 15.5;
}

export const DISCLAIMER_TEXT =
  'This calculator is for educational purposes only and does not constitute financial advice. Actual rates and terms may vary. Consult a financial advisor for personalized recommendations.';
