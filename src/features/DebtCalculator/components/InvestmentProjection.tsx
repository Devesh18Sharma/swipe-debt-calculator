import { Box, Typography } from '@mui/material';
import AttachMoneyOutlined from '@mui/icons-material/AttachMoneyOutlined';
import TrendingUpOutlined from '@mui/icons-material/TrendingUpOutlined';
import InvestmentControls from './InvestmentControls';
import InvestmentChart from './InvestmentChart';
import StatCard from './StatCard';
import AnimatedNumber from './AnimatedNumber';
import type { ConsolidationResult, InvestmentDataPoint } from '../types';
import { formatFull } from '../utils/formatters';
import { TARGET_AGE } from '../constants';

interface InvestmentProjectionProps {
  investmentData: InvestmentDataPoint[];
  consolidation: ConsolidationResult;
  annualReturn: number;
  userAge: number;
  loanTerm: number;
  onAgeChange: (v: number) => void;
  onReturnChange: (v: number) => void;
}

export default function InvestmentProjection({
  investmentData,
  consolidation,
  annualReturn,
  userAge,
  loanTerm,
  onAgeChange,
  onReturnChange,
}: InvestmentProjectionProps) {
  const finalData = investmentData[investmentData.length - 1];

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
        animation: 'fadeSlideIn 0.4s ease-out 0.3s both',
      }}
    >
      <InvestmentControls
        userAge={userAge}
        annualReturn={annualReturn}
        onAgeChange={onAgeChange}
        onReturnChange={onReturnChange}
      />

      {finalData && (
        <>
          <Box
            sx={{
              textAlign: 'center',
              p: '20px 16px',
              borderRadius: 1.5,
              background:
                'linear-gradient(135deg, rgba(52,52,88,0.03), rgba(91,106,191,0.07))',
              border: '1px solid rgba(91,106,191,0.12)',
              mb: 2.5,
            }}
          >
            <Typography
              sx={{
                fontSize: 13,
                color: 'custom.muted',
                fontWeight: 500,
                mb: 0.5,
                fontFamily: "'Work Sans', sans-serif",
              }}
            >
              By age {TARGET_AGE}, your investment could grow to
            </Typography>
            <Typography
              sx={{
                fontSize: 'clamp(30px, 6vw, 42px)',
                fontFamily: "'Libre Franklin', sans-serif",
                fontWeight: 800,
                color: 'custom.accent',
                lineHeight: 1.2,
              }}
            >
              <AnimatedNumber value={finalData.total} />
            </Typography>
            <Typography
              sx={{
                fontSize: 12,
                color: 'custom.muted',
                mt: 0.75,
                fontFamily: "'Work Sans', sans-serif",
              }}
            >
              Investing{' '}
              {formatFull(Math.round(consolidation.monthlyPayment))}/mo &bull;{' '}
              {annualReturn}% avg return &bull;{' '}
              {TARGET_AGE - userAge - loanTerm} years
            </Typography>
          </Box>

          <InvestmentChart data={investmentData} />

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1.25,
              mt: 2,
            }}
          >
            <StatCard
              label="Total Invested"
              value={formatFull(finalData.Invested)}
              icon={AttachMoneyOutlined}
              color="#343458"
            />
            <StatCard
              label="Market Growth"
              value={formatFull(finalData.Growth)}
              icon={TrendingUpOutlined}
              color="#5B6ABF"
            />
          </Box>
        </>
      )}
    </Box>
  );
}
