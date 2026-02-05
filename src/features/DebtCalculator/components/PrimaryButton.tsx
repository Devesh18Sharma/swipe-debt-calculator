import { type ReactNode } from 'react';
import { Button, type SxProps, type Theme } from '@mui/material';

interface PrimaryButtonProps {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}

export default function PrimaryButton({
  children,
  onClick,
  disabled = false,
  sx = {},
}: PrimaryButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      sx={{
        py: 1.5,
        px: 3.5,
        borderRadius: '10px',
        border: 'none',
        background: disabled
          ? undefined
          : 'linear-gradient(135deg, #343458, #5B6ABF)',
        bgcolor: disabled ? 'custom.border' : undefined,
        color: disabled ? 'custom.muted' : '#fff',
        fontSize: 15,
        fontFamily: "'Work Sans', sans-serif",
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        transition: 'all 0.2s',
        boxShadow: disabled ? 'none' : '0 2px 10px rgba(91,106,191,0.3)',
        '&:hover': disabled
          ? {}
          : {
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 14px rgba(91,106,191,0.4)',
              background: 'linear-gradient(135deg, #343458, #5B6ABF)',
            },
        ...sx,
      }}
    >
      {children}
    </Button>
  );
}
