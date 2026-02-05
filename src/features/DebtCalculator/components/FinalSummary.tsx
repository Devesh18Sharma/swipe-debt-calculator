import { Box, Button, Typography } from '@mui/material';
import RestartAltOutlined from '@mui/icons-material/RestartAltOutlined';
import BotMessage from './BotMessage';
import type { ConsolidationResult, InvestmentDataPoint } from '../types';
import { formatFull } from '../utils/formatters';

interface FinalSummaryProps {
  consolidation: ConsolidationResult;
  investmentData: InvestmentDataPoint[];
  onReset: () => void;
}

export default function FinalSummary({
  consolidation,
  investmentData,
  onReset,
}: FinalSummaryProps) {
  const finalTotal = investmentData[investmentData.length - 1]?.total || 0;

  return (
    <>
      <BotMessage delay={500}>
        <Typography
          sx={{
            fontSize: 15,
            color: 'custom.navy',
            m: 0,
            fontWeight: 500,
            lineHeight: 1.6,
            fontFamily: "'Work Sans', sans-serif",
          }}
        >
          💰 By consolidating your debt and then investing the payments,
          you&apos;re not just saving{' '}
          <Box
            component="strong"
            sx={{ color: 'custom.green' }}
          >
            {formatFull(Math.round(consolidation.interestSaved))}
          </Box>{' '}
          in interest — you&apos;re building{' '}
          <Box
            component="strong"
            sx={{ color: 'custom.accent' }}
          >
            {formatFull(finalTotal)}
          </Box>{' '}
          in wealth. That&apos;s the SwipeSwipe way: turn overspending into
          freedom. 🎉
        </Typography>
      </BotMessage>

      <Box
        sx={{
          textAlign: 'center',
          mt: 1,
          animation: 'fadeSlideIn 0.4s ease-out 0.7s both',
        }}
      >
        <Button
          onClick={onReset}
          startIcon={<RestartAltOutlined sx={{ fontSize: 14 }} />}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.75,
            py: 1.25,
            px: 2.5,
            borderRadius: 1,
            border: 1,
            borderColor: 'custom.border',
            bgcolor: 'custom.cardBg',
            color: 'custom.muted',
            fontSize: 13,
            fontWeight: 500,
            fontFamily: "'Work Sans', sans-serif",
            transition: 'all 0.2s',
            '&:hover': {
              borderColor: 'custom.accent',
              color: 'custom.accent',
              bgcolor: 'custom.cardBg',
            },
          }}
        >
          Start Over
        </Button>
      </Box>
    </>
  );
}
