import { Box } from '@mui/material';
import { Outlet } from 'react-router';

import { Header } from '../../components/Header';
import { UserProfile } from '../../components/Header/UserProfile';
import { Sidebar } from '../../components/Sidebar';
import { Toast } from '../../components/Toast';
import { useRoutes } from '../../hooks/useRoutes';

export default function Layout() {
  const allowedRoutes = useRoutes();

  return (
    <Box display="flex" height="100vh">
      <Sidebar allowedRoutes={allowedRoutes} />

      <UserProfile />

      <Box flex="1" overflow="hidden">
        <Header />
        <Box
          component="main"
          flex="1"
          overflow="auto"
          maxWidth='lg'
          padding={2}
          marginX='auto'
        >
          <Toast />
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
