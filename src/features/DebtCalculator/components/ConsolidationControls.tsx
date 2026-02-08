import { Box, Typography } from '@mui/material';
import BotMessage from './BotMessage';
import SliderControl from './SliderControl';
import type { CreditScoreRange } from '../types';
import {
  LOAN_APR_MIN,
  LOAN_APR_MAX,
  LOAN_APR_STEP,
  LOAN_TERM_MIN,
  LOAN_TERM_MAX,
  CREDIT_SCORE_OPTIONS,
} from '../constants';

interface ConsolidationControlsProps {
  loanApr: number;
  loanTerm: number;
  creditScore: CreditScoreRange | null;
  onAprChange: (v: number) => void;
  onTermChange: (v: number) => void;
}

export default function ConsolidationControls({
  loanApr,
  loanTerm,
  creditScore,
  onAprChange,
  onTermChange,
}: ConsolidationControlsProps) {
  const scoreLabel = creditScore
    ? CREDIT_SCORE_OPTIONS.find((o) => o.value === creditScore)?.label
    : null;

  return (
    <BotMessage delay={600}>
      <Typography
        sx={{
          fontSize: 15,
          color: 'custom.navy',
          mb: 2,
          fontWeight: 500,
          fontFamily: "'Work Sans', sans-serif",
        }}
      >
        {scoreLabel
          ? `Based on your ${scoreLabel} credit score, I've set a realistic rate. Fine-tune it below:`
          : "Let's see what a consolidation loan could look like. Adjust the rate and term:"}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.25 }}>
        <SliderControl
          label="Loan APR"
          value={loanApr}
          min={LOAN_APR_MIN}
          max={LOAN_APR_MAX}
          step={LOAN_APR_STEP}
          formatValue={(v) => `${v}%`}
          formatMin="3%"
          formatMax="36%"
          onChange={onAprChange}
        />
        <SliderControl
          label="Loan Term"
          value={loanTerm}
          min={LOAN_TERM_MIN}
          max={LOAN_TERM_MAX}
          step={1}
          formatValue={(v) => `${v} year${v > 1 ? 's' : ''}`}
          formatMin="1 yr"
          formatMax="7 yrs"
          onChange={onTermChange}
        />
      </Box>
    </BotMessage>
  );
}
