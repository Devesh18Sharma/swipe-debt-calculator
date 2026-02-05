import { useState, useEffect, type ReactNode } from 'react';
import { Box } from '@mui/material';
import AttachMoneyOutlined from '@mui/icons-material/AttachMoneyOutlined';

interface BotMessageProps {
  children: ReactNode;
  delay?: number;
}

export default function BotMessage({ children, delay = 0 }: BotMessageProps) {
  const [visible, setVisible] = useState(delay === 0);

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => setVisible(true), delay);
      return () => clearTimeout(timer);
    }
  }, [delay]);

  if (!visible) return null;

  return (
    <Box
      role="status"
      sx={{
        display: 'flex',
        gap: 1.5,
        alignItems: 'flex-start',
        animation: 'fadeSlideIn 0.4s ease-out',
        mb: 2,
      }}
    >
      <Box
        aria-label="SwipeSwipe bot"
        sx={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #343458, #5B6ABF)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 2px 8px rgba(91,106,191,0.25)',
        }}
      >
        <AttachMoneyOutlined sx={{ fontSize: 18, color: '#fff' }} />
      </Box>
      <Box
        sx={{
          bgcolor: 'custom.cardBg',
          borderRadius: '4px 16px 16px 16px',
          p: '16px 20px',
          maxWidth: '100%',
          flex: 1,
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          border: 1,
          borderColor: 'custom.border',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
