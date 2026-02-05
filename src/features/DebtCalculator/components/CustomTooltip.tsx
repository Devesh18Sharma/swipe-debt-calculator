import { Box, Typography } from '@mui/material';
import type { TooltipProps } from 'recharts';
import { formatFull } from '../utils/formatters';

type CustomTooltipProps = TooltipProps<number, string>;

export default function CustomTooltip({
  active,
  payload,
  label,
}: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <Box
      sx={{
        bgcolor: 'rgba(41,58,96,0.95)',
        backdropFilter: 'blur(8px)',
        borderRadius: '10px',
        p: '12px 16px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
        border: 'none',
      }}
    >
      <Typography
        sx={{
          fontSize: 12,
          color: 'rgba(255,255,255,0.6)',
          mb: 0.75,
          fontFamily: "'Work Sans', sans-serif",
        }}
      >
        {label}
      </Typography>
      {payload.map((entry, i) => (
        <Box
          key={i}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 2,
            alignItems: 'center',
            py: 0.25,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '2px',
                bgcolor: entry.color,
              }}
            />
            <Typography
              sx={{
                fontSize: 12,
                color: 'rgba(255,255,255,0.8)',
                fontFamily: "'Work Sans', sans-serif",
              }}
            >
              {entry.name}
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 600,
              color: '#fff',
              fontFamily: "'Work Sans', sans-serif",
            }}
          >
            {formatFull(entry.value ?? 0)}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
