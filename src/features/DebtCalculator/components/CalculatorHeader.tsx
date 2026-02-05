import { Box, Typography } from '@mui/material';

export default function CalculatorHeader() {
  return (
    <Box
      component="header"
      sx={{
        background:
          'linear-gradient(135deg, #343458 0%, #293A60 50%, #1a2540 100%)',
        p: '32px 20px 28px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative circles */}
      <Box
        sx={{
          position: 'absolute',
          top: -60,
          right: -60,
          width: 200,
          height: 200,
          borderRadius: '50%',
          bgcolor: 'rgba(205,205,255,0.06)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -40,
          left: -40,
          width: 150,
          height: 150,
          borderRadius: '50%',
          bgcolor: 'rgba(91,106,191,0.08)',
        }}
      />

      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: 2,
          textTransform: 'uppercase',
          color: '#cdcdff',
          mb: 1,
          fontFamily: "'Work Sans', sans-serif",
          position: 'relative',
        }}
      >
        SwipeSwipe
      </Typography>
      <Typography
        component="h1"
        sx={{
          fontFamily: "'Libre Franklin', sans-serif",
          fontSize: 'clamp(22px, 5vw, 30px)',
          fontWeight: 800,
          color: '#fff',
          m: 0,
          lineHeight: 1.2,
          position: 'relative',
        }}
      >
        Debt Freedom Calculator
      </Typography>
      <Typography
        sx={{
          fontSize: 14,
          color: 'rgba(255,255,255,0.6)',
          mt: 1,
          maxWidth: 400,
          mx: 'auto',
          fontFamily: "'Work Sans', sans-serif",
          position: 'relative',
        }}
      >
        See how consolidating debt saves you money — then watch those savings
        grow
      </Typography>
    </Box>
  );
}
