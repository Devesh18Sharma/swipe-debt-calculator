import { Box, Slider, Typography } from '@mui/material';

interface SliderControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  formatValue: (v: number) => string;
  formatMin?: string;
  formatMax?: string;
  onChange: (value: number) => void;
}

export default function SliderControl({
  label,
  value,
  min,
  max,
  step,
  formatValue,
  formatMin,
  formatMax,
  onChange,
}: SliderControlProps) {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: 13,
            color: 'custom.muted',
            fontWeight: 500,
            fontFamily: "'Work Sans', sans-serif",
          }}
        >
          {label}
        </Typography>
        <Typography
          sx={{
            fontSize: 15,
            color: 'custom.accent',
            fontWeight: 700,
            fontFamily: "'Libre Franklin', sans-serif",
          }}
        >
          {formatValue(value)}
        </Typography>
      </Box>
      <Slider
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(_, v) => onChange(v as number)}
        aria-label={label}
      />
      {(formatMin || formatMax) && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 0.5,
          }}
        >
          <Typography
            sx={{ fontSize: 11, color: 'custom.muted', fontFamily: "'Work Sans', sans-serif" }}
          >
            {formatMin ?? min}
          </Typography>
          <Typography
            sx={{ fontSize: 11, color: 'custom.muted', fontFamily: "'Work Sans', sans-serif" }}
          >
            {formatMax ?? max}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
