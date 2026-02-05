import type { CreditCard, CalculatorState } from '../types';
import { generateId } from '../utils/formatters';

export function createDefaultCards(): CreditCard[] {
  return [
    { id: generateId(), name: '', balance: 5000, apr: 22.99 },
    { id: generateId(), name: '', balance: 3000, apr: 19.49 },
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

export const DISCLAIMER_TEXT =
  'This calculator is for educational purposes only and does not constitute financial advice. Actual rates and terms may vary. Consult a financial advisor for personalized recommendations.';
