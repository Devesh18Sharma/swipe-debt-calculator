import { useReducer, useCallback, useMemo } from 'react';
import type {
  CalculatorState,
  CalculatorAction,
  CreditCard,
  Step,
} from '../types';
import { createInitialState } from '../constants';
import { generateId } from '../utils/formatters';

function calculatorReducer(
  state: CalculatorState,
  action: CalculatorAction,
): CalculatorState {
  switch (action.type) {
    case 'ADD_CARD':
      return {
        ...state,
        cards: [
          ...state.cards,
          { id: generateId(), name: '', balance: 0, apr: 0 },
        ],
      };

    case 'REMOVE_CARD':
      return {
        ...state,
        cards: state.cards.filter((c) => c.id !== action.payload),
      };

    case 'UPDATE_CARD':
      return {
        ...state,
        cards: state.cards.map((c) =>
          c.id === action.payload.id
            ? { ...c, [action.payload.field]: action.payload.value }
            : c,
        ),
      };

    case 'SET_STEP':
      return { ...state, step: action.payload };

    case 'SET_LOAN_APR':
      return { ...state, loanApr: action.payload };

    case 'SET_LOAN_TERM':
      return { ...state, loanTermYears: action.payload };

    case 'SET_USER_AGE':
      return { ...state, userAge: action.payload };

    case 'SET_ANNUAL_RETURN':
      return { ...state, annualReturn: action.payload };

    case 'RESET':
      return createInitialState();

    default:
      return state;
  }
}

export function useCalculatorReducer() {
  const [state, dispatch] = useReducer(
    calculatorReducer,
    null,
    createInitialState,
  );

  const addCard = useCallback(() => dispatch({ type: 'ADD_CARD' }), []);

  const removeCard = useCallback(
    (id: string) => dispatch({ type: 'REMOVE_CARD', payload: id }),
    [],
  );

  const updateCard = useCallback(
    (id: string, field: keyof CreditCard, value: string | number) =>
      dispatch({ type: 'UPDATE_CARD', payload: { id, field, value } }),
    [],
  );

  const goToStep = useCallback(
    (step: Step) => dispatch({ type: 'SET_STEP', payload: step }),
    [],
  );

  const setLoanApr = useCallback(
    (apr: number) => dispatch({ type: 'SET_LOAN_APR', payload: apr }),
    [],
  );

  const setLoanTerm = useCallback(
    (term: number) => dispatch({ type: 'SET_LOAN_TERM', payload: term }),
    [],
  );

  const setUserAge = useCallback(
    (age: number) => dispatch({ type: 'SET_USER_AGE', payload: age }),
    [],
  );

  const setAnnualReturn = useCallback(
    (rate: number) => dispatch({ type: 'SET_ANNUAL_RETURN', payload: rate }),
    [],
  );

  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  const hasValidCards = useMemo(
    () => state.cards.some((c) => c.balance > 0 && c.apr > 0),
    [state.cards],
  );

  return {
    state,
    addCard,
    removeCard,
    updateCard,
    goToStep,
    setLoanApr,
    setLoanTerm,
    setUserAge,
    setAnnualReturn,
    reset,
    hasValidCards,
  };
}
