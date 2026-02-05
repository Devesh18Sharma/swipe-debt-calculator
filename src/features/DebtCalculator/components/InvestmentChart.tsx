import { Box } from '@mui/material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import CustomTooltip from './CustomTooltip';
import type { InvestmentDataPoint } from '../types';
import { formatCompact } from '../utils/formatters';

interface InvestmentChartProps {
  data: InvestmentDataPoint[];
}

export default function InvestmentChart({ data }: InvestmentChartProps) {
  if (data.length === 0) return null;

  const xInterval = Math.max(Math.floor(data.length / 6) - 1, 0);

  return (
    <Box sx={{ width: '100%', height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 5 }}
        >
          <defs>
            <linearGradient id="investedGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#343458" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#343458" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#5B6ABF" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#5B6ABF" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#E6E6E6"
          />
          <XAxis
            dataKey="label"
            stroke="#949EAB"
            tick={{ fontSize: 11 }}
            interval={xInterval}
          />
          <YAxis
            tickFormatter={formatCompact}
            stroke="#949EAB"
            tick={{ fontSize: 11 }}
            width={55}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              fontSize: 12,
              fontFamily: "'Work Sans', sans-serif",
            }}
          />
          <Area
            type="monotone"
            dataKey="Invested"
            stackId="1"
            stroke="#343458"
            fill="url(#investedGrad)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="Growth"
            stackId="1"
            stroke="#5B6ABF"
            fill="url(#growthGrad)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
}
