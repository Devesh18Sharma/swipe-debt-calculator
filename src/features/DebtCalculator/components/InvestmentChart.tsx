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
              <stop offset="0%" stopColor="#1B5E20" stopOpacity={0.85} />
              <stop offset="50%" stopColor="#1B5E20" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#1B5E20" stopOpacity={0.15} />
            </linearGradient>
            <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FBC950" stopOpacity={0.95} />
              <stop offset="50%" stopColor="#FBC950" stopOpacity={0.7} />
              <stop offset="100%" stopColor="#F4B545" stopOpacity={0.3} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="4 4"
            vertical={false}
            stroke="#F3F6F9"
          />
          <XAxis
            dataKey="label"
            stroke="#949EAB"
            tick={{ fontSize: 11, fontFamily: "'Work Sans', sans-serif" }}
            axisLine={false}
            tickLine={false}
            interval={xInterval}
          />
          <YAxis
            tickFormatter={formatCompact}
            stroke="#949EAB"
            tick={{ fontSize: 11, fontFamily: "'Work Sans', sans-serif" }}
            axisLine={false}
            tickLine={false}
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
            name="Your Investment"
            stackId="1"
            stroke="#1B5E20"
            fill="url(#investedGrad)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="Growth"
            name="Market Growth"
            stackId="1"
            stroke="#F4B545"
            fill="url(#growthGrad)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
}
