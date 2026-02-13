import { Box } from '@mui/material';
import CreditCardOutlined from '@mui/icons-material/CreditCardOutlined';
import PercentOutlined from '@mui/icons-material/PercentOutlined';
import TrendingUpOutlined from '@mui/icons-material/TrendingUpOutlined';
import PaymentsOutlined from '@mui/icons-material/PaymentsOutlined';
import StatCard from './StatCard';
import type { DebtSummary } from '../types';
import { formatFull } from '../utils/formatters';

interface DebtSummaryStatsProps {
  debtSummary: DebtSummary;
}

export default function DebtSummaryStats({
  debtSummary,
}: DebtSummaryStatsProps) {
  const yearsToPayoff = Math.ceil(debtSummary.monthsToPayoff / 12);
  const payoffLabel =
    yearsToPayoff > 30
      ? '30+ years at current payments'
      : `Over ${yearsToPayoff} year${yearsToPayoff > 1 ? 's' : ''} at current payments`;

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
        label="Monthly Payment"
        value={formatFull(Math.round(debtSummary.totalMinPayment))}
        subtitle="Current total payments"
        icon={PaymentsOutlined}
        color="#5B6ABF"
      />
      <StatCard
        label="Interest Cost"
        value={formatFull(Math.round(debtSummary.totalInterest))}
        subtitle={payoffLabel}
        icon={TrendingUpOutlined}
        color="#C0392B"
      />
    </Box>
  );
}
