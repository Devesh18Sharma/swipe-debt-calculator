import { useMemo, type ReactNode } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { colorSchemes, typography } from './themePrimitives';

interface AppThemeProps {
  children: ReactNode;
}

export default function AppTheme({ children }: AppThemeProps) {
  const theme = useMemo(
    () =>
      createTheme({
        palette: colorSchemes,
        typography,
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                fontFamily: "'Work Sans', sans-serif",
              },
            },
          },
          MuiSlider: {
            styleOverrides: {
              root: {
                height: 6,
              },
              track: {
                background: 'linear-gradient(90deg, #343458, #5B6ABF)',
                border: 'none',
              },
              rail: {
                backgroundColor: '#E6E6E6',
                opacity: 1,
              },
              thumb: {
                width: 20,
                height: 20,
                background: 'linear-gradient(135deg, #343458, #5B6ABF)',
                border: '2px solid #fff',
                boxShadow: '0 2px 6px rgba(91,106,191,0.4)',
                '&:hover, &.Mui-focusVisible': {
                  boxShadow: '0 2px 10px rgba(91,106,191,0.6)',
                },
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                fontFamily: "'Work Sans', sans-serif",
              },
            },
          },
        },
      }),
    [],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
}
