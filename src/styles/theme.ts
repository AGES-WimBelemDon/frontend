import { createTheme, type PaletteColor, type PaletteColorOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    customColors: Record<string, PaletteColor>;
  }
  interface PaletteOptions {
    customColors?: Record<string, PaletteColorOptions>;
  }
}

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: '#387b81',
      main: '#075b62',
      dark: '#043f44',
    },
    secondary: {
      light: '#a3d266',
      main: '#8dc740',
      dark: '#628b2c',
    },
    customColors: {
      
    }
  },
});
