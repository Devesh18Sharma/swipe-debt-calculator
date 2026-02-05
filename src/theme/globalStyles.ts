import { type CSSObject } from '@mui/material/styles';

export const globalStyles: Record<string, CSSObject> = {
  '@keyframes fadeSlideIn': {
    from: { opacity: 0, transform: 'translateY(12px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
  '@keyframes pulseGlow': {
    '0%, 100%': { boxShadow: '0 0 0 0 rgba(91,106,191,0.3)' },
    '50%': { boxShadow: '0 0 0 8px rgba(91,106,191,0)' },
  },
  'input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button':
    {
      WebkitAppearance: 'none',
      margin: 0,
    },
  'input[type="number"]': {
    MozAppearance: 'textfield' as never,
  },
  'input::placeholder': {
    color: '#949EAB',
    fontWeight: 400,
  },
  '*, *::before, *::after': {
    boxSizing: 'border-box',
  },
  body: {
    margin: 0,
    padding: 0,
  },
};
