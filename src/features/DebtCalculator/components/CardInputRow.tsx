import { Box, TextField, IconButton, InputAdornment } from '@mui/material';
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

export default function CardInputRow({
  card,
  index,
  onChange,
  onRemove,
  canRemove,
}: CardInputRowProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1.25,
        alignItems: 'center',
        p: '12px 14px',
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
        }}
      >
        <CreditCardOutlined sx={{ fontSize: 16, color: 'custom.navy' }} />
      </Box>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
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

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Box sx={{ position: 'relative', flex: '1 1 140px', minWidth: 120 }}>
            <NumericFormat
              customInput={TextField}
              placeholder="Balance"
              value={card.balance || ''}
              onValueChange={(values) =>
                onChange(card.id, 'balance', values.floatValue || 0)
              }
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
                      <Box
                        component="span"
                        sx={{
                          color: 'custom.muted',
                          fontSize: 14,
                          fontFamily: "'Work Sans', sans-serif",
                          fontWeight: 500,
                        }}
                      >
                        $
                      </Box>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
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
              }}
            />
          </Box>

          <Box sx={{ position: 'relative', flex: '0 1 100px', minWidth: 80 }}>
            <NumericFormat
              customInput={TextField}
              placeholder="APR %"
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
                      <Box
                        component="span"
                        sx={{
                          color: 'custom.muted',
                          fontSize: 14,
                          fontFamily: "'Work Sans', sans-serif",
                          fontWeight: 500,
                        }}
                      >
                        %
                      </Box>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
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
              }}
            />
          </Box>
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
