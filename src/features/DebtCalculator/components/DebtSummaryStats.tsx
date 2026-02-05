import { Box } from '@mui/material';
import CreditCardOutlined from '@mui/icons-material/CreditCardOutlined';
import PercentOutlined from '@mui/icons-material/PercentOutlined';
import TrendingUpOutlined from '@mui/icons-material/TrendingUpOutlined';
import StatCard from './StatCard';
import type { DebtSummary } from '../types';
import { formatFull } from '../utils/formatters';

interface DebtSummaryStatsProps {
  debtSummary: DebtSummary;
}

export default function DebtSummaryStats({
  debtSummary,
}: DebtSummaryStatsProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1.5,
        mb: 2.5,
        animation: 'fadeSlideIn 0.4s ease-out 0.4s both',
      }}
    >
      <StatCard
        label="Total Debt"
        value={formatFull(Math.round(debtSummary.totalBalance))}
        subtitle={`Across ${debtSummary.cards.length} card${debtSummary.cards.length > 1 ? 's' : ''}`}
        icon={CreditCardOutlined}
        color="#293A60"
      />
      <StatCard
        label="Avg APR"
        value={`${debtSummary.weightedApr.toFixed(1)}%`}
        subtitle="Weighted average"
        icon={PercentOutlined}
        color="#C0392B"
      />
      <StatCard
        label="Interest Cost"
        value={formatFull(Math.round(debtSummary.totalInterest))}
        subtitle={`Over ${Math.ceil(debtSummary.monthsToPayoff / 12)} years at min. payments`}
        icon={TrendingUpOutlined}
        color="#C0392B"
      />
    </Box>
  );
}
