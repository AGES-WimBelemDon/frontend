import { Box } from '@mui/material';
import { Outlet } from 'react-router';

import { Header } from '../../components/Header';
import { Toast } from '../../components/Toast';

export default function Layout() {
  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Header />

      <Box display="flex" flex="1" overflow="hidden">
        <Box
          component="nav"
          width={300}
          borderRight={2}
          bgcolor="background.paper"
        >
          Sidebar here
        </Box>

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
