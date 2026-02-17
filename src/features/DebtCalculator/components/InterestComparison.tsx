import { Box, Typography } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  Cell,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import TrendingUpOutlined from '@mui/icons-material/TrendingUpOutlined';
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
  const barData = [
    {
      name: 'Current Cards',
      interest: Math.round(debtSummary.totalInterest),
      label: formatFull(Math.round(debtSummary.totalInterest)),
    },
    {
      name: `Consolidation Loan`,
      interest: Math.round(consolidation.totalInterest),
      label: formatFull(Math.round(consolidation.totalInterest)),
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: 'custom.cardBg',
        borderRadius: '14px',
        p: '24px 22px',
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
          mb: 1.5,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          fontFamily: "'Work Sans', sans-serif",
        }}
      >
        Interest Comparison
      </Typography>

      {/* ── Vertical Bar Chart: Interest Amounts ── */}
      <Box sx={{ width: '100%', height: 240 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={barData}
            margin={{ top: 35, right: 30, left: 30, bottom: 5 }}
            barGap={20}
          >
            <defs>
              <linearGradient id="barRed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E74C3C" stopOpacity={1} />
                <stop offset="100%" stopColor="#C0392B" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="barGreen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3DA07A" stopOpacity={1} />
                <stop offset="100%" stopColor="#2E7D5B" stopOpacity={1} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 12,
                fontFamily: "'Work Sans', sans-serif",
                fill: '#5F6B7A',
              }}
            />
            <Bar
              dataKey="interest"
              radius={[8, 8, 0, 0]}
              maxBarSize={90}
              animationDuration={800}
              animationEasing="ease-out"
            >
              {barData.map((_entry, index) => (
                <Cell
                  key={_entry.name}
                  fill={`url(#${index === 0 ? 'barRed' : 'barGreen'})`}
                />
              ))}
              <LabelList
                dataKey="label"
                position="top"
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  fontFamily: "'Libre Franklin', sans-serif",
                  fill: '#293A60',
                }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>

      <Typography
        sx={{
          fontSize: 12,
          color: 'custom.muted',
          textAlign: 'center',
          mt: 1,
          fontFamily: "'Work Sans', sans-serif",
        }}
      >
        Total interest paid &bull; {loanApr}% APR &bull; {loanTerm} yr
        {loanTerm !== 1 ? 's' : ''} term
      </Typography>

      {/* ── Savings Highlight (hero-sized) ── */}
      {consolidation.interestSaved > 0 ? (
        <Box
          sx={{
            mt: 3,
            p: '28px 24px',
            borderRadius: '14px',
            bgcolor: 'custom.greenLight',
            border: '1.5px solid rgba(46,125,91,0.18)',
            textAlign: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: 15,
              color: 'custom.green',
              fontWeight: 600,
              mb: 0.75,
              fontFamily: "'Work Sans', sans-serif",
            }}
          >
            You could save
          </Typography>
          <Typography
            sx={{
              fontSize: 'clamp(38px, 9vw, 52px)',
              fontFamily: "'Libre Franklin', sans-serif",
              fontWeight: 800,
              color: 'custom.green',
              lineHeight: 1.1,
            }}
          >
            <AnimatedNumber
              value={Math.round(consolidation.interestSaved)}
            />
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              color: 'custom.green',
              opacity: 0.75,
              mt: 1,
              fontWeight: 500,
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
            mt: 3,
            p: '24px 24px',
            borderRadius: '14px',
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
        <Box sx={{ textAlign: 'center', mt: 2.5 }}>
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
