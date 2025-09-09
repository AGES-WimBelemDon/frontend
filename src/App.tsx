import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider } from './contexts/Auth/AuthProvider';
import { SidebarProvider } from './contexts/Sidebar/SidebarProvider';
import { ToastProvider } from './contexts/Toast/ToastProvider';
import AppRouter from './routes/AppRouter';
import { theme } from './styles/theme';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <SidebarProvider>
            <ToastProvider>
              <AppRouter />
            </ToastProvider>
          </SidebarProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
