import { Box, Button, Typography } from '@mui/material';
import ArrowForwardOutlined from '@mui/icons-material/ArrowForwardOutlined';
import BotMessage from './BotMessage';
import PrimaryButton from './PrimaryButton';
import type { CreditScoreRange } from '../types';
import { CREDIT_SCORE_OPTIONS } from '../constants';

interface CreditScoreSelectorProps {
  selected: CreditScoreRange | null;
  onSelect: (score: CreditScoreRange) => void;
  onContinue: () => void;
  onSkip: () => void;
  showActions: boolean;
}

const scoreColors: Record<CreditScoreRange, string> = {
  excellent: '#2E7D5B',
  good: '#5B6ABF',
  fair: '#E6960B',
  poor: '#C0392B',
};

export default function CreditScoreSelector({
  selected,
  onSelect,
  onContinue,
  onSkip,
  showActions,
}: CreditScoreSelectorProps) {
  return (
    <>
      <BotMessage delay={200}>
        <Typography
          sx={{
            fontSize: 15,
            color: 'custom.navy',
            mb: 2,
            fontWeight: 500,
            lineHeight: 1.6,
            fontFamily: "'Work Sans', sans-serif",
          }}
        >
          Before I crunch the numbers — what&apos;s your credit score range?
          This helps me find realistic consolidation rates for you.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 1.25,
          }}
        >
          {CREDIT_SCORE_OPTIONS.map((option) => {
            const isSelected = selected === option.value;
            const color = scoreColors[option.value];

            return (
              <Box
                key={option.value}
                onClick={() => onSelect(option.value)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelect(option.value);
                  }
                }}
                sx={{
                  p: '14px 16px',
                  borderRadius: '10px',
                  border: 2,
                  borderColor: isSelected ? color : 'custom.border',
                  bgcolor: isSelected ? `${color}0D` : 'custom.cardBg',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'center',
                  '&:hover': {
                    borderColor: color,
                    bgcolor: `${color}08`,
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: isSelected ? color : 'custom.navy',
                    fontFamily: "'Libre Franklin', sans-serif",
                    mb: 0.25,
                  }}
                >
                  {option.label}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 12,
                    color: 'custom.muted',
                    fontFamily: "'Work Sans', sans-serif",
                    fontWeight: 500,
                  }}
                >
                  {option.range}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 11,
                    color: isSelected ? color : 'custom.muted',
                    fontFamily: "'Work Sans', sans-serif",
                    mt: 0.5,
                    fontWeight: 600,
                  }}
                >
                  ~{option.apr}% APR
                </Typography>
              </Box>
            );
          })}
        </Box>
      </BotMessage>

      {/* Continue / Skip actions — only shown when this is the active step */}
      {showActions && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mt: 1,
            mb: 2,
            animation: 'fadeSlideIn 0.3s ease-out 0.3s both',
          }}
        >
          <PrimaryButton onClick={onContinue} disabled={!selected}>
            See My Results <ArrowForwardOutlined sx={{ fontSize: 16 }} />
          </PrimaryButton>

          <Button
            onClick={onSkip}
            sx={{
              py: 1,
              px: 2,
              color: 'custom.muted',
              fontSize: 13,
              fontWeight: 500,
              fontFamily: "'Work Sans', sans-serif",
              textTransform: 'none',
              '&:hover': {
                color: 'custom.navy',
                bgcolor: 'transparent',
                textDecoration: 'underline',
              },
            }}
          >
            Skip this step
          </Button>
        </Box>
      )}
    </>
  );
}
