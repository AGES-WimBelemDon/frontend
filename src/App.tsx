import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Toast } from './components/Toast';
import { AuthProvider } from './contexts/Auth/AuthProvider';
import { ToastProvider } from './contexts/Toast/ToastProvider';
import AppRouter from './routes/AppRouter';
import { theme } from './styles/theme';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <ToastProvider>
            <AppRouter />
            <Toast></Toast>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
