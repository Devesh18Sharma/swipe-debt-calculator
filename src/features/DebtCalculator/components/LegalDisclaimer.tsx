import { Box, Typography } from '@mui/material';
import { DISCLAIMER_TEXT } from '../constants';

export default function LegalDisclaimer() {
  return (
    <Box sx={{ pt: 4, pb: 2, textAlign: 'center', maxWidth: 600, mx: 'auto' }}>
      <Typography
        variant="caption"
        sx={{
          color: 'custom.muted',
          fontSize: 11,
          lineHeight: 1.5,
          fontFamily: "'Work Sans', sans-serif",
        }}
      >
        {DISCLAIMER_TEXT}
      </Typography>
    </Box>
  );
}
