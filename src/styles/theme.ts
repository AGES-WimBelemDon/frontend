import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minWidth: 0,
        },
      },
    },
  },
  palette: {
    mode: 'light',
    background: {
      default: '#FFFFFF',
      paper: '#EEFEEE',
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
    },
    text: {
      primary: '#0E6872',
      secondary: '#8DC740',
      disabled: '#EDE4D7'
    },
    primary: {
      main: '#0E6872',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#8DC740',
      contrastText: '#FFFFFF'
    },
    error: {
      main: '#d32f2f',
      contrastText: '#FFFFFF'
    },
    warning: {
      main: '#ed6c02',
      contrastText: '#FFFFFF'
    },
    success: {
      main: '#2e7d32',
      contrastText: '#FFFFFF'
    },
  }
});
