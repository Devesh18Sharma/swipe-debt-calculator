import { Box, Typography } from '@mui/material';
import TrendingUpOutlined from '@mui/icons-material/TrendingUpOutlined';
import ComparisonBar from './ComparisonBar';
import AnimatedNumber from './AnimatedNumber';
import PrimaryButton from './PrimaryButton';
import type { DebtSummary, ConsolidationResult, Step } from '../types';
import { formatFull } from '../utils/formatters';

interface InterestComparisonProps {
  debtSummary: DebtSummary;
  consolidation: ConsolidationResult;
  loanApr: number;
  loanTerm: number;
  step: Step;
  onAdvance: () => void;
}

export default function InterestComparison({
  debtSummary,
  consolidation,
  loanApr,
  loanTerm,
  step,
  onAdvance,
}: InterestComparisonProps) {
  return (
    <Box
      sx={{
        bgcolor: 'custom.cardBg',
        borderRadius: '14px',
        p: '20px 22px',
        mb: 2.5,
        border: 1,
        borderColor: 'custom.border',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        animation: 'fadeSlideIn 0.4s ease-out',
      }}
    >
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 600,
          color: 'custom.navy',
          mb: 2,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          fontFamily: "'Work Sans', sans-serif",
        }}
      >
        Interest Comparison
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.75 }}>
        <ComparisonBar
          label="Current Cards (min. payments)"
          value={debtSummary.totalInterest}
          maxValue={debtSummary.totalInterest}
          color="#C0392B"
          amount={formatFull(Math.round(debtSummary.totalInterest))}
        />
        <ComparisonBar
          label={`Consolidation Loan (${loanApr}%, ${loanTerm}yr)`}
          value={consolidation.totalInterest}
          maxValue={debtSummary.totalInterest}
          color="#2E7D5B"
          amount={formatFull(Math.round(consolidation.totalInterest))}
        />
      </Box>

      {consolidation.interestSaved > 0 ? (
        <Box
          sx={{
            mt: 2.25,
            p: '14px 18px',
            borderRadius: '10px',
            bgcolor: 'custom.greenLight',
            border: '1px solid rgba(46,125,91,0.15)',
            textAlign: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: 13,
              color: 'custom.green',
              fontWeight: 500,
              mb: 0.25,
              fontFamily: "'Work Sans', sans-serif",
            }}
          >
            You could save
          </Typography>
          <Typography
            sx={{
              fontSize: 28,
              fontFamily: "'Libre Franklin', sans-serif",
              fontWeight: 800,
              color: 'custom.green',
            }}
          >
            <AnimatedNumber
              value={Math.round(consolidation.interestSaved)}
            />
          </Typography>
          <Typography
            sx={{
              fontSize: 12,
              color: 'custom.green',
              opacity: 0.7,
              mt: 0.25,
              fontFamily: "'Work Sans', sans-serif",
            }}
          >
            in total interest &bull; Monthly payment:{' '}
            {formatFull(Math.round(consolidation.monthlyPayment))}/mo
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            mt: 2.25,
            p: '14px 18px',
            borderRadius: '10px',
            bgcolor: '#FFF8E1',
            border: '1px solid rgba(245,166,35,0.2)',
            textAlign: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: 13,
              color: '#8B6914',
              fontWeight: 500,
              mb: 0.5,
              fontFamily: "'Work Sans', sans-serif",
            }}
          >
            At these settings, a consolidation loan costs a bit more in
            interest. Try lowering the APR or extending the term above.
          </Typography>
          <Typography
            sx={{
              fontSize: 12,
              color: '#8B6914',
              opacity: 0.8,
              fontFamily: "'Work Sans', sans-serif",
            }}
          >
            But either way — there&apos;s a bright side ahead!
          </Typography>
        </Box>
      )}

      {step === 3 && (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <PrimaryButton onClick={onAdvance} sx={{ mx: 'auto' }}>
            {consolidation.interestSaved > 0
              ? 'What If I Invest My Savings?'
              : "See What's Possible After Debt"}{' '}
            <TrendingUpOutlined sx={{ fontSize: 16 }} />
          </PrimaryButton>
        </Box>
      )}
    </Box>
  );
}
