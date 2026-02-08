import { useCallback } from 'react';
import { Box, TextField, IconButton, InputAdornment, Typography } from '@mui/material';
import CreditCardOutlined from '@mui/icons-material/CreditCardOutlined';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import { NumericFormat } from 'react-number-format';
import type { CreditCard } from '../types';

interface CardInputRowProps {
  card: CreditCard;
  index: number;
  onChange: (id: string, field: keyof CreditCard, value: string | number) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
}

const inputFieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '6px',
    bgcolor: '#fff',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'custom.border',
    },
  },
  '& .MuiInputBase-input': {
    fontSize: 15,
    fontFamily: "'Work Sans', sans-serif",
    fontWeight: 600,
    color: 'custom.navy',
    py: 1,
  },
};

const adornmentSx = {
  color: 'custom.muted',
  fontSize: 14,
  fontFamily: "'Work Sans', sans-serif",
  fontWeight: 500,
};

const fieldLabelSx = {
  fontSize: 12,
  fontWeight: 600,
  color: 'custom.navy',
  fontFamily: "'Work Sans', sans-serif",
  mb: 0.5,
};

export default function CardInputRow({
  card,
  index,
  onChange,
  onRemove,
  canRemove,
}: CardInputRowProps) {
  // Handle K/M keyboard shortcut on balance field
  const handleBalanceKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const key = e.key.toLowerCase();
      if (key === 'k' || key === 'm') {
        e.preventDefault();
        const multiplier = key === 'k' ? 1000 : 1000000;
        const currentValue = card.balance || 0;
        if (currentValue > 0) {
          onChange(card.id, 'balance', currentValue * multiplier);
        }
      }
    },
    [card.id, card.balance, onChange],
  );

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1.25,
        alignItems: 'flex-start',
        p: '14px 16px',
        bgcolor: 'custom.inputBg',
        borderRadius: '10px',
        animation: 'fadeSlideIn 0.3s ease-out',
        border: 1,
        borderColor: 'custom.border',
      }}
    >
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: 1,
          bgcolor: 'custom.lightBlue',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          mt: 0.25,
        }}
      >
        <CreditCardOutlined sx={{ fontSize: 16, color: 'custom.navy' }} />
      </Box>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
        }}
      >
        {/* Card name */}
        <TextField
          placeholder={`Card ${index + 1} name (optional)`}
          value={card.name}
          onChange={(e) => onChange(card.id, 'name', e.target.value)}
          variant="standard"
          aria-label={`Card ${index + 1} name`}
          slotProps={{
            input: {
              disableUnderline: true,
            },
          }}
          sx={{
            '& .MuiInputBase-input': {
              fontSize: 13,
              fontFamily: "'Work Sans', sans-serif",
              color: 'custom.muted',
              p: 0,
            },
          }}
        />

        {/* Row 1: Balance + APR */}
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
          <Box sx={{ flex: '1 1 180px', minWidth: 140 }}>
            <Typography sx={fieldLabelSx}>Balance</Typography>
            <NumericFormat
              customInput={TextField}
              placeholder="5,000"
              value={card.balance || ''}
              onValueChange={(values) =>
                onChange(card.id, 'balance', values.floatValue || 0)
              }
              onKeyDown={handleBalanceKeyDown}
              thousandSeparator
              allowNegative={false}
              variant="outlined"
              size="small"
              fullWidth
              aria-label={`Card ${index + 1} balance`}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box component="span" sx={adornmentSx}>
                        $
                      </Box>
                    </InputAdornment>
                  ),
                },
              }}
              sx={inputFieldSx}
            />
          </Box>

          <Box sx={{ flex: '0 1 130px', minWidth: 100 }}>
            <Typography sx={fieldLabelSx}>Interest rate (APR)</Typography>
            <NumericFormat
              customInput={TextField}
              placeholder="22.99"
              value={card.apr || ''}
              onValueChange={(values) =>
                onChange(card.id, 'apr', values.floatValue || 0)
              }
              allowNegative={false}
              decimalScale={2}
              variant="outlined"
              size="small"
              fullWidth
              aria-label={`Card ${index + 1} APR`}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Box component="span" sx={adornmentSx}>
                        %
                      </Box>
                    </InputAdornment>
                  ),
                },
              }}
              sx={inputFieldSx}
            />
          </Box>
        </Box>

        {/* Row 2: Monthly Payment — full width, prominent */}
        <Box>
          <Typography sx={fieldLabelSx}>Monthly payment</Typography>
          <NumericFormat
            customInput={TextField}
            placeholder="$25"
            value={card.monthlyPayment || ''}
            onValueChange={(values) =>
              onChange(card.id, 'monthlyPayment', values.floatValue || 0)
            }
            thousandSeparator
            prefix="$"
            allowNegative={false}
            decimalScale={0}
            variant="outlined"
            size="small"
            fullWidth
            aria-label={`Card ${index + 1} monthly payment`}
            sx={inputFieldSx}
          />
          <Typography
            sx={{
              fontSize: 11,
              color: 'custom.muted',
              fontFamily: "'Work Sans', sans-serif",
              mt: 0.5,
              lineHeight: 1.3,
            }}
          >
            Enter how much you pay toward this bill each month
          </Typography>
        </Box>
      </Box>

      {canRemove && (
        <IconButton
          onClick={() => onRemove(card.id)}
          aria-label={`Remove card ${index + 1}`}
          size="small"
          sx={{
            color: 'custom.muted',
            transition: 'all 0.2s',
            mt: 0.25,
            '&:hover': {
              color: 'custom.red',
            },
          }}
        >
          <DeleteOutlined sx={{ fontSize: 16 }} />
        </IconButton>
      )}
    </Box>
  );
}
