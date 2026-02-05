import { alpha, type PaletteOptions } from '@mui/material/styles';
import type { TypographyOptions } from '@mui/material/styles/createTypography';

declare module '@mui/material/styles' {
  interface Palette {
    orange: Palette['primary'];
    custom: {
      purple: string;
      purpleLight: string;
      accent: string;
      accentLight: string;
      navy: string;
      border: string;
      inputBg: string;
      muted: string;
      cardBg: string;
      lightBlue: string;
      green: string;
      greenLight: string;
      red: string;
      redLight: string;
    };
  }

  interface PaletteOptions {
    orange?: PaletteOptions['primary'];
    custom?: {
      purple: string;
      purpleLight: string;
      accent: string;
      accentLight: string;
      navy: string;
      border: string;
      inputBg: string;
      muted: string;
      cardBg: string;
      lightBlue: string;
      green: string;
      greenLight: string;
      red: string;
      redLight: string;
    };
  }
}

export const colorSchemes: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#293A60',
  },
  secondary: {
    main: '#F3F6F9',
    contrastText: '#949EAB',
  },
  background: {
    default: '#F7F8FC',
  },
  success: {
    light: '#D4FACE',
    main: '#19B600',
  },
  text: {
    primary: '#293A60',
    secondary: '#879CA8',
  },
  info: {
    main: '#23A6F0',
    light: '#B2DFF2',
  },
  warning: {
    main: '#FBC950',
    light: '#FFEDCE',
    dark: '#F4B545',
  },
  orange: {
    main: '#F5692B',
    light: '#FADBC9',
    dark: alpha('#F5692B', 0.9),
    contrastText: '#FFF',
  },
  custom: {
    purple: '#343458',
    purpleLight: '#cdcdff',
    accent: '#5B6ABF',
    accentLight: '#8B96D4',
    navy: '#293A60',
    border: '#E6E6E6',
    inputBg: '#F4F5F9',
    muted: '#949EAB',
    cardBg: '#FFFFFF',
    lightBlue: '#E3F2FD',
    green: '#2E7D5B',
    greenLight: '#E8F5E9',
    red: '#C0392B',
    redLight: '#FDEDEC',
  },
};

export const typography: TypographyOptions = {
  fontFamily: "'Libre Franklin', sans-serif",
};
