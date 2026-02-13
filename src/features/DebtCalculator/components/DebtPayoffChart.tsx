import { Box, Typography } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  Cell,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import type { DebtSummary } from '../types';

interface DebtPayoffChartProps {
  debtSummary: DebtSummary;
  loanTermYears: number;
}

export default function DebtPayoffChart({
  debtSummary,
  loanTermYears,
}: DebtPayoffChartProps) {
  const rawCurrentYears = debtSummary.monthsToPayoff / 12;
  const cappedCurrentYears = Math.min(Math.ceil(rawCurrentYears), 30);
  const currentLabel =
    rawCurrentYears > 30
      ? '30+ yrs'
      : `${Math.ceil(rawCurrentYears)} yr${Math.ceil(rawCurrentYears) !== 1 ? 's' : ''}`;
  const loanLabel = `${loanTermYears} yr${loanTermYears !== 1 ? 's' : ''}`;
  const yearsSaved = Math.max(
    Math.round(rawCurrentYears) - loanTermYears,
    0,
  );

  const data = [
    { name: 'Current Cards', years: cappedCurrentYears, label: currentLabel },
    {
      name: 'Consolidation Loan',
      years: loanTermYears,
      label: loanLabel,
    },
  ];

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
          mb: 1.5,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          fontFamily: "'Work Sans', sans-serif",
        }}
      >
        Debt Payoff Timeline
      </Typography>

      <Box sx={{ width: '100%', height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 30, right: 30, left: 30, bottom: 5 }}
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
              dataKey="years"
              radius={[8, 8, 0, 0]}
              maxBarSize={90}
              animationDuration={800}
              animationEasing="ease-out"
            >
              {data.map((_entry, index) => (
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

      {yearsSaved > 0 && (
        <Box
          sx={{
            mt: 1,
            p: '10px 16px',
            borderRadius: '8px',
            bgcolor: 'custom.greenLight',
            border: '1px solid rgba(46,125,91,0.12)',
            textAlign: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 600,
              color: 'custom.green',
              fontFamily: "'Work Sans', sans-serif",
            }}
          >
            Debt-free {yearsSaved}+ years sooner
          </Typography>
        </Box>
      )}

      <Typography
        sx={{
          fontSize: 12,
          color: 'custom.muted',
          textAlign: 'center',
          mt: 1.5,
          fontFamily: "'Work Sans', sans-serif",
        }}
      >
        See how consolidation gets you debt-free faster
      </Typography>
    </Box>
  );
}
