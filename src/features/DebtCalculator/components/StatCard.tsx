import { Box, Typography } from '@mui/material';
import type { SvgIconComponent } from '@mui/icons-material';

interface StatCardProps {
  label: string;
  value: string;
  subtitle?: string;
  icon?: SvgIconComponent;
  color?: string;
}

export default function StatCard({
  label,
  value,
  subtitle,
  icon: Icon,
  color,
}: StatCardProps) {
  return (
    <Box
      sx={{
        flex: '1 1 200px',
        p: '18px 20px',
        borderRadius: 1.5,
        bgcolor: 'custom.cardBg',
        border: 1,
        borderColor: 'custom.border',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        display: 'flex',
        flexDirection: 'column',
        gap: 0.75,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {Icon && (
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: '7px',
              bgcolor: color ? `${color}18` : 'custom.lightBlue',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon sx={{ fontSize: 14, color: color || 'custom.accent' }} />
          </Box>
        )}
        <Typography
          sx={{
            fontSize: 12,
            fontFamily: "'Work Sans', sans-serif",
            fontWeight: 500,
            color: 'custom.muted',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {label}
        </Typography>
      </Box>
      <Typography
        sx={{
          fontSize: 24,
          fontFamily: "'Libre Franklin', sans-serif",
          fontWeight: 700,
          color: color || 'custom.navy',
          lineHeight: 1.2,
        }}
      >
        {value}
      </Typography>
      {subtitle && (
        <Typography
          sx={{
            fontSize: 12,
            fontFamily: "'Work Sans', sans-serif",
            color: 'custom.muted',
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
