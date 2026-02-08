export interface CreditCard {
  id: string;
  name: string;
  balance: number;
  apr: number;
  monthlyPayment: number;
}

export type CreditScoreRange = 'excellent' | 'good' | 'fair' | 'poor';

export interface DebtSummary {
  totalBalance: number;
  weightedApr: number;
  totalMinPayment: number;
  totalInterest: number;
  monthsToPayoff: number;
  cards: CreditCard[];
}

export interface ConsolidationResult {
  monthlyPayment: number;
  totalInterest: number;
  interestSaved: number;
  monthlySaved: number;
  termMonths: number;
}

export interface InvestmentDataPoint {
  year: number;
  label: string;
  Invested: number;
  Growth: number;
  total: number;
}

export interface DebtPayoffDataPoint {
  month: number;
  label: string;
  currentBalance: number;
  loanBalance: number;
}

export type Step = 1 | 2 | 3 | 4;

export interface CalculatorState {
  step: Step;
  cards: CreditCard[];
  loanApr: number;
  loanTermYears: number;
  userAge: number;
  annualReturn: number;
  creditScore: CreditScoreRange | null;
}

export type CalculatorAction =
  | { type: 'ADD_CARD' }
  | { type: 'REMOVE_CARD'; payload: string }
  | {
      type: 'UPDATE_CARD';
      payload: { id: string; field: keyof CreditCard; value: string | number };
    }
  | { type: 'SET_STEP'; payload: Step }
  | { type: 'SET_LOAN_APR'; payload: number }
  | { type: 'SET_LOAN_TERM'; payload: number }
  | { type: 'SET_USER_AGE'; payload: number }
  | { type: 'SET_ANNUAL_RETURN'; payload: number }
  | { type: 'SET_CREDIT_SCORE'; payload: CreditScoreRange }
  | { type: 'RESET' };
