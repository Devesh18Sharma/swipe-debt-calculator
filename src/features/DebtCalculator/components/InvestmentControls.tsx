import { Box, TextField, Button, Typography } from '@mui/material';
import { ANNUAL_RETURN_OPTIONS, USER_AGE_MIN, USER_AGE_MAX } from '../constants';

interface InvestmentControlsProps {
  userAge: number;
  annualReturn: number;
  onAgeChange: (v: number) => void;
  onReturnChange: (v: number) => void;
}

export default function InvestmentControls({
  userAge,
  annualReturn,
  onAgeChange,
  onReturnChange,
}: InvestmentControlsProps) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2.5 }}>
      <Box sx={{ flex: '1 1 140px' }}>
        <Typography
          component="label"
          htmlFor="user-age-input"
          sx={{
            fontSize: 12,
            color: 'custom.muted',
            fontWeight: 500,
            display: 'block',
            mb: 0.75,
            fontFamily: "'Work Sans', sans-serif",
          }}
        >
          Your Current Age
        </Typography>
        <TextField
          id="user-age-input"
          type="number"
          value={userAge}
          onChange={(e) => {
            const v = parseInt(e.target.value) || 30;
            onAgeChange(Math.max(USER_AGE_MIN, Math.min(USER_AGE_MAX, v)));
          }}
          variant="outlined"
          size="small"
          fullWidth
          aria-label="Your current age"
          slotProps={{
            htmlInput: {
              min: USER_AGE_MIN,
              max: USER_AGE_MAX,
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 1,
              bgcolor: 'custom.inputBg',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'custom.border',
              },
            },
            '& .MuiInputBase-input': {
              fontSize: 16,
              fontWeight: 600,
              color: 'custom.navy',
              fontFamily: "'Work Sans', sans-serif",
              py: 1.25,
              px: 1.75,
            },
          }}
        />
      </Box>

      <Box sx={{ flex: '1 1 160px' }}>
        <Typography
          sx={{
            fontSize: 12,
            color: 'custom.muted',
            fontWeight: 500,
            display: 'block',
            mb: 0.75,
            fontFamily: "'Work Sans', sans-serif",
          }}
        >
          Expected Annual Return
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.75 }}>
          {ANNUAL_RETURN_OPTIONS.map((r) => (
            <Button
              key={r}
              onClick={() => onReturnChange(r)}
              role="radio"
              aria-checked={annualReturn === r}
              aria-label={`${r}% annual return`}
              sx={{
                flex: 1,
                py: 1.25,
                px: 0.5,
                borderRadius: 1,
                border: annualReturn === r ? 2 : 1,
                borderStyle: 'solid',
                borderColor: annualReturn === r ? 'custom.accent' : 'custom.border',
                bgcolor: annualReturn === r ? 'rgba(91,106,191,0.07)' : 'custom.inputBg',
                color: annualReturn === r ? 'custom.accent' : 'custom.navy',
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "'Work Sans', sans-serif",
                transition: 'all 0.15s',
                minWidth: 0,
                '&:hover': {
                  bgcolor: annualReturn === r
                    ? 'rgba(91,106,191,0.12)'
                    : 'rgba(0,0,0,0.04)',
                  borderColor: annualReturn === r ? 'custom.accent' : 'custom.border',
                },
              }}
            >
              {r}%
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
