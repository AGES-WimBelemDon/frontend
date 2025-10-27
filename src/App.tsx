import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { getUserLocale } from "./constants";
import { AuthProvider } from "./contexts/Auth/AuthProvider";
import { SidebarProvider } from "./contexts/Sidebar/SidebarProvider";
import { ToastProvider } from "./contexts/Toast/ToastProvider";
import AppRouter from "./routes/AppRouter";
import { theme } from "./styles/theme";

const queryClient = new QueryClient();

export default function App() {
  const preferedLocale = getUserLocale().toLocaleLowerCase();

  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={preferedLocale}>
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
      </LocalizationProvider>
    </QueryClientProvider>
  );
}
