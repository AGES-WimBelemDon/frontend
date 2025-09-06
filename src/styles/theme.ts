import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF'
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
