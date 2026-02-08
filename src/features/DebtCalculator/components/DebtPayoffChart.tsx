import { Box, Typography } from '@mui/material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { DebtPayoffDataPoint } from '../types';
import { formatCompact } from '../utils/formatters';
import CustomTooltip from './CustomTooltip';

interface DebtPayoffChartProps {
  data: DebtPayoffDataPoint[];
}

export default function DebtPayoffChart({ data }: DebtPayoffChartProps) {
  if (data.length < 2) return null;

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
        Debt Payoff Timeline
      </Typography>

      <ResponsiveContainer width="100%" height={260}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="gradCurrent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#C0392B" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#C0392B" stopOpacity={0.03} />
            </linearGradient>
            <linearGradient id="gradLoan" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2E7D5B" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#2E7D5B" stopOpacity={0.03} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(0,0,0,0.06)"
            vertical={false}
          />
          <XAxis
            dataKey="label"
            tick={{
              fontSize: 11,
              fill: '#949EAB',
              fontFamily: "'Work Sans', sans-serif",
            }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tickFormatter={(v) => formatCompact(v)}
            tick={{
              fontSize: 11,
              fill: '#949EAB',
              fontFamily: "'Work Sans', sans-serif",
            }}
            axisLine={false}
            tickLine={false}
            width={55}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            height={30}
            wrapperStyle={{
              fontSize: 12,
              fontFamily: "'Work Sans', sans-serif",
            }}
          />
          <Area
            type="monotone"
            dataKey="currentBalance"
            name="Current Cards"
            stroke="#C0392B"
            strokeWidth={2}
            fill="url(#gradCurrent)"
            dot={false}
            activeDot={{ r: 4, fill: '#C0392B' }}
          />
          <Area
            type="monotone"
            dataKey="loanBalance"
            name="Consolidation Loan"
            stroke="#2E7D5B"
            strokeWidth={2}
            fill="url(#gradLoan)"
            dot={false}
            activeDot={{ r: 4, fill: '#2E7D5B' }}
          />
        </AreaChart>
      </ResponsiveContainer>

      <Typography
        sx={{
          fontSize: 11,
          color: 'custom.muted',
          mt: 1,
          textAlign: 'center',
          fontFamily: "'Work Sans', sans-serif",
        }}
      >
        See how consolidation gets you debt-free faster
      </Typography>
    </Box>
  );
}
