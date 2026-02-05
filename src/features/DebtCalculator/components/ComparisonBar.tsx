import { Box, Typography } from '@mui/material';

interface ComparisonBarProps {
  label: string;
  value: number;
  maxValue: number;
  color: string;
  amount: string;
}

export default function ComparisonBar({
  label,
  value,
  maxValue,
  color,
  amount,
}: ComparisonBarProps) {
  const pct = maxValue > 0 ? (value / maxValue) * 100 : 0;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
        }}
      >
        <Typography
          sx={{
            fontSize: 13,
            fontFamily: "'Work Sans', sans-serif",
            fontWeight: 500,
            color: 'custom.navy',
          }}
        >
          {label}
        </Typography>
        <Typography
          sx={{
            fontSize: 16,
            fontFamily: "'Libre Franklin', sans-serif",
            fontWeight: 700,
            color,
          }}
        >
          {amount}
        </Typography>
      </Box>
      <Box
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label}: ${amount}`}
        sx={{
          height: 10,
          bgcolor: 'custom.inputBg',
          borderRadius: '5px',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            width: `${Math.min(pct, 100)}%`,
            height: '100%',
            background: `linear-gradient(90deg, ${color}, ${color}cc)`,
            borderRadius: '5px',
            transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </Box>
    </Box>
  );
}
